# Views

In this kata, we're going to focus solely on creating `views`! It'll be short and sweet and give you the opportunity to play around with `view` related concepts.


# Kata Setup
<details>
<summary><strong>Read setup:</strong></summary>

## Pre-requisites
1. Make sure your `Development Theatre` is running.

## Step 1: Create your `skill`

### Create a new directory for your kata

```bash
cd ~/path/to/your/spruce/projects
mkdir katas
```

### Create a new skill

```bash
cd katas
spruce create.skill views-kata
```

### Name your `skill`

> *Note*: Your `skill` name should be unique, so if you did this kata before, you may want to name it something different.

* Name: `Views Kata`
* Description: `A kata to practice creating views!`

### Open your `skill` in VS Code

> *Note*: You can follow the instructions printed in the `cli` or use the command below.

```bash
cd views-kata && code .
```

Then, open the terminal in VS Code and run:

```bash
spruce setup.vscode
```
Hit `Enter` to accept all setup options.

Then complete the following:

1. Open the Command Palette by using `cmd+shift+p` and search type: "Manage"
2. Select "Tasks: Manage Automatic Tasks"
3. Then select "Allow Automatic Tasks"
4. Open the Command Palette again type "reload" and select "Reload Window"

The Test Runner should open and begin installing additional requirements.

When it's done, you should see a message that says `Ready and waiting...`


## Step 2: Create your first test

### Create the test file

1. Hit `ctrl+space` (if you have the shortcuts setup) and hit enter. 
    - If you don't have the shortcuts setup, you can type `spruce create.test` in your terminal and hit `Enter`.
2. Select "Behavioral"
3. For "What are you testing?", type "Root skill view"
4. For "Camel case name", hit Enter (it should say "rootSkillView")
5. For "Which abstract test class do you want to extend?" select "AbstractSpruceFixtureTest"
6. Close the terminal window and get back to the Test Runner.
    - There should be one failing test.
    - The test will explain that before you can do any tests, you need to run `spruce set.remote`
7. Hit `ctrl+space` and type `set.remote` and hit `Enter`.
    - You will be prompted for more dependencies to install. Hit `Enter` to accept them all.
8. For your remote, select "Local"
    - Allow the rest of the dependencies to install
    - If prompted for remote again, select "Local" again
9. Close the terminal window and get back to the Test Runner.
    - The test should now be failing beacuse `false` does not equal `true`.
10. Click on the failing test in the Test Runner and click "Open" to open the test file.

### Prep the test file

1. Clear out the contents of the first test
1. Delete the second test
2. Delete `class RootSkillView {}` at the bottom of the test file

Your test should now be passing.

</details>

# Views Kata

### Rendering your `RootSkillView`

<details>
<summary><strong>Test 1</strong>: Rendering your RootSkillView</summary>

In your first test, add the following:

```typescript
@test()
protected async canCreateRootSkillView() {
    this.views.Controller('.root', {})
}
```
> *Note*: It's ok to have some type errors here, they'll go away as you add more code.

</details>

<details>
<summary><strong>Production 1</strong>: Creating your RootSkillView</summary>

In order for this test to pass, you need to create your first `view`, a `RootSkillView`.

1. Hit `ctrl+space` and type `create.view` and hit `Enter`.
2. Select "Skill View Controller"
    - Let the dependencies install
3. When prompted for if you would like to create your root skill view controller, hit `Enter` to accept the default.
4. Now update your failing test to reference the `RootSkillView` you just created.

```typescript
@test()
protected async canCreateRootSkillView() {
    this.views.Controller('views-kata.root', {})
}
```

> *Note*: The `views-kata` is the `namespace` of your skill and the `root` is the name of your view. The `namespace` will match whatever you named your skill, but you can check in your `package.json` to see what it is. Check under `skill.namespace`.

</details>

### Previewing your work

Since this is a `view` kata, it will be much for fun if you can see the results of your work in the `Development Theatre`. Make sure the `Development Theatre` is open.

<details>
<summary><strong>Registering your skill</strong></summary>

1. Hit `ctrl+space` and type `register` and hit `Enter`.

You will be asked for a name and a namespace, if this is your first time doing this, name it `Views Kata` and make sure the namespace is `views-kata`.
</details>

<details>
<summary><strong>Watching for View changes</strong></summary>

1. Hit `ctrl+space` and type `watch.watch` and hit `Enter`.
2. Once the watcher is running, change back to the Test Reporter.

</details>

<details>
<summary><strong>Preview in the Development Theatre</strong></summary>

1. In the `Development Theatre`, hit `Command + Shift + n`
2. In the "Jump to" Dialog, type `views-kata.root` and select the option in the dropdown.
3. Hit "Go"

> *Note*: For now, you're going to see a blank screen. That is fine, just wait until you render your first card!

</details>

