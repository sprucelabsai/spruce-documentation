# Events

For this kata, you will be creating a `skill` that emits events. Both from the front-end and the back-end. We'll be creating a listener in your `Skill` as well as in your `RootSkillView`.

{% include "./includes/kata_setup.md" kata_name: "events" what_are_you_testing: "Emitting events" %}

# Events Kata

{% include "./includes/tests_up_to_card_with_button.md" kata_name: "events" what_are_you_testing: "Emitting events" %}

### Clicking the Button emits an Event

<details>
<summary><strong>Test 1</strong>: Handling the click of the Button</summary>

```typescript

// Step 1. Declare the new test
@test()
protected async clickingButtonEmitsEvent() {
    // Step 4. Declare variable to track whether the event was hit
    let wasHit = false

    // Step 2. Use the eventFaker utility from '@sprucelabs/spruce-test-fixtures' to listen to the event. Give it a random name to start because we have no defined our new event yet
    await eventFaker.on('event-kata', () => {
        // Step 3. Track that the event listener was hit
        wasHit = true
    })

    // Step 5. Use the interactor utility to click the button
    await interactor.clickButton(this.vc.getCardVc(), 'my-button')
}
```

> *Note*: Your test will be failing because your button does not have an onClick handler yet. We'll do that next.

</details>

<details>
<summary><strong>Production 1</strong>: Adding the onClick handler to the button</summary>

```typescript
private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'A card title',
        },
        footer: {
            buttons: [
                {
                    id: 'my-button',
                    label: 'My button',
                    // Step 1. Add the onClick handler to the button, it will do nothing
                    onClick: () => {},
                },
            ],
        },
    })
}
```

> *Note*: Now your test is passing! But to be fair, it's only checking if there was an onClick handler. Let's actually check if the event is emitted and the listener hit.

</details>

<details>
<summary><strong>Test 2</strong>: Checking if the Event is emitted</summary>

```typescript
@test()
protected async clickingButtonEmitsEvent() {
    let wasHit = false
    await eventFaker.on('event-kata', () => {
        wasHit = true
    })

    await interactor.clickButton(this.vc.getCardVc(), 'my-button')

    // Step 1. Assert that wasHit is true!
    assert.isTrue(wasHit, 'Event was not emitted')
}
```
</details>

<details>
<summary><strong>Production 2</strong>: Emitting the event</summary>

```typescript
private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'A card title',
        },
        footer: {
            buttons: [
                {
                    id: 'my-button',
                    label: 'My button',
                    // Step 1. Change the callback to be a method defined in the class
                    onClick: this.handleClickMyButton.bind(this),
                },
            ],
        },
    })
}

// Step 2. Create the method that will be called when the button is clicked
private async handleClickMyButton() {
    // Step 3. Connect to the API
    const client = await this.connectToApi()
    // Step 4. Emit the event
    await client.emitAndFlattenResponses('my-event-kata')
}
```

> *Note*: Now your test will be failing (and types too) because of the event name not existing. Lets fix that next.

</details>

<details>
<summary><strong>Production 3</strong>: Create the Event</summary>

1. Hit `ctrl+space` and type `create.event`
2. For Readable Name, type `My first event` (or whatever you want, really)
3. For Kebab Case Name, just hit `enter`
4. For Camel Case Name, just hit `enter`
5. For Version, select the latest version (if prompted)
</details>

<details>
<summary><strong>Production 4</strong>: Defining the Event</summary>

We need to define 4 things in our event:
1. The Event's Emit Target
2. The Event's Emit Payload
3. The Event's Response Payload
4. The Event's Permissions

You can put whatever you would like in here, but you should visit the [Events documentation](/concepts/events/) to learn more.

For now, here is what we're petting in each:

**Emit Payload**:
`src/events/my-first-event/v2025_04_24/emitPayload.builder.ts`:

```typescript
import { buildSchema } from '@sprucelabs/schema'

const myFirstEventEmitPayloadBuilder = buildSchema({
    id: 'myFirstEventEmitPayload',
    fields: {
        randomValue: { // Step 1: We're defining a field called randomValue
            type: 'text', // Step 2: The type is text, but you can use any type you want
            isRequired: true, // Step 3: This field is required for now
        },
    },
})

export default myFirstEventEmitPayloadBuilder
```

**Emit Target**: `src/events/my-first-event/v2025_04_24/emitTarget.builder.ts`:

```typescript
import { buildSchema } from '@sprucelabs/schema'

const myFirstEventEmitTargetBuilder = buildSchema({
    id: 'myFirstEventEmitTarget',
    fields: {}, // Step 1: Clear out all fields, we don't need any for this kata
})

export default myFirstEventEmitTargetBuilder
```

**Event Options**: `src/events/my-first-event/v2025_04_24/event.options.ts`:

```typescript
import { EventSignature } from '@sprucelabs/mercury-types'
import '#spruce/permissions/permissions.types'
import '@sprucelabs/mercury-core-events'

type Options = Omit<
    EventSignature,
    | 'responsePayloadSchema'
    | 'emitPayloadSchema'
    | 'listenPermissionContract'
    | 'emitPermissionContract'
>

const eventOptions: Options = {
    isGlobal: true, // Step 1: Set to true because we are not scoping to a location or organization
}

export default eventOptions
```

**Response Payload**: `src/events/my-first-event/v2025_04_24/responsePayload.builder.ts`:

```typescript
import { buildSchema } from '@sprucelabs/schema'

const myFirstEventResponsePayloadBuilder = buildSchema({
    id: 'myFirstEventResponsePayload',
    fields: {
        wasSuccesful: { // Step 1: Define a field called wasSuccesful
            type: 'boolean', // Step 2: The type is boolean, but you can use any type you want
            isRequired: true, // Step 3: This field is required for now
        },
    },
})

export default myFirstEventResponsePayloadBuilder
```
</details>

<details>
<summary><strong>Production 5</strong>: Sync events</summary>

To have the event contract built from the builders you just created, you need to run the following command:

```bash
spruce sync.events
```
</details>

<details>
<summary><strong>Production 6</strong>: Fix the type errors</summary>

Inside your `Root.svc.ts`, you will need to fix the type error on `client.emitAndFlattenResponses` my updating it to match the fully qualified event name you just created. 

```typescript
private async handleClickMyButton() {
    const client = await this.connectToApi()
    await client.emitAndFlattenResponses(
        'events-kata.my-first-event::v2025_04_24' // Step 1: Use the event name you just created
    )
}
```
> *Note*: The easiest way to get event names right is to delete the quotes and type a single quote, then start typing the namespace of your skill and choose the event from the autocomplete.

</details>

<details>
<summary><strong>Test 3</strong>: Fix the type errors</summary>

Now we have to do the same thing for our test!

```typescript
@test()
protected async clickingButtonEmitsEvent() {
    let wasHit = false
    await eventFaker.on('events-kata.my-first-event::v2025_04_24', () => { // Step 1: Use the fully qualified event name
        wasHit = true
    })

    await interactor.clickButton(this.vc.getCardVc(), 'my-button')
    assert.isTrue(wasHit, 'Event was not emitted')
}
```

</details>

<details>
<summary><strong>Production 7</strong>: Fix the failing test</summary>

You should now be getting an error that reads like this:
```
Error: The emit payload you passed to "events-kata.my-first-event::v2025_04_24" is invalid:

'myFirstEventEmitTargetAndPayload' has 1 error!

1. 'payload' is required.
```

So, lets go drop something in for now:

```typescript
private async handleClickMyButton() {
    const client = await this.connectToApi()
    await client.emitAndFlattenResponses(
        'events-kata.my-first-event::v2025_04_24',
        {
            payload: { // Step 1: Add the payload in the object passed as the second argument
                randomValue: 'aoeuaoue', // Step 2: Put in gibberish for now, we'll test it later
            },
        }
    )
}
```

</details>

<details>
<summary><strong>Test 4</strong>: Fix the test</summary>

You should now be getting an error that reads like this:

```
Error: The response payload to "events-kata.my-first-event::v2025_04_24" is invalid:

'myFirstEventResponsePayload' has 1 error!

1. 'wasSuccesful' is required.
```

> *Note*: Pay careful attention to the error message, it is telling you that the response payload is missing a field called `wasSuccesful`. Sometimes its easy to miss the fact the error was in the response payload, not the emit payload.

Now lets fix the test:

```typescript
@test()
protected async clickingButtonEmitsEvent() {
    let wasHit = false
    await eventFaker.on('events-kata.my-first-event::v2025_04_24', (response) => {
        wasHit = true

        return { // Step 1: Add the wasSuccesful field to the response
            wasSuccesful: true, 
        }
    })

    await interactor.clickButton(this.vc.getCardVc(), 'my-button')
    assert.isTrue(wasHit, 'Event was not emitted')
}
```

