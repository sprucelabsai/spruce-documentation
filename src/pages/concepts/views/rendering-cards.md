## Rendering Cards

### Rendering Card by Id

Now that you have your `RootSkillViewController`, you can start adding cards to it. Here is how you can test and implement some cards.

<details>
<summary><strong>Test 1</strong>: Assert card is rendered</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   

export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersExpectedCard() {
        const vc = this.views.Controller('eightbitstories.root', {})
        vcAssert.assertSkillViewRendersCard(vc, 'my-card')
    }
}
```

</details>

<details>
<summary><strong>Production 1a</strong>: Render your card</summary>

We'll quickly create a `CardViewController` to render in our `RootSkillViewController` as the only card in a single layout.

```ts
import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'
    protected cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.Controller('card', {
            id: 'my-card',
            header: {
                title: 'My Card',
            },
        })
    }

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [this.cardVc.render()],
                },
            ],
        }
    }
}

```

> **Note**: Your card's `ViewModel` is never fully tested. Things like header text changes too much to make a meaningful test. The only time you should test the copy in your view is if it's dynamically generated.

</details>

<details>
<summary><strong>Production 1b</strong>: Cleanup your SkillView</summary>

Extracting the construction of your nested view controllers to builder methods makes the constructor of your `RootSkillViewController` much easier to read and makes refactor easier.

```ts
import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'
    protected cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc() {
        return this.Controller('card', {
            id: 'my-card',
            header: {
                title: 'My Card',
            },
        })
    }

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [this.cardVc.render()],
                },
            ],
        }
    }
}

```


</details>

### Rendering your own ViewController Class

<details>
<summary><strong>Test 1</strong>: Assert card rendered of type</summary>

This test picks up where the last one left off. We're going to test that the `CardViewController` is rendered as an instance of `MyCardViewController`.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   

export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersExpectedCard() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const cardVc = vcAssert.assertSkillViewRendersCard(vc, 'my-card')
        vcAssert.assertControllerInstanceOf(cardVc, MyCardViewController)
    }
}
```

> **Note**: You will be getting a "MyCardViewController not defined" error here, that is expected. We will fix that in the next step.

</details>

<details>
<summary><strong>Production 1</strong>: Create your own ViewController Class</summary>

```bash
spruce create.view
```
Make sure you select "Card" as the type of `ViewModel` you want your new `ViewController` to render and name it "My Card".

> **Note**: View controllers will automatically have 'ViewController' appended to the end of the name you provide, so "My Card" will become "MyCardViewController".

</details>

<details>
<summary><strong>Test 2</strong>: Import ViewController Class</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'  
import MyCardViewController from '../../ViewControllers/MyCard.vc' 

export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersExpectedCard() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const cardVc = vcAssert.assertSkillViewRendersCard(vc, 'my-card')
        vcAssert.assertControllerInstanceOf(cardVc, MyCardViewController)
    }
}
```

</details>

<details>
<summary><strong>Production 1a</strong>: Implement your ViewController Class</summary>

In Spruce, we use composition over inheritance. That means your `MyCardViewController` should have a `CardViewController` as a property and render that, rather than trying to extend `CardViewController` or implement the `CardViewController` interface.

```ts
export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        
        this.cardVc = this.Controller('card', {
            id: 'my-card',
            header: {
                title: "Hey there!",
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}
```
</details>

<details>
<summary><strong>Production 1b</strong>: Update your RootSkillViewController</summary>

Now it's just a matter of swapping out `card` for `my-card` in your `CardVc` builder method, renaming a few things, and updating the `render` method to render your new `MyCardViewController`.

```ts
import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
} from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../ViewControllers/MyCard.vc'

export default class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'
    protected myCardVc: MyCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.myCardVc = this.MyCardVc()
    }

    private MyCardVc() {
        return this.Controller('eightbitstories.my-card', {})
    }

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [this.myCardVc.render()],
                },
            ],
        }
    }
}

