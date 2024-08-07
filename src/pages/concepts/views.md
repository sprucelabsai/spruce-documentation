# Views

`Views` are the building blocks of the front-end experience in Spruce. Every `Skill` can register `Skill Views` that are comprised of `CardViewControllers`. By default, the a skill's `RootSkillViewController` is the first view that is rendered. 

<img style="margin:0 auto; display:block;" src="../../assets/img/diagrams/skill_view_with_cards.png">

A `CardViewController` has a `CardHeader`, `CardBody`, and `CardFooter`. The `CardBody` is comprised of many `CardSections`. See the diagrams below to understand how cards are constructed.

<img style="margin:0 auto; display:block;" src="../../assets/img/diagrams/skill_view_and_card.png">

Every other type of `ViewController` (listed below) is rendered inside a `CardSection`. This allows for a consistent look and feel across all views in the Spruce ecosystem.

## Important Classes

<details>

<summary><strong>AbstractCalendarEventViewController</strong> - The class that calendar events extend to customize how they render in the calendar.</summary>

| Method                                            | Returns          | Description                                                                                                 |
|---------------------------------------------------|------------------|-------------------------------------------------------------------------------------------------------------|
| `CalendarEventViewController`                     | `Controller`     | A view controller for calendar events that extends `AbstractCalendarEventViewController` and implements `CalendarEventVc`. |

</details>

<details>

<summary><strong>AbstractSkillViewController</strong> - The class your Skill Views can extend to have access to helpful properties.</summary>

| Method                                        | Returns                | Description                                                                                             |
|-----------------------------------------------|------------------------|---------------------------------------------------------------------------------------------------------|
| `render()`                                    | `string`               | Renders the view and returns the string 'go-team'.                                                      |
| `BookSkillViewController` (constructor)       | `BookSkillViewController` | Initializes a new instance of `BookSkillViewController` by extending `AbstractSkillViewController`.      |

</details>

<details>

<summary><strong>AbstractViewController</strong> - The class your views can extend to have access to helpful properties.</summary>

| Method                                        | Returns                               | Description                                                                                             |
|-----------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------|
| `CardViewController` (constructor)            | `CardViewController<V>`               | Initializes a new instance of `CardViewController` by extending `AbstractViewController<V>` and implementing `ViewController<V>`. |

</details>

<details>

<summary><strong>ActiveRecordCardViewController</strong> - A card that holds an `ActiveRecordList` to make loading, searching, and paging through database records a breeze.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--active-record-list)

| Method                                        | Returns                                       | Description                                                                                             |
|-----------------------------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `activeRecordCard`                            | `ActiveRecordCardViewController`              | Provides the active record card view controller.                                                        |
| `'active-record-card'`                        | `ActiveRecordCardViewController`              | Maps the active record card route to the `ActiveRecordCardViewController`.                              |

</details>

<details>

<summary><strong>ActiveRecordListViewController</strong> - A list that makes loading, searching, and paging through database record a breeze.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--active-record-list)

| Method                                        | Returns                                       | Description                                                                                             |
|-----------------------------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `activeRecordList`                            | `ActiveRecordListViewController`              | Provides the active record list view controller.                                                        |
| `'active-record-list'`                        | `ActiveRecordListViewController`              | Maps the active record list route to the `ActiveRecordListViewController`.                              |

</details>

<details>
<summary><strong>AutocompleteInputViewController</strong> - Turns a text input into an autocomplete input.</summary>

| Method                                        | Returns                                       | Description                                                                                             |
|-----------------------------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `autocompleteInput`                           | `AutocompleteInputViewController`             | Provides the autocomplete input view controller.                                                        |
| `'autocomplete-input'`                        | `AutocompleteInputViewController`             | Maps the autocomplete input route to the `AutocompleteInputViewController`.                             |

</details>

<details>
<summary><strong>BigFormViewController</strong> - A form that renders one field at a time with customizable transitions between questions.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-big-form--big-form).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `bigForm`                                     | `BigFormViewController`                | Provides the big form view controller.                                                                  |
| `'big-form'`                                  | `BigFormViewController`                | Maps the big form route to the `BigFormViewController`.                                                 |

</details>

<details>
<summary><strong>ButtonBarViewController</strong> - A strip of buttons that supports selection and deselection.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-buttons--button-bar).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `buttonBar`                                   | `ButtonBarViewController`              | Provides the button bar view controller.                                                                |
| `'button-bar'`                                | `ButtonBarViewController`              | Maps the button bar route to the `ButtonBarViewController`.                                             |

