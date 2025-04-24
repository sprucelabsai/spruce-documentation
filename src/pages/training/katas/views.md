# Views

In this kata, we're going to focus solely on creating `views`! It'll be short and sweet and give you the opportunity to play around with `view` related concepts. We'll do that by rendering your `RootSkillView`, then a `Card`, then a `Button` that, when clicking, will render a `Dialog`. Finally, we'll add a `Button` to the `Dialog` that will close the `Dialog` and return to the `RootSkillView`.

The trick here is that the `Dialog` won't close itself, but instead will invoke a callback passed to it by your `RootSkillView`. This will give you a taste of how to pass data between `views` and how to use `onClick` callbacks. Plus, it'll maintain responsibility separation between the `RootSkillView` and the `Dialog`.

<div class="video shadow">
    <video autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline">
        <source src="https://spruce-theatre.s3.us-east-1.amazonaws.com/documentation/views.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>


{% include "./includes/kata_setup.md" kata_name: "views" what_are_you_testing: "Root skill view" %}

# Views Kata

{% include "./includes/tests_up_to_card_with_button.md" kata_name: "views" what_are_you_testing: "Root skill view" %}

### Rendering a Dialog

<details>
<summary><strong>Test 1</strong>: Asserting clicking your button renders a Dialog</summary>

```ts

// Step 1. Declare a new test
@test()
protected async clickingButtonRendersDialog() {
    // Step 2. Use the 'vcAssert' util to assert the dialog renders
    await vcAssert.assertRendersDialog(this.vc, () =>
        // Step 3. Use the 'interactor' util to click the button in your card
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )
}

```
> **Note**: Make sure your test is `async` since we'll be interacting with Views
> **Note**: You will first get an error that your Button does not have an 'onClick' set, so let's fix that!

</details>

<details>
<summary><strong>Production 1</strong>: Handling 'onClick'</summary>

```typescript
private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'A title!',
        },
        footer: {
            buttons: [
                {
                    id: 'my-button',
                    label: 'My button',
                    type: 'primary',
                    // Step 1. Add an onClick to your button and pass it a method bound to self
                    onClick: this.handleClick.bind(this),
                },
            ],
        },
    })
}

// Step 2. Declare the handleClick method
private async handleClick() {}
```

> **Note**: Now your test will fail because you're not rendering a Dialog, which makes sense if you think about it. 😜

</details>

<details>
<summary><strong>Production 2</strong>: Rendering a Dialog</summary>

```typescript
private async handleClick() {
    // Step 1. Use the 'renderInDialog' method to render an empty Dialog
    this.renderInDialog({
        header: {
            title: "I'm a dialog!",
        },
    })
}
```

> **Note**: Now your test should be passing! 🎉 Go ahead and refresh in the `Development Theater` to see it in action!

</details>

### Rendering a custom Dialog View

<details>
<summary><strong>Test 1</strong>: Asserting your Dialog renders a custom View</summary>

```typescript
@test()
protected async clickingButtonRendersDialog() {
    // Step 1. get the dialogVc that is returned from the assertRendersDialog
    const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )

    // Step 2. Assert the dialogVc is an instance of your custom view
    vcAssert.assertRendersAsInstanceOf(dialogVc, MyDialogCardViewController)
}
```

> **Note**: You will get an error that 'MyDialogCardViewController' does not exist, so let's create it!

</details>

<details>
<summary><strong>Production 1</strong>: Creating your custom Dialog Card</summary>

1. Hit `ctrl+space` and type `create.view` and hit `Enter`.
2. Select "View Controller"
3. Controller name "My Dialog Card"
4. For view model: `Card`

</details>

<details>
<summary><strong>Test 2</strong>: Implementing your custom Dialog View</summary>

```typescript
// Step 2: It will be auto imported for you
import MyDialogCardViewController from '../../viewControllers/MyDialogCard.vc'

@test()
protected async clickingButtonRendersDialog() {
    const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )
    // Step 1. Click on MyDialogCardViewController and hit 'Ctrl + .' and import it
    vcAssert.assertRendersAsInstanceOf(dialogVc, MyDialogCardViewController)
}
```
> **Note**: Your test will now fail because you are not rendering `MyDialogCardViewController` into `this.renderInDialog(...). Let's fix that!
</details>

<details>
<summary><strong>Production 2a</strong>: Getting MyDialogCard rendering a Card</summary>

If you look at `MyDialogCard.vc`, you will see that it is not rendering anything. Just an empty object. In order for `MyDialogCard` to be useful, we need to render a `Card`.

```typescript
export default class MyDialogCardViewController extends AbstractViewController<Card> {
    public static id = 'my-dialog-card'
    // Step 3. Change the type to be 'CardViewController' and 'Command + .' to import it
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)

        // Step 1. Construct a CardViewController and set it to this.cardVc
        // Step 2. Use 'Command + .' to declare the cardVc property
        this.cardVc = this.Controller('card', {
            header: {
                title: 'My Dialog Card',
            },
        })
    }

    public render() {
        // Step 4. Render the card
        return this.cardVc.render()
    }
}