```
</details>

<details>
<summary><strong>Production 1c</strong>: Cleanup MyCardViewController</summary>

Now we'll go throught the usual refactor of extracting the construction of your view controllers to builder methods.

```ts
export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc() {
        return this.Controller('card', {
            id: 'my-card',
            header: {
                title: "Hey there!",
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}
```
</details>

### Rendering remote cards

The interoperatibility of Spruce allows you to render cards from other skills. It's a great way to share views accross multiple skills. To pull this off, you'll leverage the `RemoteViewControllerFactory` provided by [`@sprucelabs/spruce-heartwood-utils`](https://www.npmjs.com/package/@sprucelabs/spruce-heartwood-utils).

<details>
<summary><strong>Test 1a</strong>: Set stage for importing <em>RemoteViewControllerFactory</em></summary>

For this first test, we're going to drop in the `MockRemoteViewControllerFactory` test double to get ready to make some assertions.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    @test()
    protected async loadsRemoteCard() {
        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory
    }
}
```
</details>

<details>
<summary><strong>Test 1b</strong>: Import <em>@sprucelabs/spruce-heartwood-utils</em></summary>

You should get 2 errors, one for each class you need to import. Lets start by adding the correct dependency using `yarn`.

```bash
yarn add @sprucelabs/spruce-heartwood-utils
```

Now that this is done, you can import the classes you need and the tests will pass.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   
import { RemoteViewControllerFactoryImpl, MockRemoteViewControllerFactory } from '@sprucelabs/spruce-heartwood-utils'

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    @test()
    protected async loadsRemoteCard() {
        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory
    }
}
```

</details>

<details>
<summary><strong>Test 1c</strong>: Assert card is fetched</summary>

Now I'm going to execute the operation (in this case `this.views.load(...)`) where I expect the remote card to be fetched. Then I'll assert that it was fetched by accessing the `MockRemoteViewControllerFactory` instance.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   
import { RemoteViewControllerFactoryImpl, MockRemoteViewControllerFactory } from '@sprucelabs/spruce-heartwood-utils'

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    @test()
    protected async loadsRemoteCard() {
        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory


        const vc = this.views.Controller('eightbitstories.root', {})
        await this.views.load(vc)

        MockRemoteViewControllerFactory.getInstance().assertFetchedRemoteController('other-skill.my-card')

    }
}
```

</details>

<details>
<summary><strong>Production 1</strong>: Load the remote card</summary>

The first step in production is to load the remote card. I won't be actually rendering it yet, that'll be a different test!

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'

    public async load() {
        const remote = RemoteViewControllerFactoryImpl.Factory({
            connectToApi: this.connectToApi,
            vcFactory: this.getVcFactory()
        })

        await remote.RemoteController('other-skill.my-card', {})
    }

     public render() {
        return {}
    }
}
```

</details>

<details>
<summary><strong>Test 2</strong>: Drop in the remote card to the <em>MockRemoteViewControllerFactory</em></summary>

You should now be getting an error something like "Couldn't find a view controller called "other-skill.my-card"." I'm gonna drop in a `CardViewController` into the `MockRemoteViewControllerFactory` to make that error go away.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert, CardViewControllerImpl } from '@sprucelabs/heartwood-view-controllers'   
import { RemoteViewControllerFactoryImpl, MockRemoteViewControllerFactory } from '@sprucelabs/spruce-heartwood-utils'

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    @test()
    protected async loadsRemoteCard() {
        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory

        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )

        const vc = this.views.Controller('eightbitstories.root', {})
        await this.views.load(vc)

        MockRemoteViewControllerFactory.getInstance().assertFetchedRemoteController('other-skill.my-card')

    }
}
```

> **Note**: I dropped in a `CardViewControllerImpl` to keep the example simple, but you will probably want to drop in a test double to make more assertions later.

</details>

<details>
<summary><strong>Test 3</strong>: Assert Skill View renders the remote card</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert, CardViewControllerImpl } from '@sprucelabs/heartwood-view-controllers'   
import { RemoteViewControllerFactoryImpl, MockRemoteViewControllerFactory } from '@sprucelabs/spruce-heartwood-utils'

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    @test()
    protected async loadsRemoteCard() {
        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory

        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )

        const vc = this.views.Controller('eightbitstories.root', {})
        await this.views.load(vc)

        MockRemoteViewControllerFactory.getInstance().assertFetchedRemoteController('other-skill.my-card')

    }

    @test()
    protected async rendersRemoteCard() {
        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory

        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )

        const vc = this.views.Controller('eightbitstories.root', {})

        await this.views.load(vc)

        MockRemoteViewControllerFactory.getInstance().assertSkillViewRendersRemoteCard(vc, 'other-skill.my-card')
    }
}
```

</details>

<details>
<summary><strong>Production 2</strong>: Render the remote card</summary>

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'

    private remoteCardVc?: CardViewController

    public async load() {
        const remote = RemoteViewControllerFactoryImpl.Factory({
            connectToApi: this.connectToApi,
            vcFactory: this.getVcFactory()
        })

        this.remoteCardVc = await remote.RemoteController('other-skill.my-card', {})
    }

    public render() {
        if (!this.remoteCardVc) {
            return {}
        }

        return {
            layouts: [
                {
                    cards: [
                        this.remoteCardVc.render()
                    ]
                }
            ]
        }
    }
}
```

