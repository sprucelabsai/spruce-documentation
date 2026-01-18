# Reverse Engineering TDD Documentation

This document helps Claude reverse-engineer TDD (Test-Driven Development) documentation from final code. Instead of building tests step-by-step interactively, provide the final implementation and Claude will generate the incremental TDD walkthrough.

## How to Use

1. Provide Claude with the **final test file** and **final production class**
2. Reference this document: "Use REVERSE_ENGINEERING_TDD.md to generate TDD steps"
3. Claude will output the incremental Test/Production steps in `<details>` blocks

---

## Key Principles

### 1. Step Ordering Follows Type Errors

Write code as if dependencies exist, then fix the errors. The step that causes an error comes FIRST.

**Wrong:**
```ts
// Step 1. Declare the variable
let wasHit = false
// Step 2. Use it
wasHit = true
```

**Correct:**
```ts
// Step 2. Declare wasHit (fixes type error from Step 1)
let wasHit = false

await eventFaker.on('...', () => {
    // Step 1. Set wasHit (causes type error)
    wasHit = true
})
```

### 2. Incremental Test Building

Tests build on each other using letter suffixes (5a, 5b, 5c). Each adds ONE new behavior/assertion. DRY/refactor steps get their own number.

```
Test 5a: Can call method with valid params (just doesn't throw)
Production 5a: Accept params, validate with assertOptions
Test 5b: Assert event was emitted (add wasHit check)
Production 5b: Emit the event with generateId() placeholders
Test 5c: Assert correct target (add passedTarget capture + assertion)
Production 5c: Pass real personId to target
Test 5d: Assert correct payload (add passedPayload capture + assertion)
Production 5d: Pass real message to payload
Test 6: DRY the test (remove redundant wasHit since target/payload assertions cover it)
```

### 3. Production Code is Minimal

Only add what makes the current test pass:
- Don't destructure until a test needs the value
- Use `generateId()` as placeholders until tests force real values through
- Don't store variables (like `this.client`) until a test requires it
- Don't add constructor params until a test forces it

### 4. Test Patterns

```ts
// Always use @suite() for instance-based tests
@suite()
export default class MyTest extends AbstractSpruceFixtureTest {
    // Private properties (not static)
    private sender!: MessageSender

    // Instance beforeEach (not static)
    protected async beforeEach() {
        await super.beforeEach()
        this.sender = MessageSender.Sender(this.fakedClient)
    }

    // Instance test methods (not static)
    @test()
    protected async myTest() {
        // Use generateId() for test values
        const personId = generateId()

        // Proper typing for captured values
        let passedTarget:
            | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['target']
            | undefined

        // eventFaker for testing events
        await eventFaker.on('send-message::v2020_12_25', ({ target }) => {
            passedTarget = target
        })

        // All assertions need messages
        assert.isEqualDeep(passedTarget, { personId }, 'Target is wrong!')
    }
}
```

### 5. Common Patterns

**assertOptions for validation:**
```ts
// Test expects MISSING_PARAMETERS error
const err = await assert.doesThrowAsync(() => MyClass.Builder())
errorAssert.assertError(err, 'MISSING_PARAMETERS', {
    parameters: ['client'],
})

// Production validates with assertOptions
public static Builder(client: MercuryClient) {
    assertOptions({ client }, ['client'])
    return new this(client)
}
```

**Builder pattern progression:**
```ts
// Step 1: Empty assertOptions (test throws with missing)
assertOptions({}, ['client'])

// Step 2: Accept param, validate it (test passes with param)
public static Builder(client: MercuryClient) {
    assertOptions({ client }, ['client'])
}

// Step 3: Return instance (test calls method on result)
return new this()

// Step 4: Pass to constructor (test needs client used)
return new this(client)

// Step 5: Store in property (production code uses it)
private constructor(client: MercuryClient) {
    this.client = client
}
```

---

## Input Format

Provide Claude with:

### 1. Final Test File
```ts
// The complete, working test file
```

### 2. Final Production Class
```ts
// The complete, working class
```

### 3. Context (optional)
- What the class does
- Any special patterns used
- Related events/schemas

---

## Output Format

Claude generates `<details>` blocks like:

```markdown
<details>
<summary><strong>Test 1</strong>: Assert throws with missing required options</summary>

Description of what this test does.

\`\`\`ts
// Code with step comments
\`\`\`

> **Note**: Why this test fails initially.

</details>

<details>
<summary><strong>Production 1</strong>: Create class with assertOptions</summary>

\`\`\`ts
// Step 1. First change (causes/fixes error)
// Step 2. Second change
\`\`\`

> **Note**: Why this makes the test pass.

</details>
```