</details>

<details>
<summary><strong>ButtonGroupViewController</strong> - An array of buttons that supports selected and deselected states.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-buttons--single-select-group).

| Method                                        | Returns        | Description                                                                                             |
|-----------------------------------------------|----------------|---------------------------------------------------------------------------------------------------------|
| `buttons`                                     | `ButtonGroupButton[]` | Retrieves the array of button group buttons.                                                             |
| `selectedButtonIds`                           | `string[]`     | Retrieves the array of selected button IDs.                                                             |
| `selectionChangeHandler`                      | `SelectionChangeHandler` | Retrieves the selection change handler function, if any.                                                |
</details>

<details>
<summary><strong>CalendarViewController</strong> - A calendar that supports day and month views (more soon)!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-calendar--day-calendar).

| Method                                        | Returns                                    | Description                                                                                             |
|-----------------------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `model`                                       | `Omit<CalendarOptions, 'events'>`          | The calendar options model excluding the events property.                                               |
| `vcIdsByEventType`                            | `Record<string, string>`                   | A record mapping event types to view controller IDs.                                                    |
| `vcsById`                                     | `Record<string, CalendarEventViewController>` | A record mapping view controller IDs to their corresponding calendar event view controllers.            |
</details>

<details>
<summary><strong>CalendarEventViewController</strong> - The view controller that renders for each event by detail!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-calendar--day-calendar).

| Method                                        | Returns    | Description                                                                                             |
|-----------------------------------------------|------------|---------------------------------------------------------------------------------------------------------|
| `AbstractCalendarEventViewController` (constructor) | `AbstractCalendarEventViewController` | Initializes a new instance of `AbstractCalendarEventViewController` by extending `AbstractViewController<Event>` and implementing `CalendarEventVc`. |
</details>

<details>
<summary><strong>CardViewController</strong> - The building block of every Skill View!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-cards--cards).

| Method                                                      | Returns    | Description                                                                                             |
|-------------------------------------------------------------|------------|---------------------------------------------------------------------------------------------------------|
| `FeedbackCardViewController` (constructor)                  | `FeedbackCardViewController` | Initializes a new instance of `FeedbackCardViewController`.                                              |
| `FamilyMemberFormCardViewController` (constructor)          | `FamilyMemberFormCardViewController` | Initializes a new instance of `FamilyMemberFormCardViewController`.                                       |
| `'eightbitstories.feedback-card'`                           | `FeedbackCardViewController` | Maps the feedback card route to the `FeedbackCardViewController`.                                         |
| `'eightbitstories.family-member-form-card'`                 | `FamilyMemberFormCardViewController` | Maps the family member form card route to the `FamilyMemberFormCardViewController`.                       |
| `'eightbitstories.feedback-card'` (ConstructorParameters)   | `ConstructorParameters<typeof FeedbackCardViewController>[0]` | Provides the constructor parameters for `FeedbackCardViewController`.                                      |
| `'eightbitstories.family-member-form-card'` (ConstructorParameters) | `ConstructorParameters<typeof FamilyMemberFormCardViewController>[0]` | Provides the constructor parameters for `FamilyMemberFormCardViewController`.                               |

</details>

<details>
<summary><strong>CountdownTimerViewController</strong> - A flipboard style countdown timer!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components--countdown).

| Method                                                        | Returns                                | Description                                                                                             |
|---------------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `CountdownTimerViewController` (constructor)                  | `CountdownTimerViewController`         | Initializes a new instance of `CountdownTimerViewController`.                                           |
| `CountdownTimerViewControllerOptions`                         | `CountdownTimerViewControllerOptions`  | Options for configuring a `CountdownTimerViewController`.                                               |
| `navigation`                                                  | `NavigationViewController`             | Provides the navigation view controller.                                                                |
| `'countdown-timer'`                                           | `CountdownTimerViewController`         | Maps the countdown timer route to the `CountdownTimerViewController`.                                    |
| `'progress-navigator'`                                        | `ProgressNavigatorViewController`      | Maps the progress navigator route to the `ProgressNavigatorViewController`.                              |

</details>

<details>
<summary><strong>FeedViewController</strong> - A chat component for handling coversations!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-the-feed--the-feed).

