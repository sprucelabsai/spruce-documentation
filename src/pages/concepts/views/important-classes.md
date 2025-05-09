
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