</details>

### Test the front end

If you aren't running `spruce watch.views`, run it again and then visit:

[http://localhost:8080/#views/events-kata.root](http://localhost:8080/#views/events-kata.root)

And click the button. Nothing happens! Now, check the error console! You should see something like this:

`Unhandled Promise Rejection: Error: Oh no! No skill is listening to events-kata.my-first-event::v2025_04_24! I've let the proper humans know!`

We don't want unhandled promise rejections! So lets fix that on the front-end first!

### Rendering an alert when emitting throws

<details>
<summary><strong>Test 1</strong>: Rendering an alert when emitting throws</summary>

```typescript
@test()
protected async rendersAnAlertWhenEventThrows() { // Step 1. Declare the test
    await eventFaker.makeEventThrow( // Step 2. Use the eventFaker utility to make the event throw
        'events-kata.my-first-event::v2025_04_24'
    )

    await vcAssert.assertRendersAlert(this.vc, () =>  // Step 3. Assert that an alert is rendered when clicking the button
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Rendering an alert when emitting throws</summary>

```typescript
private async handleClickMyButton() {
    try { // Step 1. Wrap the emit in a try/catch block
        const client = await this.connectToApi()
        await client.emitAndFlattenResponses(
            'events-kata.my-first-event::v2025_04_24',
            {
                payload: {
                    randomValue: 'aoeuaoue',
                },
            }
        )
    } catch (err: any) { // Step 2. Catch the error and type as any or unknown
        this.log.error( // Step 3. Log the error (always helpful when degugging)
            `Failed to emit the event!`,
            err.stack ?? err.message
        )
        await this.alert({ // Step 4. Render an alert!
            message: `Oh no! The event failed to emit!`,
        })
    }
}
```

</details>

### Test the front end again

Refresh [http://localhost:8080/#views/events-kata.root](http://localhost:8080/#views/events-kata.root) and click the button. You should see an alert! That is much better!

### Finishing up the front-end tests

<details>
<summary><strong>Test 1</strong>: Checking the emit payload</summary>

```typescript
@test()
protected async clickingButtonEmitsEvent() {
    let wasHit = false
    let passedPayload: // Step 1. Declare a variable to track the payload passed to the event listener
        | SpruceSchemas.EventsKata.v2025_04_24.MyFirstEventEmitTargetAndPayload['payload']
        | undefined
    await eventFaker.on(
        'events-kata.my-first-event::v2025_04_24',
        ({ payload }) => {
            wasHit = true
            passedPayload = payload // Step 2. Track the payload passed to the event listener
            return {
                wasSuccesful: true,
            }
        }
    )

    await interactor.clickButton(this.vc.getCardVc(), 'my-button')
    assert.isTrue(wasHit, 'Event was not emitted')
    assert.isEqualDeep(passedPayload, { // Step 3. Assert that the payload is what we expect
        randomValue: 'I love katas!',
    })
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Update the emit payload</summary>

```typescript
await client.emitAndFlattenResponses(
    'events-kata.my-first-event::v2025_04_24',
    {
        payload: {
            randomValue: 'I love katas!', // Step 1. Update to match the test
        },
    }
)
```
</details>

<details>
<summary><strong>Test 2a</strong>: Extract out cardVc</summary>
There is a lot of duplication and uneeded code in the test now, let's refactor it!

```typescript
@suite()
export default class EmittingEventsTest extends AbstractSpruceFixtureTest {
    ...

    @test()
    protected cardRendersButton() {
        // Step 1: Extract out this.vc.getCardVc() to a method called this.cardVc
        // and change it to a getter (see step 2)
        buttonAssert.cardRendersButton(this.cardVc, 'my-button')
    }

    @test()
    protected async clickingButtonEmitsEvent() {
        let wasHit = false
        let passedPayload:
            | SpruceSchemas.EventsKata.v2025_04_24.MyFirstEventEmitTargetAndPayload['payload']
            | undefined
        await eventFaker.on(
            'events-kata.my-first-event::v2025_04_24',
            ({ payload }) => {
                wasHit = true
                passedPayload = payload
                return {
                    wasSuccesful: true,
                }
            }
        )

        // Step 3: Use this.cardVc instead of this.vc.getCardVc()
        await interactor.clickButton(this.cardVc, 'my-button')
        assert.isTrue(wasHit, 'Event was not emitted')
        assert.isEqualDeep(passedPayload, {
            randomValue: 'I love katas!',
        })
    }

    @test()
    protected async rendersAnAlertWhenEventThrows() {
        await eventFaker.makeEventThrow(
            'events-kata.my-first-event::v2025_04_24'
        )

        await vcAssert.assertRendersAlert(this.vc, () =>
            // Step 4: Use this.cardVc instead of this.vc.getCardVc()
            interactor.clickButton(this.cardVc, 'my-button')
        )
    }

    // Step 2: Move method to the bottom and add `get` to the method name 
    // to make it a getter
    private get cardVc() {
        return this.vc.getCardVc()
    }
}
```
</details>

<details>
<summary><strong>Step 2b</strong>: Extract out click interaction</summary>

```typescript
@suite()
export default class EmittingEventsTest extends AbstractSpruceFixtureTest {
    private vc!: SpyRootSkillView

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.views.setController('events-kata.root', SpyRootSkillView)
        this.vc = this.views.Controller(
            'events-kata.root',
            {}
        ) as SpyRootSkillView
    }

    @test()
    protected rendersACard() {
        vcAssert.assertSkillViewRendersCard(this.vc)
    }

    @test()
    protected cardRendersButton() {
        buttonAssert.cardRendersButton(this.cardVc, 'my-button')
    }

    @test()
    protected async clickingButtonEmitsEvent() {
        let wasHit = false
        let passedPayload:
            | SpruceSchemas.EventsKata.v2025_04_24.MyFirstEventEmitTargetAndPayload['payload']
            | undefined
        await eventFaker.on(
            'events-kata.my-first-event::v2025_04_24',
            ({ payload }) => {
                wasHit = true
                passedPayload = payload
                return {
                    wasSuccesful: true,
                }
            }
        )
        // Step 1: Extract the interaction to a method called clickMyButton
        await this.clickMyButton()
        assert.isTrue(wasHit, 'Event was not emitted')
        assert.isEqualDeep(passedPayload, {
            randomValue: 'I love katas!',
        })
    }

    @test()
    protected async rendersAnAlertWhenEventThrows() {
        await eventFaker.makeEventThrow(
            'events-kata.my-first-event::v2025_04_24'
        )

        // Step 3: Use the clickMyButton method instead of interactor.clickButton
        await vcAssert.assertRendersAlert(this.vc, () => this.clickMyButton())
    }

    private get cardVc() {
        return this.vc.getCardVc()
    }

    // Step 2: Move the new method to the bottom of the class
    private async clickMyButton() {
        await interactor.clickButton(this.cardVc, 'my-button')
    }
}
```
</details>

<details>
<summary><strong>Step 3c</strong>: Remove uneeded code</summary>

We no longer need the `wasHit` variable because we're testing the passed payload.

```typescript
@test()
protected async clickingButtonEmitsEvent() {
    let passedPayload:
        | SpruceSchemas.EventsKata.v2025_04_24.MyFirstEventEmitTargetAndPayload['payload']
        | undefined

    // Step 1: Remove the wasHit variable
    await eventFaker.on(
        'events-kata.my-first-event::v2025_04_24',
        ({ payload }) => {
            // Step 2: Remove the wasHit variable assignment
            passedPayload = payload
            return {
                wasSuccesful: true,
            }
        }
    )

    await this.clickMyButton()

    // Step 3: Remove the assert.isTrue(wasHit, 'Event was not emitted') line
    assert.isEqualDeep(passedPayload, {
        randomValue: 'I love katas!',
    })
}
```
</details>

### Testing the back-end (creating a listener)

<details>
<summary><strong>Test 1a</strong>: Create a new test</summary>

Hit `ctrl+space` and type `create.test`, then fill out the form with the following:

- **Type of test**: Behavioral
- **What are you testing**: My first event listener
- **Camel case name**: Just hit enter
- **Where should I write this test?**: Select the behavioral tests folder, first option
- **Which abstract test class do you want to extend?**: Select `AbstractSpruceFixtureTest`
</details>

<details>
<summary><strong>Test 1b</strong>: Update the test</summary>

```typescript
@fake.login()
@suite()
export default class MyFirstEventListenerTest extends AbstractSpruceFixtureTest {
    // Step 1: Remove existing tests and class declaration at the bottom
    @test()
    protected async skillIsListening() { // Step 2: Declare the new test
        await this.bootSkill() // Step 3: Boot the skill so it can listen to events
        await this.fakedClient.emitAndFlattenResponses( // Step 4: Emit the event
            'events-kata.my-first-event::v2025_04_24'
        )
    }
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Create the listener</summary>

1. Hit `ctrl+space` and type `create.listener`
2. For "Select Namespace", select `EventsKata`
3. For "Select an Event", select `events-kata.my-first-event::v2025_04_24`

> *Note*: Your test will now fail because we're not passing a payload. We'll fix that next.

</details>

<details>
<summary><strong>Test 2</strong>: Emit the propert payload</summary>

```typescript
@test()
protected async skillIsListening() {
    await this.bootSkill()
    await this.fakedClient.emitAndFlattenResponses(
        'events-kata.my-first-event::v2025_04_24',
        {
            payload: { // Step 1: Add the payload to the emit
                randomValue: generateId(), // Step 2: Put in random id for now (will need to import)
            },
        }
    )
}
```

> *Note*: Your test will now fail because the listener is throwing an error. Let's fix that now!

</details>

<details>
<summary><strong>Production 2</strong>: Update the listener</summary>

Jump into your new listener at: `src/listeners/events-kata/my-first-event.v2025_04_24.listener.ts`

```typescript
// Step 1: Remove the current contents of the listener and all unused imports
export default async (
    _event: SpruceEvent<SkillEventContract, EmitPayload> // Step 2: Underscore event to disable unused variable warning
): SpruceEventResponse<ResponsePayload> => {
    return { // Step 3: Return an object with the wasSuccesful field
        wasSuccesful: false, // Step 4: Set wasSuccesful to false for now
    }
}
```
</details>

<details>
<summary><strong>Test 3</strong>: Test the listener returns true</summary>

```typescript
@test()
protected async listenerReturnsWasSuccesful() { // Step 1: Declare a new test
    await this.bootSkill() // Step 2: Boot the skill
    const [{ wasSuccesful }] =
        await this.fakedClient.emitAndFlattenResponses( // Step 3: Emit the event and flatten the responses
            'events-kata.my-first-event::v2025_04_24',
            {
                payload: {
                    randomValue: generateId(),
                },
            }
        )

    assert.isTrue(wasSuccesful, 'Expected wasSuccesful to be true') // Step 4: Assert that wasSuccesful is true
}
```
</details>

<details>
<summary><strong>Production 3</strong>: Update the listener to return true (and log for fun)</summary>

We'll also do some logging here so we can see the payload that was passed in when we test the front-end.

```typescript
export default async (
    event: SpruceEvent<SkillEventContract, EmitPayload>
): SpruceEventResponse<ResponsePayload> => {
    const { payload } = event // Step 1: Destructure the payload from the event
    console.log('Received payload:', payload) // Step 2: Log the payload to the console
    return {
        wasSuccesful: true, // Step 3: Set wasSuccesful to true
    }
}
```
</details>

<details>
<summary><strong>Test 4</strong>: Refactor the test</summary>

```typescript
export default class MyFirstEventListenerTest extends AbstractSpruceFixtureTest {

    // Step 1: Declare beforeEach to boot the skill
    // Step 2: Remove bootSkill from your other tests
    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        await this.bootSkill()
    }

    @test()
    protected async skillIsListening() {
        // Step 3: Extract the emit to a method called emit
        await this.emit()
    }

    @test()
    protected async listenerReturnsWasSuccesful() {
        // Step 6: Swap out the emitAndFlattenResponses call for the emit method
        const wasSuccesful = await this.emit()
        assert.isTrue(wasSuccesful, 'Expected wasSuccesful to be true')
    }

    // Step 4: Move the emit method to the bottom of the class
    // Step 5: Destructure the response to get wasSuccesful and return it directly
    private async emit() {
        const [{ wasSuccesful }] =
            await this.fakedClient.emitAndFlattenResponses(
                'events-kata.my-first-event::v2025_04_24',
                {
                    payload: {
                        randomValue: generateId(),
                    },
                }
            )

        return wasSuccesful
    }
}
```

</details>

### Test the front end again

Whenever you change the back-end, you'll need to start the watcher again (since `watch.views` only watches the front-end). Also, the view watcher is not the best for viewing logs, So kill the watcher and go to the debug pane (cmd+d) and switch the dropdown to `boot` and click the play button.

Then, Load up the front-end at [http://localhost:8080/#views/events-kata.root](http://localhost:8080/#views/events-kata.root) and click the button! 

The alert that no skill is listening should be gone, and you should see the console log in the debug pane with the payload that was passed in!


### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