```

</details>

<details>
<summary><strong>Production 2b</strong>: Rendering MyDialogCard into the Dialog</summary>

Jump into `Root.svc.ts` and update the `handleClick` method to render your new `MyDialogCardViewController` into the dialog.

```typescript
private async handleClick() {
    // Step 1. Use the 'Controller' Factory Method to create a new instance of your view and render it
    this.renderInDialog(
        this.Controller('views-kata.my-dialog-card', {}).render()
    )
}
```
> **Note**: Tests are passing! 🎉 Let's check it out on the front end. If you aren't watching for view changes, hit 'Ctrl + Space' and type `watch.views`. Then refresh your Development Theatre. When you click "My Button" the Dialog that renders should have the header title of "My Dialog Card"

</details>

<details>
<summary><strong>Production 3</strong>: Refactor MyDialogCard</summary>

```typescript
public constructor(options: ViewControllerOptions) {
    super(options)

    // Step 1. Select the construction or your skill view and hit 'Ctrl + Shift + r' and extract to 'CardVc' method
    this.cardVc = this.CardVc()
}

private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'My Dialog Card',
        },
    })
}
```
</details>

### Dialog and Root Communication

We're going to add a Button to the Dialog labeled "Done" that will trigger your "RootSkillView" to close the Dialog. This will involve passing some callback functions and will lay the foundation for further communication between 2 View Controllers.

<details>
<summary><strong>Test 1a</strong>: Creating a new test for MyDialogCard</summary>

1. Hit `ctrl+space` and hit `Enter`
3. Select "Behavioral"
2. What are you testing, put in `my dialog card`
3. For camel case name, hit `Enter`
3. Select the `Behavioral` directory
4. For the abstract test class, select `AbstractSpruceFixtureTest`

</details>

<details>
<summary><strong>Test 1b</strong>: Asserting MyDialogCard renders a button</summary>

```typescript
import { buttonAssert } from '@sprucelabs/heartwood-view-controllers'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite, assert } from '@sprucelabs/test-utils'

@fake.login()
@suite()
export default class MyDialogCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected async canCreateMyDialogCard() {
        // Step 3. Create a new instance of your MyDialogCard
        const vc = this.views.Controller('views-kata.my-dialog-card', {})

        // Step 4. Assert the card renders a button
        buttonAssert.cardRendersButton(vc, 'done')
    }

    // Step 2. Delete this test
    @test()
    protected async yourNextTest() {
        assert.isTrue(false)
    }
}

// Step 1. Delete this class declaration
class MyDialogCard {}
```

</details>

<details>
<summary><strong>Production 1</strong>: Rendering a button in the footer of MyDialogCard</summary>

```typescript
 private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'My Dialog Card',
        },
        // Step 1. Add a footer with a single button with the id of 'done'
        footer: {
            buttons: [
                {
                    id: 'done',
                    label: 'Done',
                    type: 'primary',
                },
            ],
        },
    })
}
```
> **Note**: Your test should be passing now 🎉. It's worth calling out that `buttonAssert` does not care in which part of your Card a Button is rendered, so you could render it in the Footer or the Body. We'll use Footer for Dialog close buttons by convention.

</details>

<details>

<summary><strong>Test 2a</strong>: Asserting clicking the 'done' Button closes the Dialog</summary>

Lets jump back into your 'RootSkillViewTest' and add a new test to assert that clicking the 'done' button closes the Dialog.

```typescript
@test()
protected async clickingButtonRendersDialog() {
    const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )

    vcAssert.assertRendersAsInstanceOf(dialogVc, MyDialogCardViewController)
}

// Step 1. Declare new test
@test()
protected async clickingDoneInDialogHidesDialog() {
    // Step 2. Use the 'vcAssert' util to assert the dialog renders
    const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )

    // Step 3. use 'vcAssert.assertRendersAsInstanceOf' to get back an instance of MyDialogCard
    const myDialogVc = vcAssert.assertRendersAsInstanceOf(
        dialogVc,
        MyDialogCardViewController
    )

    // Step 4. Use the 'interactor' util to click the button in your dialog
    await interactor.clickButton(myDialogVc, 'done')
}
```

> **Note**: This will tell you clicking the 'done' Button failed because it has no 'onClick' set. Let's fix that!

</details>

<details>
<summary><strong>Production 2</strong>: Setting the onClick for the 'done' Button</summary>

Jump into `MyDialogCard.vc.ts` and set the `onClick` for the 'done' Button.

```typescript
private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'My Dialog Card',
        },
        footer: {
            buttons: [
                {
                    id: 'done',
                    label: 'Done',
                    type: 'primary',
                    // Step 1. Set the onClick for the 'done' button and pass it a reference to a method (that does not exist yet)
                    // and bind it to the instance of the class
                    onClick: this.handleClickDone.bind(this),
                },
            ],
        },
    })
}

// Step 2. Declare the handleClickDone method
private async handleClickDone() {}
```

</details>

<details>
<summary><strong>Test 3</strong>: Cleanup your test</summary>

Because the test is now passing, lets spend a second cleaning up the redundant code in the test. Jump back to 'RootSkillViewTest' and update the test like this:

```typescript
@test()
protected async clickingButtonRendersDialog() {
    // Step 3. Replace the code in this test with the new method you just extracted
    await this.clickButtonAndAssertRendersMyDialogVc()
}

