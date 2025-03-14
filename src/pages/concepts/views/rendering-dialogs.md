## Rendering Dialogs

Dialogs are cards rendered modally. You can render a basic `Card` `ViewModel` or you can render a `CardViewController` as a dialog.

### Dialog Lifecycle

Dialog's lifecycle is very basic. It only has a `didHide()` method that is called when the dialog is hidden. This is a great place to remove event listeners or do any cleanup.

Anything else you want done (like loading) has be done manually when you're rendering the dialog.

### Rendering a simple `ViewModel` based `Dialog` on load

This is the simplest way to render a dialog. You can render the `Card`'s `ViewModel` by calling `this.renderInDialog(...)` from your `SkillViewController` or `ViewController`.

<details>
<summary><strong>Test 1</strong>: Assert dialog is rendered on load</summary>

For this example, we'll keep the dialog simple and render a `Card` `ViewModel` in the `RootSkillViewController`'s `load()` `Lifecycle` method.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
    }
}
```

</details>

<details>
<summary><strong>Production 1</strong>: Render a dialog on load</summary>

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillView extends AbstractSkillViewController {
    public async load() {
        this.renderInDialog({
            header: {
                title: 'Hello, World!',
            },
        })
    }
}
```

</details>



### Rendering a `CardViewController` based `Dialog` on load

Now lets make this dialog more powerful by rendering a `CardViewController` of our own!

<details>
<summary><strong>Test 1</strong>: Assert dialog is rendered on load</summary>

This first test is very simple, just making sure a dialog is rendered.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert, vcPluginAssert } from '@sprucelabs/heartwood-view-controllers'

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
    }
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Render a simple dialog on load</summary>

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'

    public async load() {
        this.renderInDialog({})
    }

    public render() {
        return {}
    }
}
```
</details>

<details>
<summary><strong>Test 2</strong>: Assert dialog is a specific type</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert, vcPluginAssert } from '@sprucelabs/heartwood-view-controllers'

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {

    @test()
    protected async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
    }

}
```
You're going to get a failure here because `MyCardViewController` doesn't exist yet. Let's create it!

</details>

<details>
<summary><strong>Production 2a</strong>: Create <em>MyCardViewController</em> to fail next assertion</summary>

When you are creating your `View`, make sure to base it on a `Card`.

```bash
spruce create.view
```

Call it `My Card` (or whatever you want). 

> **Note**: Don't add `ViewController` to the end of the name of `ViewControllers`. That'll be added for you.

> **Note**: It is helpful to add the name of the `ViewModel` being rendered. Examples: If you render a `Card`, end your name in `Card`. If you render a `Form`, end your name in `Form`.

> **Note**: Don't add `Dialog` to name of your `ViewController`. Because a `CardViewController` can be rendered in a dialog or in a `SkillView`, it is better to keep the name free from where it is rendered.

</details>

<details>
<summary><strong>Production 2b</strong>: Make <em>MyCardViewController</em> render a <em>Card</em></summary>

It is much better to use composition over inheritance. This is how you can make `MyCardViewController` render a `CardViewController`.

```ts
import { 
    CardViewController, 
    AbstractViewController, 
    Card 
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    public render(): CardViewController {
        return this.cardVc.render()
    }
}

```
</details>

<details>
<summary><strong>Production 2c</strong>: Render <em>MyCardViewController</em> in the dialog</summary>