| Method                                                  | Returns                                | Description                                                                                             |
|---------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `FeedViewController` (constructor)                      | `FeedViewController`                   | Initializes a new instance of `FeedViewController`.                                                     |
| `FeedViewControllerOptions`                             | `FeedViewControllerOptions`            | Options for configuring a `FeedViewController`.                                                         |
| `map`                                                   | `MapViewController`                    | Provides the map view controller.                                                                       |
| `feed`                                                  | `FeedViewController`                   | Provides the feed view controller.                                                                      |
| `navigation`                                            | `NavigationViewController`             | Provides the navigation view controller.                                                                |

</details>

<details>
<summary><strong>FormBuilderViewController</strong> - A component for building custom forms!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-form-builder--form-builder).
</details>

<details>
<summary><strong>FormViewController</strong> - A form comprised of inputs (or a list with inputs)!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-form--all-field-types).
</details>

<details>
<summary><strong>ListCellViewController</strong> - The cells that build a row.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).

| Method                                        | Returns                       | Description                                                                                             |
|-----------------------------------------------|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `CellVc(index: number)`                       | `ListCellViewController`      | Retrieves the list cell view controller at the specified index.                                         |
| `assert.isTrue(value: boolean)`               | `void`                        | Asserts that the provided value is true.                                                                |

</details>

<details>
<summary><strong>ListRowViewController</strong> - Rows that build a list.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).

| Method                                                  | Returns                                | Description                                                                                             |
|---------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `rowVc`                                                 | `ListRowViewController`                | The list row view controller instance associated with the cell input key down event.                    |
| `key`                                                   | `KeyboardKey`                          | The keyboard key that was pressed during the cell input key down event.                                 |

</details>

<details>
<summary><strong>ListViewController</strong> - A List based on rows and cells.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).

| Method                                                  | Returns                                | Description                                                                                             |
|---------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `'form-builder-card'`                                   | `FormBuilderCardViewController`        | Maps the form builder card route to the `FormBuilderCardViewController`.                                 |
| `list`                                                  | `ListViewController`                   | Provides the list view controller.                                                                      |
| `toolBelt`                                              | `ToolBeltViewController`               | Provides the tool belt view controller.                                                                 |

</details>

<details>
<summary><strong>MapViewController</strong> - A customizable map with pin and navigation support.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).

| Method                                                  | Returns                                | Description                                                                                             |
|---------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `MapViewController` (constructor)                       | `MapViewController`                    | Initializes a new instance of `MapViewController`.                                                      |
| `MapViewControllerOptions`                              | `MapViewControllerOptions`             | Options for configuring a `MapViewController`.                                                          |
| `LoginViewController` (constructor)                     | `LoginViewController`                  | Initializes a new instance of `LoginViewController`.                                                    |

</details>

<details>
<summary><strong>NavigationViewController</strong> - Customize the navigation. Currently render inside the ControlBar.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-nav--control-bar).

| Method                                                  | Returns                                | Description                                                                                             |
|---------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `feed`                                                  | `FeedViewController`                   | Provides the feed view controller.                                                                      |
| `navigation`                                            | `NavigationViewController`             | Provides the navigation view controller.                                                                |
| `'countdown-timer'`                                     | `CountdownTimerViewController`         | Maps the countdown timer route to the `CountdownTimerViewController`.                                    |

</details>

<details>
<summary><strong>PolarAreaViewController</strong> - A polar area chart.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-reporting--polar-area).

| Method                                        | Returns                        | Description                                                                                             |
|-----------------------------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `model`                                       | `PolarArea`                    | Retrieves the model for the Polar Area view controller.                                                 |
| `PolarAreaViewController` (constructor)       | `PolarAreaViewController`      | Initializes a new instance of `PolarAreaViewController` by extending `AbstractViewController<PolarArea>`. |

</details>

<details>
<summary><strong>ProgressNavigatorViewController</strong> - Renders at the top of the screen to track progress through any process.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components--progress-navigation).

| Method                                                  | Returns                                | Description                                                                                             |
|---------------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `progressNavigator`                                     | `ProgressNavigatorViewController`      | Provides the progress navigator view controller.                                                        |
| `WithProgressSkillView` (constructor)                   | `WithProgressSkillView`                | Initializes a new instance of `WithProgressSkillView` with the provided view controller options.        |

</details>

