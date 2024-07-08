# Views

`Views` are the building blocks of the front-end experience in Spruce. Every `Skill` can register `Skill Views` that are comprised of `CardViewControllers`. By default, the a skill's `RootSkillViewController` is the first view that is rendered.

<img style="margin:0 auto; display:block;" src="../../assets/img/diagrams/skill_view_with_cards.png">

A `CardViewController` has a `CardHeader`, `CardBody`, and `CardFooter`. The `CardBody` is comprised of many `CardSections`. See the diagrams below to understand how cards are constructed.

<img style="margin:0 auto; display:block;" src="../../assets/img/diagrams/skill_view_and_card.png">

Every other type of `ViewController` (listed below) is rendered inside a `CardSection`. This allows for a consistent look and feel across all views in the Spruce ecosystem.

## Important Classes

<details>

<summary><strong>AbstractCalendarEventViewController</strong> - The class that calendar events extend to customize how they render in the calendar.</summary>

Coming soon...

</details>

<details>

<summary><strong>AbstractSkillViewController</strong> - The class your Skill Views can extend to have access to helpful properties.</summary>

Coming soon...

</details>

<details>

<summary><strong>AbstractViewController</strong> - The class your views can extend to have access to helpful properties.</summary>

Coming soon...

</details>

<details>

<summary><strong>ActiveRecordCardViewController</strong> - A card that holds an `ActiveRecordList` to make loading, searching, and paging through database records a breeze.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--active-record-list)

</details>

<details>

<summary><strong>ActiveRecordListViewController</strong> - A list that makes loading, searching, and paging through database record a breeze.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--active-record-list)

</details>

<details>
<summary><strong>AutocompleteInputViewController</strong> - Turns a text input into an autocomplete input.</summary>

Coming soon...
</details>

<details>
<summary><strong>BigFormViewController</strong> - A form that renders one field at a time with customizable transitions between questions.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-big-form--big-form).
</details>

<details>
<summary><strong>ButtonBarViewController</strong> - A strip of buttons that supports selection and deselection.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-buttons--button-bar).
</details>

<details>
<summary><strong>ButtonGroupViewController</strong> - An array of buttons that supports selected and deselected states.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-buttons--single-select-group).
</details>

<details>
<summary><strong>CalendarViewController</strong> - A calendar that supports day and month views (more soon)!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-calendar--day-calendar).
</details>

<details>
<summary><strong>CalendarEventViewController</strong> - The view controller that renders for each event by detail!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-calendar--day-calendar).
</details>

<details>
<summary><strong>CardViewController</strong> - The building block of every Skill View!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-cards--cards).
</details>

<details>
<summary><strong>CountdownTimerViewController</strong> - A flipboard style countdown timer!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components--countdown).
</details>

<details>
<summary><strong>FeedViewController</strong> - A chat component for handling coversations!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-the-feed--the-feed).
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
</details>

<details>
<summary><strong>ListRowViewController</strong> - Rows that build a list.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).
</details>

<details>
<summary><strong>ListViewController</strong> - A List based on rows and cells.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).
</details>

<details>
<summary><strong>MapViewController</strong> - A customizable map with pin and navigation support.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-lists--with-controller).
</details>

<details>
<summary><strong>NavigationViewController</strong> - Customize the navigation. Currently render inside the ControlBar.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-nav--control-bar).
</details>

<details>
<summary><strong>PolarAreaViewController</strong> - A polar area chart.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-reporting--polar-area).
</details>

<details>
<summary><strong>ProgressNavigatorViewController</strong> - Renders at the top of the screen to track progress through any process.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components--progress-navigation).
</details>

<details>
<summary><strong>ProgressViewController</strong> - A progress indicator with an optional message.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-reporting--progress-as-grid-in-big-left).
</details>

<details>
<summary><strong>RatingsViewController</strong> - A ratings component to gauge sentiment or against a scale.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-form--customizable-ratings).
</details>

<details>
<summary><strong>SwipeViewController</strong> - A version of a card where sections are rendered as a swipe view.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-swipe--swipe).
</details>

<details>
<summary><strong>StatsViewController</strong> - Render numbers with labels with some nice animations.</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-swipe--swipe).
</details>

<details>
<summary><strong>TalkingSprucebotViewController</strong> - Sprucebot animation with typing text. Great for storytelling!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-talking-sprucebot--talking-sprucebot).
</details>

<details>
<summary><strong>ToolBeltViewController</strong> - Holds an extra set of cards that hide when not in use!</summary>