### Rendering a `Card` in your `RootSkillView`

<details>
<summary><strong>Test 1</strong>: Rendering a Card in your RootSkillView</summary>

```typescript
@test()
protected canCreateRootSkillView() {
    this.views.Controller('views-kata.root', {})
}

@test()
protected rendersACard() {
    const vc = this.views.Controller('views-kata.root', {})
    vcAssert.assertSkillViewRendersCard(vc)
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Rendering a Card in your RootSkillView</summary>
 
 ```typescript
// Step 2. Declare the cardVc property (declare property after constructing the card using 'Command + .')
private cardVc: CardViewController

public constructor(options: ViewControllerOptions) {
    super(options)

    // Step 1. Construct a CardViewController
    this.cardVc = this.Controller('card', {
        header: {
            title: 'A title!',
        },
    })
}

public render(): SkillView {
    return {
        layouts: [
            {
                // Step 3. Render the card
                cards: [this.cardVc.render()],
            },
        ],
    }
}
```
 
</details>

<details>
<summary><strong>Test 2</strong>: Refactor your test</summary>

```typescript
// Step 3. Declare the 'vc' property that will be used in all tests. 
// Use "!" to suppress the error about it not being initialized in the constructor
private vc!: RootSkillViewController

// Step 1. Declare beforeEach()
protected async beforeEach() {
    await super.beforeEach()
    // Step 2. Move the vc declaration here
    this.vc = this.views.Controller('views-kata.root', {})
}

// Step 4. delete the 'canCreateRootSkillView' test 

@test()
protected rendersACard() {
    // Step 5. User 'this.vc' instead of constructing a new vc
    vcAssert.assertSkillViewRendersCard(this.vc)
}
```
</details>

<details>
<summary><strong>Production 2</strong>: Refactor your production code</summary>

```ts
public constructor(options: ViewControllerOptions) {
    super(options)

    // Step 1. Select the construction or your skill view and hit 'Ctrl + Shift + r'
    // and select 'Extract to method in class...'. Name it `CardVc`
    this.cardVc = this.CardVc()
}

private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'A title!',
        },
    })
}

```
</details>

> **Note**: Now is a good time to view your progress! In your `Development Theatre`, hit `Command + r` to refresh the page. You should see a card with a title of "A title!"

### Rendering a button

<details>
<summary><strong>Test 1</strong>: Asserting your card renders a button</summary>

```typescript
@test()
protected cardRendersButton() {
    buttonAssert.cardRendersButton(this.vc.getCardVc(), 'my-button')
}

```
>**Note**: You will get an error that 'getCardVc()' does not exist on your View Controller. This is a-ok because we're about to make a Test Double!

</details>

<details>
<summary><strong>Test 2</strong>: Creating your Test Double</summary>

```typescript
@fake.login()
@suite()
export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    // Step 5. Change the type on the 'vc' property to be your Spy
    private vc!: SpyRootSkillView

    protected async beforeEach() {
        // Step 4. Override the Class for your View Controller to be your Spy
        this.views.setController('views-kata.root', SpyRootSkillView)

        // Step 6. Typecast the vc to be your Spy
        this.vc = this.views.Controller(
            'views-kata.root',
            {}
        ) as SpyRootSkillView
    }

    @test()
    protected rendersACard() {
        vcAssert.assertSkillViewRendersCard(this.vc)
    }

    // Step 1. Declare your new test
    @test()
    protected cardRendersButton() {
        // Step 2. Use the buttonAssert utility to assert the button is rendering
        buttonAssert.cardRendersButton(this.vc.getCardVc(), 'my-button')
    }
}

// Step 3. Create your Test Double (a Spy) that extends your RootSkillViewController
class SpyRootSkillView extends RootSkillViewController {
    public getCardVc() {
        return this.cardVc
    }
}
```

>**Note**: You will get an error that 'this.cardVc` in your spy is not accessible because it is private, lets fix that next!

>**Note**: Also, your test is not passing, that's fine too. That is next.


</details>

<details>
<summary><strong>Production 1</strong>: Making your 'cardVc' property protected</summary>

```typescript
// Step 1. Change the cardVc property to be protected in your Root.svc
protected cardVc: CardViewController
```
</details>

<details>
<summary><strong>Production 2</strong>: Render a Button in your Card</summary>

```typescript

private CardVc(): CardViewController {
    return this.Controller('card', {
        header: {
            title: 'A title!',
        },
        // Step 1. Add a footer with a single button with the id of 'my-button'
        footer: {
            buttons: [
                {
                    id: 'my-button',
                    // Step 2 (optional): Play around with different properties of the button
                    label: 'My button',
                    type: 'primary',
                },
            ],
        },
    })
}
```

>**Note**: Everything should be passing now! Refresh the front end! Also, play around with different properties on the button and refresh to see their effect!

</details>

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

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>