<details>
<summary><strong>ProgressViewController</strong> - A progress indicator with an optional message.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-reporting--progress-as-grid-in-big-left).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `stats`                                       | `StatsViewController`                  | Provides the stats view controller.                                                                     |
| `progress`                                    | `ProgressViewController`               | Provides the progress view controller.                                                                  |
| `ratings`                                     | `RatingsViewController`                | Provides the ratings view controller.                                                                   |

</details>

<details>
<summary><strong>RatingsViewController</strong> - A ratings component to gauge sentiment or against a scale.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-form--customizable-ratings).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `RatingsInputComponentIcon`                   | `RatingsInputComponentIcon`            | Retrieves the icon component used in the ratings input.                                                 |
| `RatingsViewControllerOptions`                | `RatingsViewControllerOptions`         | Options for configuring a `RatingsViewController`.                                                      |
| `ControllingARatingsViewTest` (constructor)   | `ControllingARatingsViewTest`          | Initializes a new instance of `ControllingARatingsViewTest` by extending `AbstractViewControllerTest`.   |
| `vc`                                          | `RatingsViewController`                | The static instance of `RatingsViewController` used in the test.                                        |

</details>

<details>
<summary><strong>SwipeViewController</strong> - A version of a card where sections are rendered as a swipe view.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-swipe--swipe).

| Method                                                  | Returns                        | Description                                                                                             |
|---------------------------------------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `Vc(options: SwipeViewControllerOptions)`               | `SwipeCardViewController`      | Creates and returns a new instance of `SwipeCardViewController` with the provided options.              |

</details>

<details>
<summary><strong>StatsViewController</strong> - Render numbers with labels with some nice animations.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-swipe--swipe).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `'active-record-list'`                        | `ActiveRecordListViewController`       | Maps the active record list route to the `ActiveRecordListViewController`.                              |
| `stats`                                       | `StatsViewController`                  | Provides the stats view controller.                                                                     |
| `progress`                                    | `ProgressViewController`               | Provides the progress view controller.                                                                  |

</details>

<details>
<summary><strong>TalkingSprucebotViewController</strong> - Sprucebot animation with typing text. Great for storytelling!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-talking-sprucebot--talking-sprucebot).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `talkingSprucebot`                            | `TalkingSprucebotViewController`       | Provides the talking Sprucebot view controller.                                                         |
| `'talking-sprucebot'`                         | `TalkingSprucebotViewController`       | Maps the talking Sprucebot route to the `TalkingSprucebotViewController`.                               |

</details>

<details>
<summary><strong>ToolBeltViewController</strong> - Holds an extra set of cards that hide when not in use!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-tool-belt-tool-belt--tool-belt).

| Method                                        | Returns                                | Description                                                                                             |
|-----------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| `list`                                        | `ListViewController`                   | Provides the list view controller.                                                                      |
| `toolBelt`                                    | `ToolBeltViewController`               | Provides the tool belt view controller.                                                                 |

</details>

## Skill View Lifecycle

<img src="../../assets/img/diagrams/skill_view_lifecycle.png">

## Root Skill View

Coming soon...

## Rendering Skill Views

Skill Views are the equivalent of pages in a "standard" web application. They are accessible via the url in 2 ways.

1. Subdomain: `https://{skillNamespace}.spruce.bot` (will render your `RootSkillViewController`)
2. Hash: `https://spruce.bot/#/views/{skillNamespace}.{viewId}`

### Root Skill View

Let's get started on rendering a `RootSkillView`.

<details>
<summary><strong>Test 1</strong>: Load Your (Root) Skill View</summary>

We'll start with the `RootSkillViewController`. All you have to do to start is try and load your Skill View and the test will fail.

```ts
import {
    AbstractSpruceFixtureTest
} from '@sprucelabs/spruce-test-fixtures'

export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async canLoadRootSkillView() {
        this.views.Controller('eightbitstories.root', {}),
    }
}
```

</details>

<details>
<summary><strong>Production 1</strong>: Create Your Root Skill View</summary>

This part is pretty easy! Run this following command and follow the instructions!

```shell
spruce create.view
```

</details>

### Rendering A Different Skill View

Coming soon...

### Redirecting Between Skill Views