Back inside your `RootSkillViewController`, you can render `MyCardViewController` directly to .

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'

    public async load() {
        const myCardVc = this.Controller('eightbitstories.my-card', {})
        this.renderInDialog(myCardVc.render())
    }

     public render() {
        return {}
    }
}
```
</details>

### Running code when a `Dialog` is closed

Sometimes you'll need to tear down some resources when a dialog is closed. You can do this by overriding the `didHide()` method in your `ViewController`. For this example, we'll start start with the "Render a `CardViewController` based `Dialog` on load" example from above and we'll use the scenario of wanting to remove event listeners when the dialog is closed. 

<details>
<summary><strong>Test 1a</strong>: Call load on <em>Dialog's</em> <em>CardViewController</em></summary>

We have to start by checking if the `load` method is called on the `MyViewController` when the dialog is rendered.

> **Note**: We are starting with the "Test 2" from above and adding the `callsLoadOnMyCardAfterShowingAsDialog` test.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import MyCardViewController from '../../viewControllers/MyCardViewController'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {

    @test()
    protected async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
    }

    @test()
    protected async callsLoadOnMyCardAfterShowingAsDialog() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        const myCardVc = vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
    
        myCardVc.assertLoaded()
    }

}
```

</details>

<details>
<summary><strong>Test 1b</strong>: Test double <em>MyCardViewController</em></summary>

Your test should throw an error because `MyCardViewController` doesn't have an `assertLoaded()` method. We'll actually never add that, so we're going to create a `MockMyCardViewController` that extends `MyCardViewController` and add the `assertLoaded()` method.

> **Note**: I chose to create a `Mock` vs. a `Spy` (or any other [test double](https://medium.com/@himanshuganglani/clean-code-unit-tests-eb48eb51fa46#:~:text=Test%20doubles%20are%20objects%20or,but%20is%20never%20actually%20used.)) arbitrarily. You can use any test double you want, it only changes how you do the assertion.

```ts
import MyCardViewController from '../../viewControllers/MyCardViewController'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {

    private vc!: MockMyCardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.setController('eightbitstories.my-card', MockMyCardViewController)
    }

    @test()
    protected async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
    }

    @test()
    protected async callsLoadOnMyCardAfterShowingAsDialog() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        const myCardVc = vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController) as MockMyCardViewController
    
        myCardVc.assertLoaded()
    }

}

class MockMyCardViewController extends MyCardViewController {
    private wasLoadCalled = false

    public async load() {
        await super.load()
        this.wasLoadCalled = true
    }

    public assertLoaded() {
        assert.isTrue(this.wasLoadCalled, `Expected load() to be called on MyCardViewController`)
    }
}

```

> **Note**: The test will fail because `MyCardViewController` doesn't have a `load()` method. Add that now to get to the last assertion.

</details>

<details>
<summary><strong>Production 1</strong>: Call <em>load()</em> on <em>MyCardViewController</em></summary>

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'

    public async load() {
        const myCardVc = this.Controller('eightbitstories.my-card', {})
        this.renderInDialog(myCardVc.render())

        await myCardVc.load()
    }

     public render() {
        return {}
    }
}
```

</details>

<details>
<summary><strong>Test 2a</strong>: Dry the test</summary>

I moved a lot to the `beforeEach()` method and used the static state of the test class to hold the `MyCardViewController` instance. This makes it much easier to access in tests.

```ts
import MyCardViewController from '../../viewControllers/MyCardViewController'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {

    private vc: MockMyCardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.setController('eightbitstories.my-card', MockMyCardViewController)
        this.vc = this.views.Controller('eightbitstories.root', {}) as MockMyCardViewController
    }

    @test()
    protected async rendersAlertOnLoad() {
        await this.loadAndAssertRendersMyCard()
    }

    @test()
    protected async callsLoadOnMyCardAfterShowingAsDialog() {
        const myCardVc = await this.loadAndAssertRendersMyCard()
        myCardVc.assertLoaded()
    }

    private static async load() {
        await this.views.load(this.vc)
    }

    private static async loadAndAssertRendersMyCard() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () => this.load())
        return vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController) as MockMyCardViewController
    }

}

class MockMyCardViewController extends MyCardViewController {
    private wasLoadCalled = false

    public async load() {
        await super.load()
        this.wasLoadCalled = true
    }

    public assertLoaded() {
        assert.isTrue(this.wasLoadCalled, `Expected load() to be called on MyCardViewController`)
    }
}