[Storybook](https://storybook.spruce.bot/?path=/story/components-tool-belt-tool-belt--tool-belt).
</details>

## Skill View Lifecycle

<img src="../../assets/img/diagrams/skill_view_lifecycle.png">

## Root Skill View

Coming soon...

## Rendering Skill Views

Skill Views are the equivalent of pages in a "standard" web application. They are accessible via the url in 2 ways.

1. Subdomain: `https://{skillNamespace}.spruce.bot`
2. Hash: `https://spruce.bot/#/views/{skillNamespace}.{viewId}`

### Root Skill View

Let's get started on rendering a `RootSkillView`.

<details>
<summary><strong>Test 1</strong>: Load Your (Root) Skill View</summary>

We'll start with the `RootSkillViewController`. All you have to do to start is try and load your Skill View and the test will fail.

```ts
@test()
protected static async canLoadRootSkillView() {
    this.views.Controller('eightbitstories.root', {}),
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



### Asserting Card by Id

Now that you have your `RootSkillViewController`, you can start adding cards to it. Here is how you can test and implement some cards.

<details>
<summary><strong>Test 1</strong>: Assert card is rendered</summary>

```ts
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'

...

@test()
protected static async rendersExpectedCard() {
    const vc = this.views.Controller('eightbitstories.root', {})
    vcAssert.assertSkillViewRendersCard(vc, 'my-card')
}
```

</details>

<details>
<summary><strong>Production 1</strong>: Render your card</summary>

Coming soon...

</details>

## Rendering Dialogs

Dialogs are cards rendered modally. You can render a basic `Card` `ViewModel` or you can render a `CardViewController` as a dialog.

### Rendering a simple `ViewModel` based `Dialog` on load

This is the simplest way to render a dialog. You can render a `Card` `ViewModel` by calling `this.renderInDialog(...)` from your `SkillViewController` or `ViewController`.

<details>
<summary><strong>Test 1</strong>: Assert dialog is rendered on load</summary>

For this example, we'll keep the dialog simple and render a `Card` `ViewModel` in the `RootSkillViewController`'s `load()` `Lifecycle` method.
```ts
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'

...

@test()
protected static async rendersAlertOnLoad() {
    const vc = this.views.Controller('eightbitstories.root', {})
    await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
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
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'

...

@test()
protected static async rendersAlertOnLoad() {
    const vc = this.views.Controller('eightbitstories.root', {})
    await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
}
```
</details>

<details>
<summary><strong>Production 1</strong>: Render a simple dialog on load</summary>

```ts
import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillView extends AbstractSkillViewController {
    public async load() {
        this.renderInDialog({})
    }
}
```
</details>

<details>
<summary><strong>Test 2</strong>: Assert dialog is a specific type</summary>

```ts
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'

...

@test()
protected static async rendersAlertOnLoad() {
    const vc = this.views.Controller('eightbitstories.root', {})
    const dlgVc = await vcAssert.assertRendersDialog(vc, () => this.views.load(vc))
    vcAssert.assertRendersAsInstanceOf(dlgVc, MyCardViewController)
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
import { CardViewController, AbstractViewController, Card } from '@sprucelabs/heartwood-view-controllers'

export default class MyCardViewController extends AbstractViewController<Card> {

    public static id = 'my-card'

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

```ts

import { AbstractSkillViewController } from '@sprucelabs/heartwood-view-controllers'

class RootSkillView extends AbstractSkillViewController {
    public async load() {
        const myCardVc = this.Controller('eightbitstories.my-card', {})
        this.renderInDialog(myCardVc.render())
    }
}
```
</details>

### Running code when a dialog is closed

Coming soon...

## View Controller Plugins

You can globally enhance View Controller functionality by using View Controller Plugins. Here are some plugins that are already available:

1. [AutoLogoutPlugin](https://www.npmjs.com/package/@sprucelabs/spruce-heartwood-utils): Automatically logs out a person after a certain period of inactivity. You can set the timeout in seconds and also disable it where desired.
2. [AdjustMmpVcPlugin](https://www.npmjs.com/package/@sprucelabs/spruce-mmp-vc-plugin): Used to communicate with the MMP (Mobile Measurement Partners) Adjust. Others like AppsFlyer may come later. It currently only works inside the Spruce native iOS app.

### Implementing a View Controller Plugin

<details>
<summary><strong>Test 1:</strong> Assert the plugin is installed</summary>

```ts
import {
    vcAssert,
    vcPluginAssert,
} from '@sprucelabs/heartwood-view-controllers'

import { AutoLogoutPlugin } from '@sprucelabs/spruce-heartwood-utils'

@test()
protected static async autoLogoutPluginInstalled() {
    vcPluginAssert.pluginIsInstalled(
        this.views.Controller('eightbitstories.root', {}),
        'autoLogout',
        AutoLogoutPlugin
    )
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