Coming soon...

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
    protected static async rendersExpectedCard() {
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
    protected static async rendersExpectedCard() {
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
    protected static async rendersExpectedCard() {
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
    protected static async loadsRemoteCard() {
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
    protected static async loadsRemoteCard() {
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
    protected static async loadsRemoteCard() {
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
    protected static async loadsRemoteCard() {
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
    protected static async loadsRemoteCard() {
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
    protected static async rendersRemoteCard() {
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
    private static vc: RootSkillViewController

    protected static async beforeEach() {
        await super.beforeEach()

        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory
        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )
        this.vc = this.views.Controller('eightbitstories.root', {})
    }

    @test()
    protected static async loadsRemoteCard() {
        await this.load()
        this.mockFactory.assertFetchedRemoteController('other-skill.my-card')
    }

    @test()
    protected static async rendersRemoteCard() {
        await this.load()
        this.mockFactory.assertSkillViewRendersRemoteCard(vc, 'other-skill.my-card')
    }

    public static async load() {
        await this.views.load(vc)
    }

    public static get mockFactory() {
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
    private static vc: RootSkillViewController

    protected static async beforeEach() {
        await super.beforeEach()

        RemoteViewControllerFactoryImpl.Class = MockRemoteViewControllerFactory
        MockRemoteViewControllerFactory.dropInRemoteController(
            'forms.remote-form-card',
            CardViewControllerImpl
        )
        this.vc = this.views.Controller('eightbitstories.root', {})
    }

    @test()
    protected static async loadsRemoteCard() {
        await this.load()
        this.mockFactory.assertFetchedRemoteController('other-skill.my-card')
    }

    @test()
    protected static async rendersRemoteCard() {
        await this.load()
        this.mockFactory.assertSkillViewRendersRemoteCard(vc, 'other-skill.my-card')
    }

    @test()
    protected static async triggersRender() {
        await this.load()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    public static async load() {
        await this.views.load(vc)
    }

    public static get mockFactory() {
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
    protected static async rendersAsInstanceOfActiveRecordCard() {
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
    protected static async rendersAsInstanceOfActiveRecordCard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        vcAssert.assertIsActiveRecordCard(vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    protected static async rendersAsInstanceOfActiveRecordCard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        vcAssert.assertIsActiveRecordCard(vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    protected static vc: MyCardViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected static async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    private static vc: MyCardViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected static async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    private static vc: MyCardViewController
    private static eventFaker: EventFaker

    protected static async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected static async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    private static vc: MyCardViewController
    private static eventFaker: EventFaker

    protected static async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()
        this.vc = this.views.Controller('eightbitstories.my-card', {})
    }

    @test()
    protected static async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    protected static async rendersRowForResults() {
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
    private static vc: SpyMyCard
    private static eventFaker: EventFaker

    protected static async beforeEach() {
        await super.beforeEach()
        this.eventFaker = new EventFaker()

        this.views.setController('eightbitstories.my-card', SpyMyCard)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
    }

    @test()
    protected static async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
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
    protected static async rendersRowForResults() {
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
    private static vc: SpyMyCard
    private static eventFaker: EventFaker
    private static organizationId: string
    private static lastListFamilyMembersTarget:
        | ListFamilyMembersTargetAndPayload['target']
        | undefined

    private static familyMembers: Person[] = []

    protected static async beforeEach() {
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
    protected static async rendersAsInstanceOfActiveRecordCard() {
        vcAssert.assertIsActiveRecordCard(this.vc)
    }

    @test()
    protected static async emitsListConnectedPeopleOnLoad() {
        await this.load()
        assert.isEqualDeep(this.lastListFamilyMembersTarget, { organizationId: this.organizationId })
    }

    @test()
    protected static async rendersRowForResults() {
        this.familyMembers.push({
            id: generateId(),
            casualName: generateId(),
            networkInterface: 'eth0',
        })

        await this.load()

        listAssert.listRendersRow(this.vc.getListVc(), this.familyMembers[0].id)
    }

    protected static async load() {
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

## Rendering Dialogs

Dialogs are cards rendered modally. You can render a basic `Card` `ViewModel` or you can render a `CardViewController` as a dialog.

### Rendering a simple `ViewModel` based `Dialog` on load

This is the simplest way to render a dialog. You can render a `Card` `ViewModel` by calling `this.renderInDialog(...)` from your `SkillViewController` or `ViewController`.

<details>
<summary><strong>Test 1</strong>: Assert dialog is rendered on load</summary>

For this example, we'll keep the dialog simple and render a `Card` `ViewModel` in the `RootSkillViewController`'s `load()` `Lifecycle` method.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   

export default class RenderingADialogTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersAlertOnLoad() {
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
    protected static async rendersAlertOnLoad() {
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
    protected static async rendersAlertOnLoad() {
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
    protected static async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
    }

    @test()
    protected static async callsLoadOnMyCardAfterShowingAsDialog() {
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

    protected static async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', MockMyCardViewController)
    }

    @test()
    protected static async rendersAlertOnLoad() {
        const vc = this.views.Controller('eightbitstories.root', {})
        const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
        vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
    }

    @test()
    protected static async callsLoadOnMyCardAfterShowingAsDialog() {
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

    private static vc: MockMyCardViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.views.setController('eightbitstories.my-card', MockMyCardViewController)
        this.vc = this.views.Controller('eightbitstories.root', {}) as MockMyCardViewController
    }

    @test()
    protected static async rendersAlertOnLoad() {
        await this.loadAndAssertRendersMyCard()
    }

    @test()
    protected static async callsLoadOnMyCardAfterShowingAsDialog() {
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
    protected static async setsListenersOnLoad() {
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
    protected static async setsListenersOnLoad() {
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
    protected static async removesListenersOnHide() {
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
    private static vc: MyCardViewController
    private static wasDidGenerateStoryCalled = false

    public static async beforeEach() {
        await super.beforeEach()
        
        this.wasDidGenerateStoryCalled = true
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as MyCardViewController
       
        this.vc.handleDidGenerateStory = async () => {
            this.wasDidGenerateStoryCalled = true
        }

        await this.vc.load()
    }

    @test()
    protected static async setsListenersOnLoad() {
        await this.emitDidGenerateStory()
        assert.isTrue(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected static async removesListenersOnHide() {
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
    private static vc: MyCardViewController
    private static wasDidGenerateStoryCalled = false

    public static async beforeEach() {
        await super.beforeEach()
        
        this.wasDidGenerateStoryCalled = true
        this.vc = this.views.Controller('eightbitstories.my-card', {})
       
        this.vc.handleDidGenerateStory = async () => {
            this.wasDidGenerateStoryCalled = true
        }

        await this.vc.load()
    }

    @test()
    protected static async setsListenersOnLoad() {
        await this.emitDidGenerateStory()
        assert.isTrue(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected static async removesListenersOnHide() {
        await this.hideAndEmitDidGenerateStory()
        assert.isFalse(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to not be called in MyCard`)
    }

    @test()
    protected static async removesTheCorrectListener() {
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
    private static vc: SpyMyCardViewController
    

    public static async beforeEach() {
        await super.beforeEach()
        
        this.views.setController('eightbitstories.my-card', SpyMyCardViewController)
        this.vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCardViewController

        await this.vc.load()
    }

    @test()
    protected static async setsListenersOnLoad() {
        await this.emitDidGenerateStory()
        assert.isTrue(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to be called in my Card`)
    }

    @test()
    protected static async removesListenersOnHide() {
        await this.hideAndEmitDidGenerateStory()
        assert.isFalse(this.wasDidGenerateStoryCalled, `Expected handleDidGenerateStory to not be called in MyCard`)
    }

    @test()
    protected static async removesTheCorrectListener() {
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


## Rendering Forms

`Forms`, like all other components, are render in the `CardSection` of your `Card`. You will rely heavily on the `formAssert` utility for testing. Before getting too deep, it'll be helpful to understand some [`Schema`](../schemas) basics.

### Rendering a Form

<details>
<summary><strong>Test 1</strong>: Assert form is rendered in your card</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersACard() {
        const vc = this.views.Controller('theatre.jump-to-card', {})
        formAssert.cardRendersForm(vc)
    }
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Render an empty form in your card</summary>

This is a big first step, but pay attention to a few things:

1. You construct your form using the `buildForm` utility for better typing.
2. The `FormViewController` interface is a generic, so it'll take the type of your `Schema` to enable advanced typing.
3. You render your `Form` into the `form` property of your `CardSection`.

```ts
import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MyCardViewController extends AbstractViewController<Card> {
    public static id = 'my-card'
    private cardVc: CardViewController
    private formVc: FormViewController<MyFormSchema>

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.formVc = this.Controller(
            'form',
            buildForm({
                schema: myFormSchema,
                sections: [],
            })
        )
        this.cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}

const myFormSchema = buildSchema({
    id: 'jumpToForm',
    fields: {},
})

type MyFormSchema = typeof myFormSchema

```

> **Note**: You will rely on `buildForm` to get better typing while constructing your form.

</details>

<details>
<summary><strong>Test 2a</strong>: Asserting desired fields are rendered</summary>

Our goal is to check that a desired field is being rendered, but first we'll get blocked by needing to expose our `formVc`. We'll do that using a test double.

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }

    @test()
    protected static async rendersExpectedFields() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.formRendersFields(vc.getForm(), ['destination'])
    }
}

```

> **Note**: You should see an error that `getForm()` doesn't exist. We'll create a `Spy` to fix that.

</details>

<details>
<summary><strong>Test 2b</strong>: Create a `Spy` for `MyCardViewController`</summary>

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { formAssert } from '@sprucelabs/heartwood-view-controllers'
import MyCardViewController from '../../viewControllers/MyCardViewController'

export default class MyCardTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersACard() {
        const vc = this.views.Controller('eightbitstories.my-card', {})
        formAssert.cardRendersForm(vc)
    }

    @test()
    protected static async rendersExpectedFields() {
        this.views.setController('eightbitstories.my-card', SpyMyCard)
        const vc = this.views.Controller('eightbitstories.my-card', {}) as SpyMyCard
        formAssert.formRendersFields(vc.getForm(), ['field1','field2'])
    }
}

class SpyMyCard extends MyCardViewController {
    public getForm() {
        return this.formVc
    }
}

```

> **Note**: If you are following along, you will get a type error because `formVc` is 'private'. You can make it 'protected' in `MyCardViewController` to get around this.

> **Note**: Now you should get an error that your form is not rendering the expected fields. It's time to implement the fields in your form.

</details>


## View Controller Plugins

You can globally enhance View Controller functionality by using View Controller Plugins. Here are some plugins that are already available:

1. [AutoLogoutPlugin](https://www.npmjs.com/package/@sprucelabs/spruce-heartwood-utils): Automatically logs out a person after a certain period of inactivity. You can set the timeout in seconds and also disable it where desired.
2. [AdjustMmpVcPlugin](https://www.npmjs.com/package/@sprucelabs/spruce-mmp-vc-plugin): Used to communicate with the MMP (Mobile Measurement Partners) Adjust. Others like AppsFlyer may come later. It currently only works inside the Spruce native iOS app.

### Implementing a View Controller Plugin

<details>
<summary><strong>Test 1a:</strong> Assert the plugin is installed</summary>

```ts
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { AutoLogoutPlugin } from '@sprucelabs/spruce-heartwood-utils'

export default class AutoLoggingOutTest extends AbstractSpruceFixtureTest {

    @test()
    protected static async autoLogoutPluginInstalled() {
        vcPluginAssert.pluginIsInstalled(
            this.views.Controller('eightbitstories.root', {}),
            'autoLogout',
            AutoLogoutPlugin
        )
    }
}
```

> **Note**: If you are planning on using your own plugin (one that is not built yet), use it instead of `AutoLogoutPlugin` as if it exists and then begin with the productions steps below.

</details>

<details>
<summary><strong>Production 1:</strong> Install the plugin</summary>

1. Install the module that holds the plugin: `yarn add {packageName}`
2. Create the plugin: `spruce create.view.plugin`
3. Implement the plugin at `./src/viewPlugins/{pluginName}.ts`

Your plugin starts like this:

```ts
import { ViewControllerPlugin } from '@sprucelabs/heartwood-view-controllers'

export default class MyViewPlugin implements ViewControllerPlugin {
    ...
}
```

Now that plugin is created, you can import it into your test.

> **Note**: If you are using a prebuilt plugin, you would implement it like this:

```ts
export { AutoLogoutPlugin as default } from '@sprucelabs/spruce-heartwood-utils'
```

</details>

<details>
<summary><strong>Test Doubling Your Plugin</strong></summary>

You can drop in your test double using the `views` fixture on your `AbstractSpruceFixtureTest` . Here is how you may do that in your `beforeEach()`:

```ts
protected static async beforeEach() {
    await super.beforeEach()

    this.spy = new SpyPlugin()
    this.views.addPlugin('autoLogout', this.spy)
}
```

Now, in any View Controller you create, `this.plugins.autoLogout` will be the `SpyPlugin` instance.

```ts
class RootSkillView extends AbstractSkillViewController {
    public constructor(options: SkillViewControllerOptions) {
        super(options)
    }

    public async load() {
        this.plugins.autoLogout.doSomething()
    }
}
```

</details>

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>