> **Note**: In order to get types to pass, I had to optionally return early from `render()`. Because `render()` is called before `load()`, I had to make sure that `this.remoteCardVc` was optional and that I returned an empty object if it was not set. You can return anything you want before load.

</details>

<details>
<summary><strong>Test 4</strong>: Dry the test</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert, CardViewControllerImpl } from '@sprucelabs/heartwood-view-controllers'   
import { RemoteViewControllerFactoryImpl, MockRemoteViewControllerFactory } from '@sprucelabs/spruce-heartwood-utils'

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    private vc!: RootSkillViewController

    protected async beforeEach() {
        await super.beforeEach()

        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory
        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )
        this.vc = this.views.Controller('eightbitstories.root', {})
    }

    @test()
    protected async loadsRemoteCard() {
        await this.load()
        this.mockFactory.assertFetchedRemoteController('other-skill.my-card')
    }

    @test()
    protected async rendersRemoteCard() {
        await this.load()
        this.mockFactory.assertSkillViewRendersRemoteCard(vc, 'other-skill.my-card')
    }

    private async load() {
        await this.views.load(vc)
    }

    private get mockFactory() {
        return MockRemoteViewControllerFactory.getInstance()
    }
}
```

</details>

<details>
<summary><strong>Test 5</strong>: Assert render is triggered</summary>

Simply setting the remote card to `this.remoteCardVc` will not cause the card to be rendered. You need to manually trigger a render on your `SkillViewController`.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert, CardViewControllerImpl } from '@sprucelabs/heartwood-view-controllers'   
import { RemoteViewControllerFactoryImpl, MockRemoteViewControllerFactory } from '@sprucelabs/spruce-heartwood-utils'

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    private vc!: RootSkillViewController

    protected async beforeEach() {
        await super.beforeEach()

        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory
        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )
        this.vc = this.views.Controller('eightbitstories.root', {})
    }

    @test()
    protected async loadsRemoteCard() {
        await this.load()
        this.mockFactory.assertFetchedRemoteController('other-skill.my-card')
    }

    @test()
    protected async rendersRemoteCard() {
        await this.load()
        this.mockFactory.assertSkillViewRendersRemoteCard(vc, 'other-skill.my-card')
    }

    @test()
    protected async triggersRender() {
        await this.load()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private async load() {
        await this.views.load(vc)
    }

    private get mockFactory() {
        return MockRemoteViewControllerFactory.getInstance()
    }
}
```

</details>

<details>
<summary><strong>Production 3</strong>: Trigger render in Skill View</summary>

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'

    private remoteCardVc?: CardViewController

    public async load() {
        const remote = RemoteViewControllerFactoryImpl.Factory({
            connectToApi: this.connectToApi,
            vcFactory: this.getVcFactory()
        })

        this.remoteCardVc = await remote.RemoteController('other-skill.my-card', {})
        this.triggerRender()
    }

    public render() {
        if (!this.remoteCardVc) {
            return {}
        }

        return {
            layouts: [
                {
                    cards: [
                        this.remoteCardVc.render()
                    ]
                }
            ]
        }
    }
}
```

</details>

### Active Record Card

The `ActiveRecordCard` is a special card that is used to quickly render records returned from a listener (usually pulled from a database, but not necessarily). Generally speaking, it is a great way to render a list of records. 

<img style="margin:0 auto; display:block;" src="../../assets/img/concepts/active_record_card.png">

> **Note**: This test starts with a **MyCardViewContoller**  that you have already created in the ["Rendering Card by Id"](#rendering-your-own-view-controller-class) section. You should start with that test before continuing.

<details>
<summary><strong>Test 1</strong>: Assert card is rendered as instance of <em>ActiveRecordCardViewController</em></summary>

If you haven't already created a test, you need to run:

```bash
spruce create.test
```

And call it "My Card" and select `AbstractSpruceFixtureTest` as the base test class (unless you have a different base class you want to use). The idea here is to test the card independently of the Skill View.

```ts
import { vcAssert, AbstractSpruceFixtureTest } from '@sprucelabs/heartwood-view-controllers'
import { test } from '@sprucelabs/test-utils'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        vcAssert.assertIsActiveRecordCard(vc)
    }
}