---

## Full Example

### Input: Final Code

**Final Test File:**
```ts
import { MercuryClient } from '@sprucelabs/mercury-client'
import { assertOptions } from '@sprucelabs/schema'
import { eventFaker, AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'

@suite()
export default class MessageSenderTest extends AbstractSpruceFixtureTest {
    private sender!: MessageSender

    protected async beforeEach() {
        await super.beforeEach()
        this.sender = MessageSender.Sender(this.fakedClient)
    }

    @test()
    protected async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            MessageSender.Sender()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['client'],
        })
    }

    @test()
    protected async sendThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() => this.sender.send())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['personId', 'message'],
        })
    }

    @test()
    protected async canSendWithValidParams() {
        let passedTarget:
            | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['target']
            | undefined
        let passedPayload:
            | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['payload']
            | undefined

        await eventFaker.on('send-message::v2020_12_25', ({ target, payload }) => {
            passedTarget = target
            passedPayload = payload
        })

        const personId = generateId()
        const message = generateId()

        await this.sender.send({
            personId,
            message,
        })

        assert.isEqualDeep(passedTarget, { personId }, 'Target sent to send-message is wrong!')
        assert.isEqualDeep(
            passedPayload?.message,
            {
                body: message,
                classification: 'transactional',
            },
            'Payload sent to send-message is wrong!'
        )
    }
}

class MessageSender {
    private client: MercuryClient

    private constructor(client: MercuryClient) {
        this.client = client
    }

    public static Sender(client: MercuryClient) {
        assertOptions({ client }, ['client'])
        return new this(client)
    }

    public async send(options: SendOptions) {
        const { personId, message } = assertOptions(options, ['personId', 'message'])

        await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
            target: {
                personId,
            },
            payload: {
                message: {
                    body: message,
                    classification: 'transactional',
                },
            },
        })
    }
}

interface SendOptions {
    personId: string
    message: string
}
```

### Output: TDD Steps

<details>
<summary><strong>Test 1</strong>: Assert throws with missing required options</summary>

The first test verifies that your class throws when required options are missing.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'

@suite()
export default class MessageSenderTest extends AbstractSpruceFixtureTest {
    @test()
    protected async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            MessageSender.Sender()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['client'],
        })
    }
}
```

> **Note**: This test fails because `MessageSender` doesn't exist yet. That's expected - we'll create it next.

</details>

<details>
<summary><strong>Production 1</strong>: Create MessageSender class with assertOptions</summary>

```ts
// Step 1. Import assertOptions from @sprucelabs/schema
import { assertOptions } from '@sprucelabs/schema'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'

@suite()
export default class MessageSenderTest extends AbstractSpruceFixtureTest {
    @test()
    protected async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            MessageSender.Sender()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['client'],
        })
    }
}

// Step 2. Declare the MessageSender class at the bottom of the test file
class MessageSender {
    public static Sender() {
        // Step 3. Add assertOptions to validate required options
        assertOptions({}, ['client'])
    }
}
```

> **Note**: `assertOptions` from `@sprucelabs/schema` throws `MISSING_PARAMETERS` if required options are missing. Test passes!

</details>

<details>
<summary><strong>Test 2</strong>: Can create sender with required options</summary>

Now we verify we can create a sender when we pass the required `client`.

```ts
// Step 1. Add the new test
@test()
protected async canCreateSenderWithRequired() {
    MessageSender.Sender(this.fakedClient)
}
```

> **Note**: This fails because `Sender()` doesn't accept any parameters yet.

</details>

<details>
<summary><strong>Production 2</strong>: Accept client parameter</summary>

```ts
// Step 1. Import MercuryClient type
import { MercuryClient } from '@sprucelabs/mercury-client'

class MessageSender {
    // Step 2. Accept client parameter
    public static Sender(client: MercuryClient) {
        // Step 3. Pass object with client to assertOptions
        assertOptions({ client }, ['client'])
    }
}
```

> **Note**: Test passes! We still don't store the client or create an instance - no test has required that yet.

</details>

<details>
<summary><strong>Test 3</strong>: Assert send throws with missing</summary>

```ts
// Step 1. Add the new test
@test()
protected async sendThrowsWithMissing() {
    const sender = MessageSender.Sender(this.fakedClient)
    const err = await assert.doesThrowAsync(() => sender.send())

    errorAssert.assertError(err, 'MISSING_PARAMETERS', {
        parameters: ['personId', 'message'],
    })
}
```

> **Note**: This fails because `Sender()` doesn't return anything, and there's no `send()` method yet.

</details>

<details>
<summary><strong>Production 3</strong>: Return instance and add send method</summary>

```ts
class MessageSender {
    public static Sender(client: MercuryClient) {
        assertOptions({ client }, ['client'])
        // Step 1. Return a new instance
        return new this()
    }