```

</details>

<details>
<summary><strong>Test 2b</strong>: Start a new test for <em>MyCardViewController</em></summary>

Now that we've tested that `MyCardViewController` is loaded in a dialog from `RootSkillViewController`, we can test `MyCardViewController` directly to minimize coupling in our tests.

```bash
spruce create.test
```

Call the test `My Card View` (or whatever you want) and drop it into `behaviors`.

</details>

<details>
<summary><strong>Test 2c</strong>: Make sure listeners are set on <em>load()</em></summary>

For brevity, I'm going to test that a listener is set and calls a private method on `MyCardViewController` when the event is emitted. This is only to give you an idea of how to test that listeners are set and removed. It may make sense to test double something to make sure it's invoked when the event is emitted.


```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardViewTest extends AbstractSpruceFixtureTest {

    @test()
    protected async setsListenersOnLoad() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        await vc.load()

        let wasHit = false
        vc.handleDidGenerateStory = async () => {
            wasHit = true
        }

        await this.fakeClient.emitAndFlattenResponse('eightbitstories.did-generate-story::v2024_01_01', {})

        assert.isTrue(wasHit, `Expected handleDidGenerateStory to be called in my Card`)
    }

}
```

</details>

<details>
<summary><strong>Production 2</strong>: Add a listener in <em>MyCardViewController</em></summary>

```ts
import { 
    CardViewController, 
    AbstractViewController, 
    Card 
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {

    public static id = 'my-card'
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc() {
        return this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    public async load() {
        const client = await this.connectToApi()
        await client.on('eightbitstories.did-generate-story::v2024_01_01', async () => this.handleDidGenerateStory())
    }

    private async handleDidGenerateStory() {
        // Do something when the event is emitted
    }

    public render(): CardViewController {
        return this.cardVc.render()
    }
}

```

> **Note**: I also extracted the construction of the `CardViewController` to a private method to simplify the `constructor`.

</details>

<details>
<summary><strong>Test 3</strong>: Make sure listeners are removed on when the <em>Dialog</em> was hidden</summary>

We are going to essentially copy the last test but add `interactor.hide(vc)` before emitting the event. Once the tests passes, we'll refactor.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { interactor } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardViewTest extends AbstractSpruceFixtureTest {

    @test()
    protected async setsListenersOnLoad() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        await vc.load()

        let wasHit = false
        vc.handleDidGenerateStory = async () => {
            wasHit = true
        }

        await this.fakeClient.emitAndFlattenResponse('eightbitstories.did-generate-story::v2024_01_01', {})

        assert.isTrue(wasHit, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected async removesListenersOnHide() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        await vc.load()

        let wasHit = false
        vc.handleDidGenerateStory = async () => {
            wasHit = true
        }

        await interactor.hide(vc)

        await this.fakeClient.emitAndFlattenResponse('eightbitstories.did-generate-story::v2024_01_01', {})

        assert.isFalse(wasHit, `Expected handleDidGenerateStory to not be called in MyCard`)

    }

}
```
</details>

<details>
<summary><strong>Production 3</strong>: Remove listeners on <em>hide()</em></summary>

```ts
import { 
    CardViewController, 
    AbstractViewController, 
    Card 
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {

    public static id = 'my-card'
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc() {
        return this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    public async load() {
        const client = await this.connectToApi()
        await client.on('eightbitstories.did-generate-story::v2024_01_01', async () => this.handleDidGenerateStory())
    }

    private async handleDidGenerateStory() {
        // Do something when the event is emitted
    }

    public async didHide() {
        const client = await this.connectToApi()
        await client.off('eightbitstories.did-generate-story::v2024_01_01')
    }

    public render(): CardViewController {
        return this.cardVc.render()
    }
}

```

> **Note**: The `client.off(...)` method accepts 2 arguments. The first is the event name and the second is the callback. If you don't pass the callback, all listeners for that event are removed. This may prove to be a problem if you have multiple listeners for the same event.

</details>

<details>
<summary><strong>Test 4a</strong>: Dry the test</summary>

Once again, we are going to move repetitive code to the `beforeEach()` method and use the static state of the test class to hold helpful details. We'll also move the monkey patching to `beforeEach()` to make refactoring it easier.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { interactor } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardViewTest extends AbstractSpruceFixtureTest {
    private vc!: MyCardViewController
    private wasDidGenerateStoryCalled = false

    private async  beforeEach() {
        await super.beforeEach()
        
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as MyCardViewController
       
        this.vc.handleDidGenerateStory = async () => {
            this.wasDidGenerateStoryCalled = true
        }

        await this.vc.load()
    }

    @test()
    protected async setsListenersOnLoad() {
        await this.emitDidGenerateStory()
        assert.isTrue(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected async removesListenersOnHide() {
        await interactor.hide(this.vc)
        await this.emitDidGenerateStory()
        assert.isFalse(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to not be called in MyCard`)
    }

    private static async emitDidGenerateStory() {
        await this.fakeClient.emitAndFlattenResponse('eightbitstories.did-generate-story::v2024_01_01', {})
    }
}
```

</details>

<details>
<summary><strong>Test 4b</strong>: Ensure proper listeners turned off (Optional)</summary>

You only need to follow this if you need to make sure you are removing the correct listener. This is a little more complicated when using monkey patching because of the way that javascript handles scope and [`this`](https://www.youtube.com/watch?v=gvicrj31JOM). So, this will require a little bit of refactoring to keep past tests passing.

We're going to start by creating the failing test, then refactor from there.

> **Note**: I also refactored the test to cut down on repetition. See `this.hideAndEmitDidGenerateStory()` for more information.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { interactor } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardViewTest extends AbstractSpruceFixtureTest {
    private vc!: MyCardViewController
    private wasDidGenerateStoryCalled = false

    private async  beforeEach() {
        await super.beforeEach()
        
        this.vc = this.views.Controller('eightbitstories.my-card', {})
       
        this.vc.handleDidGenerateStory = async () => {
            this.wasDidGenerateStoryCalled = true
        }

        await this.vc.load()
    }

    @test()
    protected async setsListenersOnLoad() {
        await this.emitDidGenerateStory()
        assert.isTrue(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected async removesListenersOnHide() {
        await this.hideAndEmitDidGenerateStory()
        assert.isFalse(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to not be called in MyCard`)
    }

    @test()
    protected async removesTheCorrectListener() {
        let wasHit = false

        await this.fakeClient.on('eightbitstories.did-generate-story::v2024_01_01', () => {
            wasHit = true
        })

        await this.hideAndEmitDidGenerateStory()

        assert.isTrue(wasHit, `Oops, I removed too many listeners`)
    }

    private static async emitDidGenerateStory() {
        await this.hide()
        await this.emitDidGenerateStory()
    }

    private static async emitDidGenerateStory() {
        await this.fakeClient.emitAndFlattenResponse('eightbitstories.did-generate-story::v2024_01_01', {})
    }

    private static async hide() {
        await interactor.hide(this.vc)
    }
}
```

</details>

<details>
<summary><strong>Production 4</strong>: Remove proper listener</summary>

We're going to have to work around the way javascript handles scope (and [`this`](https://www.youtube.com/watch?v=gvicrj31JOM)) to make this work. So, we'll first make it pass, then refactor in a way that is cleaner. 

```ts
import { 
    CardViewController, 
    AbstractViewController, 
    Card 
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {

    public static id = 'my-card'
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc() {
        return this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    public async load() {
        const client = await this.connectToApi()
        await client.on('eightbitstories.did-generate-story::v2024_01_01', this.handleListener)
    }

    private handleListener = async () => {
        return this.handleDidGenerateStory()
    }

    private async handleDidGenerateStory() {
        // Do something when the event is emitted
    }

    public async didHide() {
        const client = await this.connectToApi()
        await client.off('eightbitstories.did-generate-story::v2024_01_01', this.handleListener)
    }

    public render(): CardViewController {
        return this.cardVc.render()
    }
}

```

> **Note:** Notice how I used an arrow function to maintain `this` and had it call `this.handleDidGenerateStory()`. This will allow us to remove the listener properly while not breaking the tests.

</details>

<details>
<summary><strong>Test 5</strong>: Move to test double</summary>

Just for demonstration's sake, I'm going to move to a `Spy` to make sure that `handleDidGenerateStory()` is called when the event is emitted. This will actually simplify the test and case could be made we should have started there, but the power of these testing practices is we get to make the decision on how to best design a solution after it's actually built. Bonus, this does away with the monkey patching we did before.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { interactor } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardViewTest extends AbstractSpruceFixtureTest {
    private vc!: SpyMyCardViewController
    

    private async  beforeEach() {
        await super.beforeEach()
        
        this.views.setController('eightbitstories.my-card', SpyMyCardViewController)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCardViewController

        await this.vc.load()
    }

    @test()
    protected async setsListenersOnLoad() {
        await this.emitDidGenerateStory()
        assert.isTrue(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected async removesListenersOnHide() {
        await this.hideAndEmitDidGenerateStory()
        assert.isFalse(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to not be called in MyCard`)
    }

    @test()
    protected async removesTheCorrectListener() {
        let wasHit = false

        await this.fakeClient.on('eightbitstories.did-generate-story::v2024_01_01', () => {
            wasHit = true
        })

        await this.hideAndEmitDidGenerateStory()

        assert.isTrue(wasHit, `Oops, I removed too many listeners`)
    }

    private static get wasDidGenerateStoryCalled() {
        return this.vc.wasHandleDidGenerateStoryCalled
    }

    private static async emitDidGenerateStory() {
        await this.hide()
        await this.emitDidGenerateStory()
    }

    private static async emitDidGenerateStory() {
        await this.fakeClient.emitAndFlattenResponse('eightbitstories.did-generate-story::v2024_01_01', {})
    }

    private static async hide() {
        await interactor.hide(this.vc)
    }
}

class SpyMyCardViewController extends MyCardViewController {
    public wasHandleDidGenerateStoryCalled = false

    public async handleDidGenerateStory() {
        await super.handleDidGenerateStory()
        this.wasHandleDidGenerateStoryCalled = true
    }
}

```

Here is an overview of what I did:

1. I created a `Spy` that extends `MyCardViewController` and added a public property called `wasHandleDidGenerateStoryCalled`.
2. Did away with the local property `wasDidGenerateStoryCalled` on the test class and replaced it with a [getter](https://www.w3schools.com/js/js_object_accessors.asp) that returns the `Spy`'s property.
3. Removed the monkey patching all together.

</details>

<details>
<summary><strong>Production 5</strong>: Simplify implementation</summary>

Because we've moved to a `Spy`, we can simplify the implementation of `MyCardViewController` by removing the additional method `this.handleListener()`. But, we'll need to also change `this.handleDidGenerateStory()` to an arrow function to maintain `this`.

```ts
import { 
    CardViewController, 
    AbstractViewController, 
    Card 
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {

    public static id = 'my-card'
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc() {
        return this.Controller('card', {
            header: {
                title: 'Hello, World!',
            },
        })
    }

    public async load() {
        const client = await this.connectToApi()
        await client.on('eightbitstories.did-generate-story::v2024_01_01', this.handleDidGenerateStory)
    }


    private async handleDidGenerateStory = async () => {
        // Do something when the event is emitted
    }

    public async didHide() {
        const client = await this.connectToApi()
        await client.off('eightbitstories.did-generate-story::v2024_01_01', this.handleDidGenerateStory)
    }

    public render(): CardViewController {
        return this.cardVc.render()
    }
}

```

</details>