```
</details>

<details>
<summary><strong>Production 1</strong>: Render the <em>ActiveRecordCard</em></summary>

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    buildActiveRecordCard,
    ActiveRecordCardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private activeRecordCardVc: ActiveRecordCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.activeRecordCardVc = this.ActiveCardVc()
    }

    private ActiveCardVc() {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: 'my-cards-id',
                header: {
                    title: "Family Members",
                },
                eventName: 'list-installed-skills::v2020_12_25',
                responseKey: 'skills',
                rowTransformer: () => ({
                    id: 'aoeu',
                    cells: [],
                }),
            })
        )
    }

    public render() {
        return this.activeRecordCardVc.render()
    }
}

```
> **Note**: The `eventName` and `responseKey` are placeholders. You will need to replace them with the actual event name and response key that you are listening for in upcoming tests.
</details>

<details>
<summary><strong>Test 2</strong>: Assert <em>ActiveRecordCard</em> is emitting the correct event on load</summary>

Even though our goal is to make sure that the `ActiveRecordCard` is emitting the correct event on load, we'll first need to make sure that `MyCardViewController` has a method called `load` that calls `this.activeRecordCardVc.load()`. We're not going to jump right there, though. We'll start with the test below which will fail because `MyCardViewController` doesn't have a `load` method.

```ts
import { vcAssert, AbstractSpruceFixtureTest } from '@sprucelabs/heartwood-view-controllers'
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        vcAssert.assertIsActiveRecordCard(vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        let wasHit = false

        await eventFaker.on('eightbitstories.list-family-members::v2024_07_22', () => {
            wasHit = true
            return {
                familyMembers: [],
            }
        })

        const vc = this.views.Controller('eightbitstories.my-card', {})
        await vc.load()
    }
}

```
> **Note**: The event `eightbitstories.list-family-members::v2024_07_22` is a best guess at what the event name will be. It will show a type error to start, that is fine, we'll fix it in a moment.

> **Note**: The response to the event, `{ familyMembers: [] }`, is what we'd like the event to respond with, once we design it. The idea being, design it how you think it should work, and then make it work that way.

</details>

<details>
<summary><strong>Production 2</strong>: Stub the <em>load</em> method to <em>MyCardViewController</em></summary>

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    buildActiveRecordCard,
    ActiveRecordCardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private activeRecordCardVc: ActiveRecordCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.activeRecordCardVc = this.ActiveCardVc()
    }

    private ActiveCardVc() {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: 'my-cards-id',
                header: {
                    title: "Family Members",
                },
                eventName: 'list-installed-skills::v2020_12_25',
                responseKey: 'skills',
                rowTransformer: () => ({
                    id: 'aoeu',
                    cells: [],
                }),
            })
        )
    }

    public async load() {}

    public render() {
        return this.activeRecordCardVc.render()
    }
}

```

</details>

<details>

<summary><strong>Test 3</strong>: Assert the event is being emitted</summary>

```ts
import { vcAssert, AbstractSpruceFixtureTest } from '@sprucelabs/heartwood-view-controllers'
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'
import { test, assert } from '@sprucelabs/test-utils'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        vcAssert.assertIsActiveRecordCard(vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        let wasHit = false

        await eventFaker.on('eightbitstories.list-family-members::v2024_07_22', () => {
            wasHit = true
            return {
                familyMembers: [],
            }
        })

        const vc = this.views.Controller('eightbitstories.my-card', {})
        await vc.load()

        assert.isTrue(wasHit, 'The event eightbitstories.list-family-members::v2024_07_22 was not emitted.')
    }
}
```
</details>

<details>
<summary><strong>Production 3a</strong>: Emit the event on load</summary>

Not only are we going to load the `ActiveRecordCard` on load, but we're going to update the event `eightbitstories.list-family-members::v2024_07_22` and the `responseKey` to match what we want it to look like.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    buildActiveRecordCard,
    ActiveRecordCardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private activeRecordCardVc: ActiveRecordCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.activeRecordCardVc = this.ActiveCardVc()
    }

    private ActiveCardVc() {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: 'my-cards-id',
                header: {
                    title: "Family Members",
                },
                eventName: 'eightbitstories.list-family-members::v2024_07_22',
                responseKey: 'familyMembers',
                rowTransformer: () => ({
                    id: 'aoeu',
                    cells: [],
                }),
            })
        )
    }

    public async load() {
        await this.activeRecordCardVc.load()
    }

    public render() {
        return this.activeRecordCardVc.render()
    }
}

```
</details>

