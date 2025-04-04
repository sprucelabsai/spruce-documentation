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


## Step 2: Create your first test file

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

## Step 3: Creating your test

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
<summary><strong>Test 2</strong>: Refactor the test</summary>

```typescript
private vc!: RootSkillViewController

protected async beforeEach() {
    this.vc = this.views.Controller('views-kata.root', {})
}

@test()
protected rendersACard() {
    vcAssert.assertSkillViewRendersCard(this.vc)
}
```
</details>

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>