    // Step 2. Add send method with no params
    public send() {
        // Step 3. Add assertOptions to validate required options
        assertOptions({}, ['personId', 'message'])
    }
}
```

> **Note**: Test passes! We still don't store the client - no test has required that yet.

</details>

<details>
<summary><strong>Test 4</strong>: DRY your tests</summary>

Move the sender creation to `beforeEach()` and delete the `canCreateSenderWithRequired` test.

```ts
@suite()
export default class MessageSenderTest extends AbstractSpruceFixtureTest {
    // Step 1. Add a private property for the sender
    private sender!: MessageSender

    // Step 2. Add beforeEach to create the sender
    protected async beforeEach() {
        await super.beforeEach()
        this.sender = MessageSender.Sender(this.fakedClient)
    }

    @test()
    protected async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            MessageSender.Sender()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['client'],
        })
    }

    // Step 3. Delete canCreateSenderWithRequired test (no longer needed)

    @test()
    protected async sendThrowsWithMissing() {
        // Step 4. Use this.sender instead of creating locally
        const err = await assert.doesThrowAsync(() => this.sender.send())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['personId', 'message'],
        })
    }
}
```

> **Note**: By moving the sender creation to `beforeEach()`, we can delete the `canCreateSenderWithRequired` test since every test now implicitly tests that we can create a sender.

</details>

<details>
<summary><strong>Test 5a</strong>: Can send with valid parameters</summary>

```ts
// Step 1. Add the new test
@test()
protected async canSendWithValidParams() {
    // Step 2. Call send with valid parameters
    await this.sender.send({
        personId: generateId(),
        message: generateId(),
    })
}
```

> **Note**: This fails because `send()` doesn't accept parameters yet.

</details>

<details>
<summary><strong>Production 5a</strong>: Accept parameters in send method</summary>

```ts
    // Step 1. Accept options parameter
    public async send(options: SendOptions) {
        // Step 2. Validate required options
        assertOptions(options, ['personId', 'message'])
    }
}

// Step 3. Define the SendOptions interface
interface SendOptions {
    personId: string
    message: string
}
```

> **Note**: Test passes! We still don't emit any events - no test has required that yet.

</details>

<details>
<summary><strong>Test 5b</strong>: Assert send emits the send-message event</summary>

```ts
@test()
protected async canSendWithValidParams() {
    // Step 2. Declare wasHit (fixes type error from Step 1)
    let wasHit = false

    // Step 1. Use eventFaker to listen for the send-message event
    await eventFaker.on('send-message::v2020_12_25', () => {
        wasHit = true
    })

    await this.sender.send({
        personId: generateId(),
        message: generateId(),
    })

    // Step 3. Assert the event was emitted
    assert.isTrue(wasHit, 'send-message event was not emitted!')
}
```

> **Note**: This fails because `send()` doesn't emit any events yet.

</details>

<details>
<summary><strong>Production 5b</strong>: Emit the send-message event</summary>

```ts
class MessageSender {
    // Step 3. Declare private property for the client (fixes type error from Step 2)
    private client: MercuryClient

    // Step 2. Add constructor to store the client (fixes type error from Step 1)
    private constructor(client: MercuryClient) {
        this.client = client
    }

    public static Sender(client: MercuryClient) {
        assertOptions({ client }, ['client'])
        // Step 1. Pass client to constructor (throws type error)
        return new this(client)
    }