<details>
<summary><strong>Production 3b</strong>: Create the event</summary>

You should be getting an error that the event `eightbitstories.list-family-members::v2024_07_22` doesn't exist. Let's create it!

```bash
spruce create.event
```

Make sure to name it "List Family Members".

> **Note**: Now you can jump into the [event definition files](../events/#event-file-structure) and design it how you think it should work. Once you have that, you can run `spruce sync.events` to generate the event contracts and your test will pass.

</details>

<details>
<summary><strong>Production 3c (Optional)</strong>: Stub a target</summary>

If your event requires a target, let's stub one in for now:

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    buildActiveRecordCard,
    ActiveRecordCardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private activeRecordCardVc: ActiveRecordCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.activeRecordCardVc = this.ActiveCardVc()
    }

    private ActiveCardVc() {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: 'my-cards-id',
                header: {
                    title: "Family Members",
                },
                eventName: 'eightbitstories.list-family-members::v2024_07_22',
                responseKey: 'familyMembers',
                target: {
                    organizationId: 'aoeu'
                },
                rowTransformer: () => ({
                    id: 'aoeu',
                    cells: [],
                }),
            })
        )
    }

    public async load() {
        await this.activeRecordCardVc.load()
    }

    public render() {
        return this.activeRecordCardVc.render()
    }
}