@test()
protected async clickingDoneInDialogHidesDialog() {
    // Step 1. Select the all the code except the interactor and extract it to a method using 'Ctrl + Shift + r'
    // Step 2. Call the method you just extracted 'clickButtonAndAssertRendersMyDialogVc'
    const myDialogVc = await this.clickButtonAndAssertRendersMyDialogVc()
    await interactor.clickButton(myDialogVc, 'done')
}

private async clickButtonAndAssertRendersMyDialogVc() {
    const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )

    const myDialogVc = vcAssert.assertRendersAsInstanceOf(
        dialogVc,
        MyDialogCardViewController
    )
    return myDialogVc
}
```
</details>

<details>
<summary><strong>Test 4</strong>: Asserting the Dialog is hidden after clicking 'done'.</summary>

```typescript
@test()
protected async clickingDoneInDialogHidesDialog() {
    // Step 2. Destructure the myDialogVc and dialogVc from the method you just extracted
    const { myDialogVc, dialogVc } =
        await this.clickButtonAndAssertRendersMyDialogVc()
    await interactor.clickButton(myDialogVc, 'done')

    // Step 3. Assert the dialog is not visible
    assert.isFalse(dialogVc.getIsVisible(), 'The dialog is still visible!')
}

private async clickButtonAndAssertRendersMyDialogVc() {
    const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
        interactor.clickButton(this.vc.getCardVc(), 'my-button')
    )

    const myDialogVc = vcAssert.assertRendersAsInstanceOf(
        dialogVc,
        MyDialogCardViewController
    )

    // Step 1. Change the return statement to contain both the original dialogVc and myDialogVc
    return { myDialogVc, dialogVc }
}
```
</details>

<details>
<summary><strong>Production 3</strong>: Implementing 'handleClick()' in your 'RootSkillView'</summary>

We're going to write the code in your `RootSkillView` the way we wished it worked. Once we understand what we want, we'll implement it in `MyDialogCard`.


```typescript
private async handleClick() {
    const myDialogVc = this.Controller('views-kata.my-dialog-card', {
        // Step 2. Set the 'onClickDone' property to an async function
        onClickDone: async () => {
            // Step 3. Hide the 'dialogVc'
            await dialogVc.hide()
        },
    })

    // Step 1. Extract 'this.Controller(...)' to a variable called 'myDialogVc'
    // Step 4. Set the results of the 'myDialogVc.render()' to 'dialogVc'
    const dialogVc = this.renderInDialog(myDialogVc.render())
}

```
</details>

<details>
<summary><strong>Production 4</strong>: Implementing 'onClickDone()' in your 'MyDialogCard'</summary>

Now that we better understand how we want 'MyDialogCard' to work, let's implement it. Jump to `MyDialogCard.vc.ts` and lets make some updates.

```typescript
export default class MyDialogCardViewController extends AbstractViewController<Card> {
    public static id = 'my-dialog-card'
    private cardVc: CardViewController

    // Step 6. Click 'this.handleClickDone' in the constructor and hit 'Command + .'  and declare the property
    // set it to 'private'
    private handleClickDone: () => Promise<void>

    // Step 1. Because we know we need to pass the 'onClickDone' property to the constructor
    // Create a new interface 'MyDialogOptions' and add it to the constructor
    public constructor(options: ViewControllerOptions & MyDialogOptions) {
        super(options)

        // Step 3. Destructure the 'onClickDone' property from the options
        const { onClickDone } = options

        // Step 4. Set the 'onClickDone' property to a property
        this.handleClickDone = onClickDone
        this.cardVc = this.CardVc()
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {
            header: {
                title: 'My Dialog Card',
            },
            footer: {
                buttons: [
                    {
                        id: 'done',
                        label: 'Done',
                        type: 'primary',
                        // Step 6. Since we're using the callback, we no longer need to '.bind(this)' this 
                        onClick: this.handleClickDone,
                    },
                ],
            },
        })
    }

    //Step 5. Delete the 'handleClickDone' method (we're going to use the callback passed to the constructor)

    public render() {
        return this.cardVc.render()
    }
}

// Step 2. Create the MyDialogOptions interface with the onClickDone property
interface MyDialogOptions {
    onClickDone: () => Promise<void>
}

```
> **Note**: Your test should be passing now 🎉. Go ahead and refresh your Development Theatre to see the changes in action! Don't forget to run `watch.views` again.

</details>

<details>
<summary><strong>Cleanup</strong>: Fix type errors</summary>

You will have 3 type errors in your code now. Go ahead and hit 'Command+p' (for problem) then 'n' (for next) and fix each issue you find along the way.

</details>

### Test it out

Go ahead and test it in the `Development Theatre`. You should be able to click the "My Button" button and see a dialog with a "Done" button. When you click the "Done" button, the dialog should close.

Easy Peasy! 🎉

Now throw it all away and pick another kata!

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>