    public async send(options: SendOptions) {
        assertOptions(options, ['personId', 'message'])

        // Step 4. Emit the send-message event (use generateId() for now)
        await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
            target: {
                personId: generateId(),
            },
            payload: {
                message: {
                    body: generateId(),
                    classification: 'transactional',
                },
            },
        })
    }
}
```

> **Note**: Test passes! Now `send()` emits the event with placeholder values.

</details>

<details>
<summary><strong>Test 5c</strong>: Assert send passes correct target</summary>

```ts
@test()
protected async canSendWithValidParams() {
    let wasHit = false
    // Step 2. Declare passedTarget (fixes type error from Step 1)
    let passedTarget:
        | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['target']
        | undefined

    await eventFaker.on('send-message::v2020_12_25', ({ target }) => {
        wasHit = true
        // Step 1. Capture the target (causes type error)
        passedTarget = target
    })

    // Step 3. Generate a personId to send
    const personId = generateId()

    await this.sender.send({
        personId,
        message: generateId(),
    })

    assert.isTrue(wasHit, 'send-message event was not emitted!')
    // Step 4. Assert the target has the correct personId
    assert.isEqualDeep(passedTarget, { personId }, 'Target sent to send-message is wrong!')
}
```

> **Note**: This fails because `send()` uses `generateId()` for personId instead of the actual value.

</details>

<details>
<summary><strong>Production 5c</strong>: Pass personId to target</summary>

```ts
    public async send(options: SendOptions) {
        // Step 2. Destructure personId from options (fixes type error from Step 1)
        const { personId } = assertOptions(options, ['personId', 'message'])

        await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
            target: {
                // Step 1. Use personId in target (causes type error)
                personId,
            },
            payload: {
                message: {
                    body: generateId(),
                    classification: 'transactional',
                },
            },
        })
    }
```

> **Note**: Test passes! Now `send()` passes the actual personId to the target.

</details>

<details>
<summary><strong>Test 5d</strong>: Assert send passes correct payload</summary>

```ts
@test()
protected async canSendWithValidParams() {
    let wasHit = false
    let passedTarget:
        | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['target']
        | undefined
    // Step 2. Declare passedPayload (fixes type error from Step 1)
    let passedPayload:
        | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['payload']
        | undefined

    await eventFaker.on('send-message::v2020_12_25', ({ target, payload }) => {
        wasHit = true
        passedTarget = target
        // Step 1. Capture the payload (causes type error)
        passedPayload = payload
    })

    const personId = generateId()
    // Step 3. Generate a message to send
    const message = generateId()

    await this.sender.send({
        personId,
        message,
    })

    assert.isTrue(wasHit, 'send-message event was not emitted!')
    assert.isEqualDeep(passedTarget, { personId }, 'Target sent to send-message is wrong!')
    // Step 4. Assert the payload has the correct message body
    assert.isEqualDeep(
        passedPayload?.message,
        {
            body: message,
            classification: 'transactional',
        },
        'Payload sent to send-message is wrong!'
    )
}
```

> **Note**: This fails because `send()` uses `generateId()` for body instead of the actual message.

</details>

<details>
<summary><strong>Production 5d</strong>: Pass message to payload</summary>

```ts
    public async send(options: SendOptions) {
        // Step 2. Destructure message from options (fixes type error from Step 1)
        const { personId, message } = assertOptions(options, ['personId', 'message'])

        await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
            target: {
                personId,
            },
            payload: {
                message: {
                    // Step 1. Pass message to body (causes type error)
                    body: message,
                    classification: 'transactional',
                },
            },
        })
    }
```

> **Note**: Test passes! Now `send()` passes both personId and message through correctly.

</details>

<details>
<summary><strong>Test 6</strong>: DRY the test</summary>

Remove the `wasHit` check since it's redundant - if the target and payload assertions pass, the event was definitely emitted.

```ts
@test()
protected async canSendWithValidParams() {
    // Step 1. Remove wasHit (redundant with target/payload assertions)
    let passedTarget:
        | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['target']
        | undefined
    let passedPayload:
        | SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload['payload']
        | undefined

    await eventFaker.on('send-message::v2020_12_25', ({ target, payload }) => {
        // Step 2. Remove wasHit = true
        passedTarget = target
        passedPayload = payload
    })

    const personId = generateId()
    const message = generateId()

    await this.sender.send({
        personId,
        message,
    })

    // Step 3. Remove wasHit assertion
    assert.isEqualDeep(passedTarget, { personId }, 'Target sent to send-message is wrong!')
    assert.isEqualDeep(
        passedPayload?.message,
        {
            body: message,
            classification: 'transactional',
        },
        'Payload sent to send-message is wrong!'
    )
}
```

> **Note**: Cleaner test! The `wasHit` check was redundant.

</details>

---

## Checklist for Claude

When generating TDD steps:

- [ ] Start with "throws with missing" test for builder/factory methods
- [ ] Use `@suite()` decorator, not static methods
- [ ] Step comments follow type error order (cause error first, fix second)
- [ ] Each test adds ONE new behavior
- [ ] Production code uses `generateId()` until tests force real values
- [ ] Proper SpruceSchemas types for captured event data
- [ ] All assertions have error messages
- [ ] DRY steps get their own number (Test 6, not Test 5e)
- [ ] Include `> **Note**:` explaining why test fails/passes
- [ ] Final step shows complete code