```

</details>

<details>
<summary><strong>Test 4a</strong>: Dry the tests</summary>

Now is as good as time as any to cleaup our test code. We'll move the construction of the `MyCardViewController` the `beforeEach()` of the test to make the test easier to read and refactor later.

```ts
import { vcAssert, AbstractSpruceFixtureTest } from '@sprucelabs/heartwood-view-controllers'
import { eventFaker } from '@sprucelabs/spruce-test-fixtures'
import { test, assert } from '@sprucelabs/test-utils'
import MyCardViewController from '../../ViewControllers/MyCard.vc'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    protected vc: MyCardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        let wasHit = false

        await eventFaker.on('eightbitstories.list-family-members::v2024_07_22', () => {
            wasHit = true
            return {
                familyMembers: [],
            }
        })

        await this.vc.load()

        assert.isTrue(wasHit, 'The event eightbitstories.list-family-members::v2024_07_22 was not emitted.')
    }
}
```
</details>

<details>
<summary><strong>Test 4b (Optional)</strong>: Assert the correct target</summary>

If this were a `SkillViewController`, our `load()` method would be passed `Scope`, which would be how we could get the current `Organization` or `Location`. But, since this is a `ViewController`, we don't have that luxury. We'll need the person calling `load()` on our `ViewController` to pass the important information in and we'll construct the `target` from that.

```ts
import { SpruceSchemas, vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { eventFaker, AbstractFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import MyCardViewController from '../../../viewControllers/MyCard.vc'

export default class MyCardTest extends AbstractFixtureTest {
    private vc!: MyCardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        const organizationId = generateId()

        let wasHit = false
        let passedTarget:
            | SpruceSchemas.Eightbitstories.v2024_07_22.ListFamilyMembersEmitTarget
            | undefined

        await eventFaker.on(
            'eightbitstories.list-family-members::v2024_07_22',
            ({ target }) => {
                passedTarget = target
                wasHit = true
                return {
                    people: [],
                }
            }
        )

        await this.vc.load(organizationId)

        assert.isTrue(wasHit)
        assert.isEqualDeep(passedTarget, { organizationId })
    }
}

```
</details>

<details>
<summary><strong>Production 4 (Optional)</strong>: Set the target on the <em>ActiveRecordCard</em></summary>

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    buildActiveRecordCard,
    ActiveRecordCardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private activeRecordCardVc: ActiveRecordCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.activeRecordCardVc = this.ActiveCardVc()
    }

    private ActiveCardVc() {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: 'my-cards-id',
                header: {
                    title: "Family Members",
                },
                eventName: 'eightbitstories.list-family-members::v2024_07_22',
                responseKey: 'familyMembers',
                rowTransformer: () => ({
                    id: 'aoeu',
                    cells: [],
                }),
            })
        )
    }

    public async load(organizationId: string) {
        this.activeRecordCardVc.setTarget({ organizationId })
        await this.activeRecordCardVc.load()
    }

    public render() {
        return this.activeRecordCardVc.render()
    }
}

```

> **Note**: Because we are setting the target using `setTarget()`, we don't need to pass it to the constructor of the `ActiveRecordCard`. So we removed the stubbed target from the constructor.

</details>

<details>
<summary><strong>Test 5</strong>: Refactor the test</summary>

The idea here is to remove the redundant assertions and to extract out the `eventFaker` to an `EventFaker` class we can reuse across tests.

```ts
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { AbstractFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import MyCardViewController from '../../../viewControllers/MyCard.vc'
import EventFaker, { ListFamilyMembersTargetAndPayload } from '../../support/EventFaker'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    private vc!: MyCardViewController
    private static eventFaker: EventFaker

    protected async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        const organizationId = generateId()

        let passedTarget:
            | ListFamilyMembersTargetAndPayload['target']
            | undefined

        await this.eventFaker.fakeListFamilyMembers(({ target }) => {
            passedTarget = target
            return {
                people: []
            }
        })

        await this.vc.load(organizationId)

        assert.isEqualDeep(passedTarget, { organizationId })
    }
}

```
And our new `EventFaker` implementation:

```ts
import { eventFaker, SpruceSchemas } from '@sprucelabs/spruce-test-fixtures'
import { generateId } from '@sprucelabs/test-utils'
import { SpruceSchemas, Person } from '@sprucelabs/spruce-core-schemas'

export class EventFaker {
    public async fakeListFamilyMembers(
        cb?: (targetAndPayload: ListConnectPeopleTargetAndPayload) => void | ListConnectedPeopleResponse
    ) {
        await eventFaker.on(
            'eightbitstories.list-familyMembers::v2024_07_22',
            (targetAndPayload) => {
                return cb?.(targetAndPayload) ?? {
                    people: [],
                }
            }
        )
    }
}

export type ListFamilyMembersTargetAndPayload =
    SpruceSchemas.Eightbitstories.v2024_07_22.ListFamilyMembersEmitTargetAndPayload
export type ListConnectedPeopleResponse =
    SpruceSchemas.Eightbitstories.v2024_07_22.ListFamilyMembersResponsePayload

```
</details>

<details>
<summary><strong>Test 6a</strong>: Assert the expected rows are rendered</summary>

```ts
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { AbstractFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import MyCardViewController from '../../../viewControllers/MyCard.vc'
import { Person } from '@sprucelabs/spruce-core-schemas'
import EventFaker, { ListFamilyMembersTargetAndPayload } from '../../support/EventFaker'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    private vc!: MyCardViewController
    private static eventFaker: EventFaker

    protected async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        const organizationId = generateId()

        let passedTarget:
            | ListFamilyMembersTargetAndPayload['target']
            | undefined

        await this.eventFaker.fakeListFamilyMembers(({ target }) => {
            passedTarget = target
            return {
                people: []
            }
        })

        await this.vc.load(organizationId)

        assert.isEqualDeep(passedTarget, { organizationId })
    }

    @test()
    protected async rendersRowForResults() {
        const organizationId = generateId()

        const person: Person = {
            id: generateId(),
            casualName: generateId(),
            networkInterface: 'eth0',
        }

        await this.eventFaker.fakeListConnectedPeople(() => [person])

        await this.vc.load(organizationId)

        listAssert.listRendersRow(this.vc.getListVc(), person.id)
    }
}

```

> **Note**: You should get an error that `getListVc()` doesn't exist. To fix this, we'll need a `Spy` test double to expose the `ActiveRecordCard`'s `getListVc()` method.

</details>

<details>
<summary><strong>Test 6b</strong>: Create the Test Double</summary>

Here we're going to create the `SpyMyCard` test double, override the controller using `this.views.setController()`, and typecast the controller to `SpyMyCard` to expose the `getListVc()` method.

```ts
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { AbstractFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import MyCardViewController from '../../../viewControllers/MyCard.vc'
import { Person } from '@sprucelabs/spruce-core-schemas'
import EventFaker, { ListFamilyMembersTargetAndPayload } from '../../support/EventFaker'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    private vc!: SpyMyCard
    private static eventFaker: EventFaker

    protected async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()

        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        const organizationId = generateId()

        let passedTarget:
            | ListFamilyMembersTargetAndPayload['target']
            | undefined

        await this.eventFaker.fakeListFamilyMembers(({ target }) => {
            passedTarget = target
            return {
                people: []
            }
        })

        await this.vc.load(organizationId)

        assert.isEqualDeep(passedTarget, { organizationId })
    }

    @test()
    protected async rendersRowForResults() {
        const organizationId = generateId()

        const person: Person = {
            id: generateId(),
            casualName: generateId(),
            networkInterface: 'eth0',
        }

        await this.eventFaker.fakeListConnectedPeople(() => [person])

        await this.vc.load(organizationId)

        listAssert.listRendersRow(this.vc.getListVc(), person.id)
    }
}

class SpyMyCard extends MyCardViewController {
    public getListVc() {
        return this.activeRecordCardVc.getListVc()
    }
}

```

> **Note**: Even though the test will pass, you'll get a type error because `activeRecordCard` is private in `MyCardViewController`. We'll address that in the production code while we make the test pass.

</details>

<details>
<summary><strong>Production 6</strong>: Render the row as expected</summary>

We are doing 2 things here:

1. Setting `activeRecordCardVc` to `protected` so that `SpyMyCard` can access it.
2. Updating the `rowTransformer` to use the family member's id for the row id and the family member's name for the row cell.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    buildActiveRecordCard,
    ActiveRecordCardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    protected activeRecordCardVc: ActiveRecordCardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.activeRecordCardVc = this.ActiveCardVc()
    }

    private ActiveCardVc() {
        return this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: 'my-cards-id',
                header: {
                    title: "Family Members",
                },
                eventName: 'eightbitstories.list-family-members::v2024_07_22',
                responseKey: 'familyMembers',
                rowTransformer: (familyMember) => ({
                    id: familyMember.id,
                    cells: [{
                        text: {
                            content: familyMember.name
                        }
                    }],
                }),
            })
        )
    }

    public async load(organizationId: string) {
        this.activeRecordCardVc.setTarget({ organizationId })
        await this.activeRecordCardVc.load()
    }

    public render() {
        return this.activeRecordCardVc.render()
    }
}

