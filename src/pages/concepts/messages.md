# Messages

Spruce provides a unified messaging system that allows your skill to send messages to people via SMS, email, or push notifications. The delivery mechanism is handled by Mercury based on the recipient's preferences and available contact information.

To send a message, you emit the `send-message::v2020_12_25` event with a target (who receives it) and a payload (the message content).

## Message Structure

A message consists of:

| Field | Required | Description |
| --- | --- | --- |
| `body` | Yes | The message text. Supports Handlebars templating (e.g., `{{name}}`). |
| `classification` | Yes | One of: `auth`, `transactional`, `promotional`, `incoming` |
| `context` | No | Key-value pairs for template variables |
| `subject` | No | Email subject line |
| `links` | No | Array of clickable links with `label` and `uri` |
| `choices` | No | Array of response choices |

## Sending a Message to a Person

This walkthrough shows how to test and implement sending a message from your skill to a specific person. We'll create a `MessageSender` class that handles sending messages.

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

> **Note**: `assertOptions` from `@sprucelabs/schema` throws `MISSING_PARAMETERS` if required options are missing. Test passes! We don't add parameters or a constructor yet - we'll do that when tests require it.

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

> **Note**: This fails because `Sender()` doesn't accept any parameters yet. We need to update it.

</details>

<details>
<summary><strong>Production 2</strong>: Accept client parameter</summary>

Update `Sender()` to accept the client:

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
<summary><strong>Test 4</strong>: Dry your tests</summary>

Now we move the sender creation to `beforeEach()` and delete the `canCreateSenderWithRequired` test since we're creating the sender in every test now.

```ts
import { MercuryClient } from '@sprucelabs/mercury-client'
import { assertOptions } from '@sprucelabs/schema'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'

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

class MessageSender {
    public static Sender(client: MercuryClient) {
        assertOptions({ client }, ['client'])
        return new this()
    }

    public send() {
        assertOptions({}, ['personId', 'message'])
    }
}
```

> **Note**: By moving the sender creation to `beforeEach()`, we can delete the `canCreateSenderWithRequired` test since every test now implicitly tests that we can create a sender.

</details>

<details>
<summary><strong>Test 5a</strong>: Can send with valid parameters</summary>

