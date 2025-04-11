# Views

In this kata, we're going to focus solely on creating `views`! It'll be short and sweet and give you the opportunity to play around with `view` related concepts.

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

### Rendering a useful Dialog

Coming soon!


### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>