```

</details>

<details>
<summary><strong>Test 7</strong>: Dry the test</summary>

There is quite a bit happening here:

1. Moved a lot of things to the `beforeEach()` to simplify the tests
    1. The `organizationId`
    2. The `familyMembers` return from the event
    3. The `lastListFamilyMembersTarget` from the event
2. Created a `load()` method to pass the `organizationId` to `load()` for us


```ts
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'
import { AbstractFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import MyCardViewController from '../../../viewControllers/MyCard.vc'
import { Person } from '@sprucelabs/spruce-core-schemas'
import EventFaker, { ListFamilyMembersTargetAndPayload } from '../../support/EventFaker'

export default class WhosOnWifiCardTest extends AbstractSpruceFixtureTest {
    private vc!: SpyMyCard
    private static eventFaker: EventFaker
    private static organizationId: string
    private static lastListFamilyMembersTarget:
        | ListFamilyMembersTargetAndPayload['target']
        | undefined

    private static familyMembers: Person[] = []

    protected async beforeEach() {
        await super.beforeEach()
        
        this.eventFaker = new EventFaker()
        this.organizationId = generateId()
        this.familyMembers = []

        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard

        delete this.lastListFamilyMembersTarget
        
        await this.eventFaker.fakeListFamilyMembers(({ target }) => {
            this.lastListFamilyMembersTarget = target
            return {
                people: this.familyMembers
            }
        })
    }

    @test()
    protected async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected async emitsListConnectedPeopleOnLoad() {
        await this.load()
        assert.isEqualDeep(this.lastListFamilyMembersTarget, { organizationId: this.organizationId })
    }

    @test()
    protected async rendersRowForResults() {
        this.familyMembers.push({
            id: generateId(),
            casualName: generateId(),
            networkInterface: 'eth0',
        })

        await this.load()

        listAssert.listRendersRow(this.vc.getListVc(), this.familyMembers[0].id)
    }

    protected async load() {
        await this.vc.load(this.organizationId)
    }
}

class SpyMyCard extends MyCardViewController {
    public getListVc() {
        return this.activeRecordCardVc.getListVc()
    }
}

```

</details>