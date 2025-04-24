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
    this.views.Controller('{{ kata_name }}-kata.root', {})
}
```

> *Note*: The `{{ kata_name }}-kata` is the `namespace` of your skill and the `root` is the name of your view. The `namespace` will match whatever you named your skill, but you can check in your `package.json` to see what it is. Check under `skill.namespace`.

</details>

### Previewing your work

Since this is a `view` kata, it will be much for fun if you can see the results of your work in the `Development Theatre`. Make sure the `Development Theatre` is open.

<details>
<summary><strong>Registering your skill</strong></summary>

1. Hit `ctrl+space` and type `register` and hit `Enter`.

You will be asked for a name and a namespace, if this is your first time doing this, name it `{{ kata_name | pascalCase }} Kata` and make sure the namespace is `{{ kata_name }}-kata`.
</details>

<details>
<summary><strong>Watching for View changes</strong></summary>

1. Hit `ctrl+space` and type `watch.watch` and hit `Enter`.
2. Once the watcher is running, change back to the Test Reporter.

</details>

<details>
<summary><strong>Preview in the Development Theatre</strong></summary>

1. In the `Development Theatre`, hit `Command + Shift + n`
2. In the "Jump to" Dialog, type `{{ kata_name }}-kata.root` and select the option in the dropdown.
3. Hit "Go"

> *Note*: For now, you're going to see a blank screen. That is fine, just wait until you render your first card!

</details>

### Rendering a `Card` in your `RootSkillView`

<details>
<summary><strong>Test 1</strong>: Rendering a Card in your RootSkillView</summary>

```typescript
@test()
protected canCreateRootSkillView() {
    this.views.Controller('{{ kata_name }}-kata.root', {})
}

// Step 1. Create a new test and use the `vcAssert` utility to assert the SkillView renders a card
@test()
protected rendersACard() {
    const vc = this.views.Controller('{{ kata_name }}-kata.root', {})
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
    this.vc = this.views.Controller('{{ kata_name }}-kata.root', {})
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
export default class {{ what_are_you_testing | pascalCase }}Test extends AbstractSpruceFixtureTest {
    // Step 4. Change the type on the 'vc' property to be your Spy
    private vc!: SpyRootSkillView

    protected async beforeEach() {
        // Step 2. Override the Class for your View Controller to be your Spy
        this.views.setController('{{ kata_name }}-kata.root', SpyRootSkillView)

        // Step 3. Typecast the vc to be your Spy
        this.vc = this.views.Controller(
            '{{ kata_name }}-kata.root',
            {}
        ) as SpyRootSkillView
    }

    @test()
    protected rendersACard() {
        vcAssert.assertSkillViewRendersCard(this.vc)
    }

    @test()
    protected cardRendersButton() {
        buttonAssert.cardRendersButton(this.vc.getCardVc(), 'my-button')
    }
}

// Step 1. Create your Test Double (a Spy) that extends your RootSkillViewController
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