Now we test that calling `send()` with valid parameters doesn't throw.

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
class MessageSender {
    public static Sender(client: MercuryClient) {
        assertOptions({ client }, ['client'])
        return new this()
    }

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

interface SendOptions {
    personId: string
    message: string
}
```

> **Note**: Test passes! Now `send()` stores the client and emits the `send-message::v2020_12_25` event with the required target and payload.

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

> **Note**: This fails because `send()` uses `generateId()` for personId instead of the actual value passed in.

</details>

<details>
<summary><strong>Production 5c</strong>: Pass personId to target</summary>

```ts
    public async send(options: SendOptions) {
        // Step 1. Destructure personId from options
        const { personId } = assertOptions(options, ['personId', 'message'])

        await this.client.emitAndFlattenResponses('send-message::v2020_12_25', {
            target: {
                // Step 2. Pass personId to target
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

> **Note**: This fails because `send()` uses `generateId()` for body instead of the actual message passed in.

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

> **Note**: Cleaner test! The `wasHit` check was redundant since the target and payload assertions would fail anyway if the event wasn't emitted.

</details>

<details>
<summary><strong>Final</strong>: Complete test file with MessageSender</summary>

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

</details>

## Scoping Messages

When sending messages, you should always include a `locationId` in the target. This field is used for **permission checks** to verify that the person or skill emitting the event has the right to send messages within that scope.

> **Important**: The `locationId` field does NOT broadcast to everyone at that location. It is strictly for authorization purposes.

### How Permission Checks Work

When a **person** emits `send-message` targeting a `personId`, `phone`, or `email`, the system checks if they have the `can-message-others` permission. The `locationId` is used to scope this permission check:

```ts
// Person sending a message - permission check uses locationId
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...',
        locationId: '...', // Scopes the can-message-others permission check
    },
    payload: {
        message: {
            body: 'Your appointment is confirmed!',
            classification: 'transactional',
        },
    },
})
```

If no `locationId` is provided and the sender is a person targeting another person/phone/email, the permission check will fail unless they have global `can-message-others` permission.

### Skills Sending Messages

When a **skill** emits `send-message`, authorization depends on whether the skill is installed at the location's organization. Include `locationId` to verify the skill has access:

```ts
// Skill sending a message - must be installed at the location's organization
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...',
        locationId: '...', // Verifies skill is installed at this location's org
    },
    payload: {
        message: {
            body: 'Your appointment is confirmed!',
            classification: 'transactional',
        },
    },
})
```

If no `locationId` is provided, the skill must have elevated platform-level permissions to send messages.

## Handlebars Templating

Message bodies support [Handlebars](https://handlebarsjs.com/) templating, allowing you to personalize messages with dynamic content. Use the `context` field to pass variables that will be interpolated into your message.

### Basic Variable Substitution

{% raw %}
```ts
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...',
        locationId: '...',
    },
    payload: {
        message: {
            body: 'Hi {{name}}, your appointment is at {{time}}!',
            classification: 'transactional',
            context: {
                name: 'Taylor',
                time: '3:00 PM',
            },
        },
    },
})
// Result: "Hi Taylor, your appointment is at 3:00 PM!"
```
{% endraw %}

### Conditional Content

Use Handlebars conditionals to include content based on context values:

{% raw %}
```ts
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...',
        locationId: '...',
    },
    payload: {
        message: {
            body: 'Hi {{name}}! {{#if isNewCustomer}}Welcome to our store!{{else}}Great to see you again!{{/if}}',
            classification: 'transactional',
            context: {
                name: 'Taylor',
                isNewCustomer: true,
            },
        },
    },
})
// Result: "Hi Taylor! Welcome to our store!"
```
{% endraw %}

### Iterating Over Lists

Use `{% raw %}{{#each}}{% endraw %}` to iterate over arrays in your context:

{% raw %}
```ts
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...',
        locationId: '...',
    },
    payload: {
        message: {
            body: 'Your order contains: {{#each items}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}',
            classification: 'transactional',
            context: {
                items: ['Coffee', 'Bagel', 'Orange Juice'],
            },
        },
    },
})
// Result: "Your order contains: Coffee, Bagel, Orange Juice"
```
{% endraw %}

### Nested Objects

Access nested properties using dot notation:

{% raw %}
```ts
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...',
        locationId: '...',
    },
    payload: {
        message: {
            body: 'Hi {{customer.name}}, your order #{{order.id}} will arrive at {{order.address.street}}.',
            classification: 'transactional',
            context: {
                customer: { name: 'Taylor' },
                order: {
                    id: '12345',
                    address: { street: '123 Main St' },
                },
            },
        },
    },
})
// Result: "Hi Taylor, your order #12345 will arrive at 123 Main St."
```
{% endraw %}

### Custom Helpers

Spruce provides custom Handlebars helpers for common messaging patterns:

#### joinIntoSentence

Joins an array into a human-readable sentence with commas and "&" before the last item:

{% raw %}
```ts
body: 'Attendees: {{joinIntoSentence names}}',
context: {
    names: ['Alice', 'Bob', 'Charlie'],
}
// Result: "Attendees: Alice, Bob & Charlie"
```
{% endraw %}

#### properPluralization

Returns singular or plural text based on array length:

{% raw %}
```ts
body: 'You have {{items.length}} {{properPluralization items "items" "item"}} in your cart.',
context: {
    items: ['Coffee'],
}
// Result: "You have 1 item in your cart."
```
{% endraw %}

#### formatDateTimeUntil

Formats a timestamp relative to now (e.g., "today @ 3pm", "tomorrow @ 9am"). Automatically uses the recipient's timezone when `locationId` is provided in the target:

{% raw %}
```ts
body: 'Your appointment is {{formatDateTimeUntil appointmentTime}}',
context: {
    appointmentTime: 1705420800000, // timestamp in ms
}
// Result: "Your appointment is tomorrow @ 2pm"
```
{% endraw %}

You can also pass a `timezone` in context to override:

```ts
context: {
    appointmentTime: 1705420800000,
    timezone: 'America/Denver',
}
```

### Extended Helpers

Spruce also includes all helpers from [@budibase/handlebars-helpers](https://github.com/Budibase/handlebars-helpers), giving you access to 180+ helpers for strings, arrays, math, comparisons, and more.

## Messaging Permissions

The `messaging-contract` defines the permissions for sending and receiving messages.

### can-message-others

The primary permission for sending messages to other people. This permission is checked when a person targets a `personId`, `phone`, or `email`.

**Default Access:**

| Role | Default |
| --- | --- |
| `skill` | `true` |
| `owner` | `true` |
| `groupManager` | `true` |
| `manager` | `true` |
| `teammate` | `true` |

> **Note**: This permission is scoped by `locationId`. People on the team can message others at the same company and/or location.

### Other Messaging Permissions

| Permission | Description | Default |
| --- | --- | --- |
| `can-emit-did-message-event` | Notify others when a message was sent | Reserved for special skills |
| `can-listen-to-did-message-event` | Listen to updates about messages | Logged-in users: `true` |
| `can-message-as-sprucebot` | Send messages as Sprucebot | Reserved for platform |

## Interfaces

### SendMessageTarget

The `target` determines who receives the message and scopes the permission check.

```ts
interface SendMessageTarget {
    personId?: string       // The person to send the message to
    locationId?: string     // Scopes permission check to this location's organization
    organizationId?: string // Scopes permission check to this organization
    skillId?: string        // Send to a skill
    roleId?: string         // Filter recipients by role (used with locationId/organizationId)
    phone?: string          // Send to a phone number (requires can-message-others permission)
    email?: string          // Send to an email address (requires can-message-others permission)
}
```

> **Note**: When a person targets `personId`, `phone`, or `email`, the `can-message-others` permission is checked using the `locationId` for scoping. Skills must be installed at the location's organization to send messages.

### SendMessageMessagePayload

The `message` object contains the content and metadata for your message.

```ts
interface SendMessageMessagePayload {
    body: string                    // Required. The message text. Supports Handlebars templating.
    classification: MessageClassification // Required. One of: 'auth', 'transactional', 'promotional', 'incoming'
    subject?: string                // Email subject line
    context?: Record<string, any>   // Key-value pairs for Handlebars template variables
    links?: Link[]                  // Array of clickable links
    choices?: Choice[]              // Array of response choices for the recipient
    trackingId?: string             // Arbitrary ID to track this message before it's assigned an ID
    inReplyToMessageId?: string     // If replying to another message, the original message ID
    topicId?: string                // Topic ID for message threading
    log?: string                    // Debug log associated with the message
}
```

### MessageClassification

```ts
type MessageClassification = 'auth' | 'transactional' | 'promotional' | 'incoming'
```

| Classification | Use Case |
| --- | --- |
| `auth` | Authentication codes, password resets |
| `transactional` | Order confirmations, appointment reminders, notifications |
| `promotional` | Marketing messages, announcements |
| `incoming` | Messages received from external sources |

> **Note**: Most skill messages should use `transactional`. Use `promotional` only for marketing content and be aware of opt-out requirements.

### Link

```ts
interface Link {
    label: string  // Display text for the link
    uri: string    // The URL to open when clicked
}
```

### Choice

Response choices allow the recipient to respond with predefined options.

```ts
interface Choice {
    value: string | number  // The value sent back when this choice is selected
    label: string           // Display text for the choice
}
```

### Full Emit Structure

Here's the complete structure when emitting `send-message::v2020_12_25`:

{% raw %}
```ts
await client.emitAndFlattenResponses('send-message::v2020_12_25', {
    target: {
        personId: '...', // or locationId, organizationId, etc.
    },
    payload: {
        message: {
            body: 'Hello {{name}}!',
            classification: 'transactional',
            subject: 'Welcome!',           // optional
            context: { name: 'Taylor' },   // optional - for Handlebars
            links: [                       // optional
                { label: 'View Details', uri: 'https://example.com' }
            ],
            choices: [                     // optional
                { value: 'yes', label: 'Accept' },
                { value: 'no', label: 'Decline' }
            ],
        },
    },
})
```
{% endraw %}

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>
