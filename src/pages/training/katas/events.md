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
5. For Version, select the latest version (if prompted
)
</details>

<details>
<summary><strong>Production 4</strong>: Defining the Event</summary>

We need to define 4 things in our event:
1. The Event's Emit Target
2. The Event's Emit Payload
3. The Event's Response Payload
4. The Event's Permissions



</details>


### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>