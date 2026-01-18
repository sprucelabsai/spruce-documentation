## Important Classes

All classes in this list are declared in `@sprucelabs/heartwood-view-controllers`.

> **Note**: Tables list only methods declared on the controller. Inherited public methods come from base classes.

### Base Controllers

<details>

<summary><strong>AbstractAppController</strong> - Base class for app-wide controllers that can share state and render lock screens.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `load(options: `[`AppControllerLoadOptions`](#interfaces-abstractappcontroller-appcontrollerloadoptions)`)` | `Promise<void>` | Loads data and prepares the controller. Called once when the app starts. |
| `renderNavigation()` | [`Navigation`](#interfaces-abstractappcontroller-navigation)` \| null \| undefined` | Optional. Returns navigation to render app-wide. |
| `renderToolBelt()` | [`ToolBelt`](#interfaces-abstractappcontroller-toolbelt)` \| null \| undefined` | Optional. Returns tool belt to render app-wide. |
| `protected renderLockScreen(options: `[`LockScreenOptions`](#interfaces-abstractappcontroller-lockscreenoptions)`)` | `LockScreenSkillViewController` | Renders a lock screen over the current view. |

### Interfaces

| Interface | Description |
|---|---|
| [`AppControllerLoadOptions`](#interfaces-abstractappcontroller-appcontrollerloadoptions) | Options passed to `load()` including router, authenticator, etc. |
| [`LockScreenOptions`](#interfaces-abstractappcontroller-lockscreenoptions) | Options for rendering a lock screen. |
| [`Navigation`](#interfaces-abstractappcontroller-navigation) | Navigation view model. |
| [`ToolBelt`](#interfaces-abstractappcontroller-toolbelt) | Tool belt view model. |

<a id="interfaces-abstractappcontroller-appcontrollerloadoptions"></a>
#### `AppControllerLoadOptions`
```ts
interface AppControllerLoadOptions {
    router: Router
    authenticator: Authenticator
    authorizer: Authorizer
    locale: Locale
    scope: Scope
    themes: ThemeManager
    dependencyLoader: DependencyLoader
}
```

<a id="interfaces-abstractappcontroller-lockscreenoptions"></a>
#### `LockScreenOptions`
```ts
interface LockScreenOptions {
    id?: string
    controller?: SkillViewController
    shouldCenterVertically?: boolean
    isFullScreen?: boolean
    title?: string
    subtitle?: string
    description?: string
    width?: 'wide' | 'tight' | 'full'
    layouts?: SkillViewLayout[]
}
```

<a id="interfaces-abstractappcontroller-navigation"></a>
#### `Navigation`
```ts
interface Navigation {
    controller?: ViewController<Navigation>
    isVisible?: boolean
    shouldRenderButtonLabels?: boolean
    buttons?: NavigationButton[]
}
```

<a id="interfaces-abstractappcontroller-toolbelt"></a>
#### `ToolBelt`
```ts
interface ToolBelt {
    controller?: ToolBeltViewController
    lineIcon?: LineIcon
    tools?: ToolBeltTool[]
}
```

### Testing
- Tools: [`navigationAssert`](#navigationassert).
- Examples: `src/__tests__/behavioral/app/UsingAppViewController.test.ts`.

</details>

<details>

<summary><strong>AbstractCalendarEventViewController</strong> - Base class for custom calendar event controllers.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setIsBusy(isBusy: boolean)` | `void` | Sets busy state on the event. |
| `getIsBusy()` | `boolean` | Returns whether the event is busy. |
| `getIsOrphaned()` | `boolean` | Returns whether the event no longer exists in the calendar. |
| `deselect()` | `void` | Called when the event is deselected. |
| `select()` | `void` | Called when the event is selected. |
| `mixinChanges(changes: Partial<`[`CalendarEvent`](#interfaces-abstractcalendareventviewcontroller-calendarevent)`>)` | `void` | Merges changes into the event. |
| `render()` | [`CalendarEvent`](#interfaces-abstractcalendareventviewcontroller-calendarevent) | Builds and returns the event view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`CalendarEvent`](#interfaces-abstractcalendareventviewcontroller-calendarevent) | Calendar event view model. |

<a id="interfaces-abstractcalendareventviewcontroller-calendarevent"></a>
#### `CalendarEvent`
```ts
interface CalendarEvent {
    id: string
    target: CalendarEventTarget
    calendarId: string
    eventTypeSlug?: string
    startDateTimeMs: number
    isBusy?: boolean
    isResizeable?: boolean
    style?: 'draft' | 'tentative' | 'upcoming' | 'unavailable' | 'blocked' | 'active' | 'past' | 'warn' | 'critical'
    groupId?: string
    timeBlocks: EventTimeBlock[]
    repeats?: 'weekly' | 'monthly' | 'daily'
    daysOfWeek?: ('sun' | 'mon' | 'tue' | 'wed' | 'thur' | 'fri' | 'sat')[]
    daysOfMonth?: string[]
    repeatsUntil?: number
    occurrences?: number
    interval?: number
    nthOccurrences?: number[]
    activeUntilDate?: number
    exclusionDates?: EventExclusionDate[]
    nthInRepeating?: number
    totalInRepeating?: number
    meta?: Record<string, any>
    venue?: Venue
    error?: Error
    isSelected?: boolean
    colors?: CalendarEventColorOverride
    controller?: CalendarEventViewController
}
```

### Testing
- Tools: `calendarInteractor`, `calendarSeeder`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/calendars/AssertingCalendars.test.ts`, `src/__tests__/behavioral/calendars/ControllingACalendar.test.ts`, `src/__tests__/behavioral/calendars/ControllingACalendarEvent.test.ts`.

</details>

<details>

<summary><strong>AbstractInputViewController</strong> - Base class for custom input controllers.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setHandlers(options: `[`FormInputHandlers`](#interfaces-abstractinputviewcontroller-forminputhandlers)`<Model>)` | `void` | Sets the handlers for getting/setting values and model. Called by the form. |
| `setValue(value: string \| null \| undefined, renderedValue?: string \| null)` | `Promise<void>` | Sets the input value and optionally the rendered value. |
| `setRenderedValue(renderedValue: any)` | `Promise<void>` | Sets the displayed value (may differ from stored value). |
| `getRenderedValue()` | `any` | Returns the currently displayed value. |
| `didFocus()` | `Promise<void \| undefined>` | Called when the input receives focus. |
| `didBlur()` | `Promise<void \| undefined>` | Called when the input loses focus. |
| `getValue()` | `any` | Returns the current stored value. |
| `render()` | `Model` | Builds and returns the input view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`FormInputHandlers`](#interfaces-abstractinputviewcontroller-forminputhandlers) | Handlers for value and model management. |
| [`FormInputOptions`](#interfaces-abstractinputviewcontroller-forminputoptions) | Base options for form inputs. |

<a id="interfaces-abstractinputviewcontroller-forminputhandlers"></a>
#### `FormInputHandlers`
```ts
interface FormInputHandlers<View> {
    getValue: () => any
    setValue: (value: any) => Promise<void>
    setModel: (model: View) => void
    getModel: () => View
}
```

<a id="interfaces-abstractinputviewcontroller-forminputoptions"></a>
#### `FormInputOptions`
```ts
interface FormInputOptions {
    id?: string
    renderedValue?: any
    label?: string
    hint?: string
    isRequired?: boolean
    isInteractive?: boolean
    onChange?: (value: any) => void | Promise<void | boolean> | boolean
    onChangeRenderedValue?: (value: any) => void | Promise<void | boolean> | boolean
    onFocus?: () => void | Promise<void>
    onBlur?: () => void | Promise<void>
    rightButtons?: InputButton[]
}
```

### Testing
- Tools: [`vcAssert`](#vcassert) and standard test utilities from `@sprucelabs/heartwood-view-controllers`.
- Examples: `src/__tests__/behavioral/forms/UpdatingFast.test.ts`.

</details>

<details>

<summary><strong>AbstractSkillViewController</strong> - Base class for Skill View controllers; `render()` returns a `SkillView`.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `load(options: `[`SkillViewControllerLoadOptions`](#interfaces-abstractskillviewcontroller-skillviewcontrollerloadoptions)`<Args>)` | `Promise<void>` | Called when the skill view loads. Override to fetch data, set up state, etc. |
| `focus()` | `Promise<void>` | Called when the skill view gains focus. |
| `blur()` | `Promise<void>` | Called when the skill view loses focus. |
| `getTitle()` | `string \| undefined` | Returns the skill view title. |
| `getSubtitle()` | `string \| undefined` | Returns the skill view subtitle. |
| `protected setTitle(title: string \| null \| undefined)` | `void` | Sets the skill view title. |
| `protected setSubtitle(subtitle: string \| null \| undefined)` | `void` | Sets the skill view subtitle. |
| `protected renderLockScreen(options: `[`LockScreenOptions`](#interfaces-abstractskillviewcontroller-lockscreenoptions)`)` | `LockScreenSkillViewController` | Renders a lock screen over the current view. |
| `abstract render()` | [`SkillView`](#interfaces-abstractskillviewcontroller-skillview) | Builds and returns the skill view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`SkillViewControllerLoadOptions`](#interfaces-abstractskillviewcontroller-skillviewcontrollerloadoptions) | Options passed to `load()`. |
| [`SkillView`](#interfaces-abstractskillviewcontroller-skillview) | Skill view model returned by `render()`. |
| [`LockScreenOptions`](#interfaces-abstractskillviewcontroller-lockscreenoptions) | Options for rendering a lock screen. |

<a id="interfaces-abstractskillviewcontroller-skillviewcontrollerloadoptions"></a>
#### `SkillViewControllerLoadOptions`
```ts
interface SkillViewControllerLoadOptions<Args = Record<string, any>> {
    router: Router
    args: Args
    authenticator: Authenticator
    authorizer: Authorizer
    locale: Locale
    scope: Scope
    themes: ThemeManager
    dependencyLoader: DependencyLoader
}
```

<a id="interfaces-abstractskillviewcontroller-skillview"></a>
#### `SkillView`
```ts
interface SkillView {
    id?: string
    controller?: SkillViewController
    shouldCenterVertically?: boolean
    isFullScreen?: boolean
    title?: string
    subtitle?: string
    description?: string
    width?: 'wide' | 'tight' | 'full'
    layouts?: SkillViewLayout[]
}
```

<a id="interfaces-abstractskillviewcontroller-lockscreenoptions"></a>
#### `LockScreenOptions`
```ts
interface LockScreenOptions {
    id?: string
    controller?: SkillViewController
    shouldCenterVertically?: boolean
    isFullScreen?: boolean
    title?: string
    subtitle?: string
    description?: string
    width?: 'wide' | 'tight' | 'full'
    layouts?: SkillViewLayout[]
}
```

### Testing
- Tools: [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/skillViews/ControllingSkillViews.test.ts`.

</details>

<details>

<summary><strong>AbstractViewController</strong> - Base class for most view controllers, providing lifecycle, rendering, and helpers.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `triggerRender()` | `void` | Triggers a re-render of this view controller. |
| `setTriggerRenderHandler(handler: `[`TriggerRenderHandler`](#interfaces-abstractviewcontroller-triggerrenderhandler)`)` | `void` | Sets the callback invoked when `triggerRender()` is called. |
| `renderOnce(cb: () => any \| Promise<any>)` | `Promise<void>` | Suspends rendering, executes callback, then triggers a single render. |
| `renderOnceSync(cb: () => any)` | `void` | Synchronous version of `renderOnce`. |
| `Controller<N>(name: N, options: ControllerOptions<N>)` | `ViewControllerMap[N]` | Creates a child view controller. |
| `destroy()` | `Promise<void>` | Destroys this controller and all its children. |
| `protected confirm(options: `[`ConfirmOptions`](#interfaces-abstractviewcontroller-confirmoptions)`)` | `Promise<boolean>` | Shows a confirmation dialog. Returns true if accepted. |
| `protected renderInDialog(dialog: `[`DialogOptions`](#interfaces-abstractviewcontroller-dialogoptions)`)` | `DialogViewController` | Renders a dialog. |
| `protected hideDialog()` | `Promise<void>` | Hides the currently active dialog. |
| `protected toast(options: `[`ToastMessage`](#interfaces-abstractviewcontroller-toastmessage)`)` | `void` | Shows a toast notification. |
| `protected alert(options: `[`AlertOptions`](#interfaces-abstractviewcontroller-alertoptions)`)` | `Promise<void>` | Shows an alert dialog. |
| `abstract render()` | `ViewModel` | Builds and returns the view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`TriggerRenderHandler`](#interfaces-abstractviewcontroller-triggerrenderhandler) | Callback type for render triggers. |
| [`ConfirmOptions`](#interfaces-abstractviewcontroller-confirmoptions) | Options for confirmation dialogs. |
| [`ToastMessage`](#interfaces-abstractviewcontroller-toastmessage) | Toast notification options. |
| [`AlertOptions`](#interfaces-abstractviewcontroller-alertoptions) | Alert dialog options. |
| [`DialogOptions`](#interfaces-abstractviewcontroller-dialogoptions) | Dialog rendering options. |

<a id="interfaces-abstractviewcontroller-triggerrenderhandler"></a>
#### `TriggerRenderHandler`
```ts
type TriggerRenderHandler = () => void
```

<a id="interfaces-abstractviewcontroller-confirmoptions"></a>
#### `ConfirmOptions`
```ts
interface ConfirmOptions {
    title?: string
    subtitle?: string
    message?: string
    isDestructive?: boolean
    body?: CardBody
}
```

<a id="interfaces-abstractviewcontroller-toastmessage"></a>
#### `ToastMessage`
```ts
interface ToastMessage {
    headline: string
    text?: string
    style?: 'info' | 'success' | 'error'
}
```

<a id="interfaces-abstractviewcontroller-alertoptions"></a>
#### `AlertOptions`
```ts
interface AlertOptions {
    title?: string
    message: string
    style?: 'error' | 'success' | 'info'
    okButtonLabel?: string
}
```

<a id="interfaces-abstractviewcontroller-dialogoptions"></a>
#### `DialogOptions`
```ts
interface DialogOptions {
    header?: CardHeader
    body?: CardBody
    footer?: CardFooter
    shouldShowCloseButton?: boolean
    isVisible?: boolean
    onClose?: () => void | Promise<void>
}
```

### Testing
- Tools: `MockToastMessageHandler`, [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`toastAssert`](#toastassert), [`vcAssert`](#vcassert), [`vcDurationAssert`](#vcdurationassert).
- Examples: `src/__tests__/behavioral/BuildingViewControllers.test.ts`, `src/__tests__/behavioral/LoggingInAView.test.ts`, `src/__tests__/behavioral/assertions/AssertingDurationUtil.test.ts`.

</details>

### Skill View Controllers

<details>

<summary><strong>LockScreenSkillViewController</strong> - Built-in Skill View controller for lock screens.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setHideHandler(hideHandler: `[`HideDialogHandler`](#interfaces-lockscreenskillviewcontroller-hidedialoghandler)`)` | `void` | Sets the callback invoked when the lock screen is hidden. |
| `hide()` | `Promise<void>` | Hides the lock screen. |
| `getSkillViewVc()` | `SkillViewController \| undefined` | Returns the skill view controller rendered inside the lock screen. |
| `getIsVisible()` | `boolean` | Returns whether the lock screen is currently visible. |
| `render()` | [`LockScreen`](#interfaces-lockscreenskillviewcontroller-lockscreen) | Builds and returns the lock screen view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`LockScreen`](#interfaces-lockscreenskillviewcontroller-lockscreen) | Lock screen view model. |
| [`HideDialogHandler`](#interfaces-lockscreenskillviewcontroller-hidedialoghandler) | Callback type for hide handler. |

<a id="interfaces-lockscreenskillviewcontroller-lockscreen"></a>
#### `LockScreen`
```ts
interface LockScreen {
    id?: string
    controller?: ViewController<LockScreen>
    shouldCenterVertically?: boolean
    isFullScreen?: boolean
    title?: string
    subtitle?: string
    description?: string
    width?: 'wide' | 'tight' | 'full'
    layouts?: SkillViewLayout[]
    skillViewController?: SkillViewController
}
```

<a id="interfaces-lockscreenskillviewcontroller-hidedialoghandler"></a>
#### `HideDialogHandler`
```ts
type HideDialogHandler = () => Promise<void> | void
```

### Testing
- Tools: [`lockScreenAssert`](#lockscreenassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/lockScreens/AssertLockScreens.test.ts`, `src/__tests__/behavioral/lockScreens/LockingTheScreen.test.ts`.

</details>

### Cards and Dialogs

<details>

<summary><strong>CardViewController</strong> - Core card building block (header/body/footer/sections).</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setFooter(footer: `[`CardFooter`](#interfaces-cardviewcontroller-cardfooter)` \| undefined)` | `void` | Sets footer. |
| `getHasCriticalError()` | `boolean` | Checks whether it has critical error. |
| `setCriticalError(criticalError: `[`CriticalError`](#interfaces-cardviewcontroller-criticalerror)`)` | `void` | Sets critical error. |
| `clearCriticalError()` | `void` | Clears critical error. |
| `getSectionVc(section: string \| number)` | [`ViewController`](#interfaces-cardviewcontroller-viewcontroller)`<`[`CardSection`](#interfaces-cardviewcontroller-cardsection)`>` | Gets section vc. |
| `setHeaderTitle(title: string \| null)` | `void` | Sets header title. |
| `setHeaderSubtitle(subtitle: string \| null)` | `void` | Sets header subtitle. |
| `getHeaderTitle()` | `string \| undefined` | Gets header title. |
| `getHeader()` | [`CardHeader`](#interfaces-cardviewcontroller-cardheader)` \| null \| undefined` | Gets header. |
| `getFooter()` | [`CardFooter`](#interfaces-cardviewcontroller-cardfooter)` \| null \| undefined` | Gets footer. |
| `getFooterLayout()` | [`CardFooterLayout`](#interfaces-cardviewcontroller-cardfooterlayout)` \| null \| undefined` | Gets footer layout. |
| `getHeaderSubtitle()` | `string \| undefined` | Gets header subtitle. |
| `setHeaderImage(image: string \| null)` | `void` | Sets header image. |
| `setBackgroundImage(image: string \| null)` | `void` | Sets background image. |
| `getSection(idOrIdx: number \| string)` | [`CardSection`](#interfaces-cardviewcontroller-cardsection) | Gets section. |
| `updateSection(idOrIdx: number \| string, updates: Partial<`[`CardSection`](#interfaces-cardviewcontroller-cardsection)`>)` | `void` | Handles update section. |
| `setSection(idOrIdx: number \| string, section: `[`CardSection`](#interfaces-cardviewcontroller-cardsection)`)` | `void` | Sets section. |
| `setSections(sections: `[`CardSection`](#interfaces-cardviewcontroller-cardsection)`[])` | `void` | Sets sections. |
| `addSection(section: `[`CardSection`](#interfaces-cardviewcontroller-cardsection)`)` | `void` | Adds section. |
| `getSections()` | [`CardSection`](#interfaces-cardviewcontroller-cardsection)`[] \| null \| undefined` | Gets sections. |
| `removeSection(idOrIdx: number \| string)` | `void` | Removes section. |
| `addSectionAtIndex(idx: number, section: `[`CardSection`](#interfaces-cardviewcontroller-cardsection)`)` | `void` | Adds section at index. |
| `getTotalSections()` | `number` | Gets total sections. |
| `isBusy()` | `boolean` | Checks if busy. |
| `getIsFooterEnabled()` | `boolean` | Checks whether footer enabled. |
| `getIsFooterBusy()` | `boolean` | Checks whether footer busy. |
| `disableFooter()` | `void` | Disables footer. |
| `enableFooter()` | `void` | Enables footer. |
| `setIsBusy(isBusy: boolean)` | `void` | Sets busy state. |
| `setFooterIsBusy(isBusy: boolean)` | `void` | Sets footer is busy. |
| `setBody(body: `[`CardBody`](#interfaces-cardviewcontroller-cardbody)` \| null \| undefined)` | `void` | Sets body. |
| `getBody()` | [`CardBody`](#interfaces-cardviewcontroller-cardbody)` \| null \| undefined` | Gets body. |
| `payAttentionToMe()` | `void` | Handles pay attention to me. |
| `setHeader(header: `[`CardHeader`](#interfaces-cardviewcontroller-cardheader)` \| null \| undefined)` | `void` | Sets header. |
| `setFooterLayout(layout: `[`CardFooterLayout`](#interfaces-cardviewcontroller-cardfooterlayout)`)` | `void` | Sets footer layout. |
| `render()` | [`Card`](#interfaces-cardviewcontroller-card) | Builds and returns the ViewModel. |

### Interfaces

| Interface | Description |
|---|---|
| [`Card`](#interfaces-cardviewcontroller-card) | Card view model. |
| [`CardBody`](#interfaces-cardviewcontroller-cardbody) | Card body containing sections and busy state. |
| [`CardFooter`](#interfaces-cardviewcontroller-cardfooter) | Card footer with buttons and layout. |
| [`CardFooterLayout`](#interfaces-cardviewcontroller-cardfooterlayout) | Footer layout style. |
| [`CardHeader`](#interfaces-cardviewcontroller-cardheader) | Card header with title, subtitle, and image. |
| [`CardSection`](#interfaces-cardviewcontroller-cardsection) | Card section within the body. |
| [`CriticalError`](#interfaces-cardviewcontroller-criticalerror) | Critical error display configuration. |
| [`ViewController`](#interfaces-cardviewcontroller-viewcontroller) | Base view controller interface. |

<a id="interfaces-cardviewcontroller-card"></a>
#### `Card`
```ts
interface Card {
    id?: string
    className?: string
    controller?: CardViewController
    header?: CardHeader
    criticalError?: CriticalError
    shouldFadeIn?: boolean
    style?: 'standard' | 'informational' | 'visual' | 'heading'
    backgroundImage?: string
    backgroundImageSize?: 'cover' | 'contain'
    onClick?: () => Promise<any> | any
    body?: CardBody
    footer?: CardFooter
}
```

<a id="interfaces-cardviewcontroller-cardbody"></a>
#### `CardBody`
```ts
interface CardBody {
    shouldShowSectionSeparators?: boolean
    isBusy?: boolean
    swipeController?: (controller: SwipeController) => void
    shouldEnableSectionSwiping?: boolean
    shouldRenderSwipePagination?: boolean
    shouldSwipeBreakIntoCardsOnLandscape?: boolean
    onSelectSlideTitle?: (id: number) => void
    onChangeSlide?: (slide: number) => void
    shouldRenderSectionsAsGrid?: boolean
    sections?: CardSection[]
}
```

<a id="interfaces-cardviewcontroller-cardfooter"></a>
#### `CardFooter`
```ts
interface CardFooter {
    controller?: ViewController<CardFooter>
    buttons?: CardFooterButton[]
    isBusy?: boolean
    isSticky?: boolean
    isEnabled?: boolean
    pager?: Pager
    shouldRenderBorder?: boolean
    hAlignment?: 'left' | 'center' | 'right'
    layout?: 'vertical' | 'horizontal'
}
```

<a id="interfaces-cardviewcontroller-cardfooterlayout"></a>
#### `CardFooterLayout`
```ts
type CardFooterLayout = 'vertical' | 'horizontal'
```

<a id="interfaces-cardviewcontroller-cardheader"></a>
#### `CardHeader`
```ts
interface CardHeader {
    title?: string
    subtitle?: string
    altTitle?: string
    controller?: ViewController<CardHeader>
    icon?: FancyIcon
    image?: string
    imageSize?: 'cover' | 'contain'
    form?: Form
    closeHandler?: () => Promise<void> | void
}
```

<a id="interfaces-cardviewcontroller-cardsection"></a>
#### `CardSection`
```ts
interface CardSection {
    id?: string
    title?: string
    isComplete?: boolean
    controller?: ViewController<CardSection>
    shouldBePadded?: boolean
    shouldContentBeCentered?: boolean
    text?: Text
    image?: string
    video?: Video
    avatar?: string
    form?: Form
    talkingSprucebot?: TalkingSprucebot
    bigForm?: BigForm
    map?: Map
    buttons?: Button[]
    buttonBar?: ButtonBar
    list?: List
    calendar?: Calendar
    stats?: Stats
    countdownTimer?: CountdownTimer
    progress?: Progress
    ratings?: Ratings
    receipt?: Receipt
    polarArea?: PolarArea
    feed?: Feed
    pager?: Pager
    barChart?: BarChart
    lineGraph?: LineGraph
    shouldRenderContentsAsGrid?: boolean
    gridSize?: 'small' | 'medium' | 'large'
    portal?: Portal
    webRtcPlayer?: WebRtcPlayer
    alignment?: 'left' | 'center' | 'right'
    style?: 'standard' | 'primary' | 'secondary'
    layout?: 'vertical' | 'horizontal'
}
```

<a id="interfaces-cardviewcontroller-criticalerror"></a>
#### `CriticalError`
```ts
interface CriticalError {
    title?: string
    message?: string
    buttons?: Button[]
}
```

<a id="interfaces-cardviewcontroller-viewcontroller"></a>
#### `ViewController`
```ts
interface ViewController<ViewModel extends Record<string, any>> {
    render(): ViewModel
    setTriggerRenderHandler: (handler: TriggerRenderHandler) => void
    triggerRender: TriggerRender
    destroy?: () => Promise<void> | void
    willBlur?: () => void | Promise<void>
    didBlur?: () => void | Promise<void>
    willFocus?: () => void | Promise<void>
    didFocus?: () => void | Promise<void>
    didHide?: () => void | Promise<void>
}
```

### Testing
- Tools: `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/cards/AssertingAndInteractingWithCriticalErrors.test.ts`, `src/__tests__/behavioral/cards/AssertingCardFooters.test.ts`, `src/__tests__/behavioral/cards/AssertingCardSectionRendersButton.test.ts`.

</details>

<details>

<summary><strong>ConfirmViewController</strong> - Opinionated confirm/cancel dialog.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `handleDecline()` | `void` | Invokes the decline handler. Called when user clicks "No". |
| `handleAccept()` | `void` | Invokes the accept handler. Called when user clicks "Yes". |
| `hide()` | `Promise<void>` | Hides the confirmation dialog. |
| `render()` | [`Dialog`](#interfaces-confirmviewcontroller-dialog) | Builds and returns the dialog view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`ConfirmViewControllerOptions`](#interfaces-confirmviewcontroller-confirmviewcontrolleroptions) | Options for creating a confirm dialog. |
| [`Dialog`](#interfaces-confirmviewcontroller-dialog) | Dialog view model. |

<a id="interfaces-confirmviewcontroller-confirmviewcontrolleroptions"></a>
#### `ConfirmViewControllerOptions`
```ts
interface ConfirmViewControllerOptions {
    title?: string
    subtitle?: string
    message?: string
    isDestructive?: boolean
    body?: CardBody
    onAccept: () => void
    onDecline: () => void
}
```

<a id="interfaces-confirmviewcontroller-dialog"></a>
#### `Dialog`
```ts
interface Dialog {
    id?: string
    controller?: ViewController<Dialog>
    header?: CardHeader
    body?: CardBody
    footer?: CardFooter
    shouldShowCloseButton?: boolean
    isVisible?: boolean
    cardController?: CardViewController
    onClose?: () => void | Promise<void>
}
```

### Testing
- Tools: `confirmTestPatcher`, `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/confirms/AssertingConfirms.test.ts`, `src/__tests__/behavioral/confirms/ConfirmingAnAction.test.ts`, `src/__tests__/behavioral/confirms/ControllingAConfirmationDialog.test.ts`.

</details>

<details>

<summary><strong>DialogViewController</strong> - Renders a card as a modal dialog.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `show()` | `void` | Shows the dialog. |
| `getIsVisible()` | `boolean` | Returns whether the dialog is visible. |
| `getShouldShowCloseButton()` | `boolean` | Returns whether the close button should be shown. |
| `hide()` | `Promise<void>` | Hides the dialog. Calls `onClose` handler if set. |
| `getCardVc()` | `ViewController<Card>` | Returns the card view controller inside the dialog. |
| `setIsBusy(isBusy: boolean)` | `void` | Sets the busy state on the card. |
| `wait()` | `Promise<void>` | Returns a promise that resolves when the dialog is hidden. |
| `render()` | [`DialogOptions`](#interfaces-dialogviewcontroller-dialogoptions) | Builds and returns the dialog view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`DialogViewControllerOptions`](#interfaces-dialogviewcontroller-dialogviewcontrolleroptions) | Options for creating a dialog. |
| [`DialogOptions`](#interfaces-dialogviewcontroller-dialogoptions) | Dialog view model (extends Card and Dialog). |

<a id="interfaces-dialogviewcontroller-dialogviewcontrolleroptions"></a>
#### `DialogViewControllerOptions`
```ts
interface DialogViewControllerOptions {
    id?: string
    controller?: ViewController<Card>
    header?: CardHeader
    body?: CardBody
    footer?: CardFooter
    shouldShowCloseButton?: boolean
    isVisible?: boolean
    width?: 'wide' | 'tight' | 'full'
    onClose?: () => void | Promise<void | boolean>
}
```

<a id="interfaces-dialogviewcontroller-dialogoptions"></a>
#### `DialogOptions`
```ts
interface DialogOptions {
    id?: string
    controller?: ViewController<Dialog>
    header?: CardHeader
    body?: CardBody
    footer?: CardFooter
    shouldShowCloseButton?: boolean
    isVisible?: boolean
    width?: 'wide' | 'tight' | 'full'
    cardController?: ViewController<Card>
    closeHandler?: () => void | Promise<void>
    onClose?: () => void | Promise<void | boolean>
}
```

### Testing
- Tools: `dialogTestPatcher`, `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/dialogs/AssertingDialogs.test.ts`, `src/__tests__/behavioral/dialogs/InteractingWithDialogs.test.ts`, `src/__tests__/behavioral/dialogs/RenderingInADialog.test.ts`.

</details>

<details>

<summary><strong>LoginCardViewController</strong> - Built-in login flow rendered as a card.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getIsBusy()` | `boolean` | Returns whether the login form is busy. |
| `getLoginForm()` | `BigFormViewController<LoginSchema>` | Returns the big form controller for the login flow. |
| `render()` | [`Card`](#interfaces-logincardviewcontroller-card) | Builds and returns the card view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`LoginCardViewControllerOptions`](#interfaces-logincardviewcontroller-logincardviewcontrolleroptions) | Options for creating a login card. |
| [`LoginHandler`](#interfaces-logincardviewcontroller-loginhandler) | Callback when login succeeds. |
| [`OnLoginOptions`](#interfaces-logincardviewcontroller-onloginoptions) | Options passed to the login handler. |

<a id="interfaces-logincardviewcontroller-logincardviewcontrolleroptions"></a>
#### `LoginCardViewControllerOptions`
```ts
interface LoginCardViewControllerOptions {
    onLogin?: LoginHandler
    onLoginFailed?: (err: Error) => void
    id?: string | null
    smsDisclaimer?: string | null
    shouldAllowEmailLogin?: boolean
    shouldAllowPhoneLogin?: boolean
    shouldRequireCheckboxForSmsOptIn?: boolean
}
```

<a id="interfaces-logincardviewcontroller-loginhandler"></a>
#### `LoginHandler`
```ts
type LoginHandler = (options: OnLoginOptions) => Promise<void> | void
```

<a id="interfaces-logincardviewcontroller-onloginoptions"></a>
#### `OnLoginOptions`
```ts
interface OnLoginOptions {
    person: Person
}
```

<a id="interfaces-logincardviewcontroller-card"></a>
#### `Card`
See [CardViewController](#interfaces-cardviewcontroller-card) for the Card interface.

### Testing
- Tools: [`buttonAssert`](#buttonassert), [`formAssert`](#formassert), `interactor`.
- Examples: `src/__tests__/behavioral/loggingIn/LoggingInAsPerson.test.ts`.

</details>

<details>

<summary><strong>SwipeCardViewController</strong> - Swipeable card deck controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `jumpToSlide(slide: number \| string)` | `Promise<void>` | Jumps to the specified slide by index or id. |
| `getPresentSlide()` | `number` | Returns the current slide index. |
| `getPresentSlideId()` | `string \| null \| undefined` | Returns the current slide id. |
| `setSlide(idOrIdx: number \| string, slide: Partial<`[`Slide`](#interfaces-swipecardviewcontroller-slide)`>)` | `void` | Replaces a slide at the given index or id. |
| `updateSlide(idOrIdx: number \| string, updates: Partial<`[`Slide`](#interfaces-swipecardviewcontroller-slide)`>)` | `void` | Partially updates a slide. |
| `markSlideAsComplete(slideIdx: number)` | `void` | Marks a slide as complete. |
| `getSlides()` | [`Slide`](#interfaces-swipecardviewcontroller-slide)`[] \| null \| undefined` | Returns all slides. |
| `removeSlide(idOrIdx: number \| string)` | `void` | Removes a slide. |
| `addSlideAtIndex(idx: number, slide: `[`Slide`](#interfaces-swipecardviewcontroller-slide)`)` | `void` | Inserts a slide at the given index. |
| `addSlide(slide: `[`Slide`](#interfaces-swipecardviewcontroller-slide)`)` | `void` | Appends a slide. |
| `getSlide(idOrIdx: number \| string)` | [`Slide`](#interfaces-swipecardviewcontroller-slide) | Returns a slide by index or id. |
| `setFooter(footer: `[`CardFooter`](#interfaces-cardviewcontroller-cardfooter)` \| null \| undefined)` | `void` | Sets the card footer. |
| `setShouldRenderNull(shouldRenderNull: boolean)` | `void` | Temporarily hides the card content. |
| `getTotalSlides()` | `number` | Returns the total number of slides. |
| `render()` | [`Card`](#interfaces-cardviewcontroller-card) | Builds and returns the card view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`SwipeViewControllerOptions`](#interfaces-swipecardviewcontroller-swipeviewcontrolleroptions) | Options for creating a swipe card. |
| [`Slide`](#interfaces-swipecardviewcontroller-slide) | Slide (alias for CardSection). |

<a id="interfaces-swipecardviewcontroller-swipeviewcontrolleroptions"></a>
#### `SwipeViewControllerOptions`
```ts
interface SwipeViewControllerOptions {
    slides: Slide[]
    shouldBreakIntoCardsOnLandscape?: boolean
    onSlideChange?: (slide: number) => void
    isBusy?: boolean
    header?: CardHeader
    footer?: CardFooter
    id?: string
}
```

<a id="interfaces-swipecardviewcontroller-slide"></a>
#### `Slide`
```ts
type Slide = CardSection
```
See [CardSection](#interfaces-cardviewcontroller-cardsection) for the full interface.

### Testing
- Tools: [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/swipes/AssertingSwipeViews.test.ts`, `src/__tests__/behavioral/swipes/ControllingASwipeView.test.ts`.

</details>

### Forms and Inputs

<details>

<summary><strong>AutocompleteInputViewController</strong> - Autocomplete text input controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `hideSuggestions()` | `void` | Hides the suggestions dropdown. |
| `showSuggestions(suggestions: `[`AutocompleteSuggestion`](#interfaces-autocompleteinputviewcontroller-autocompletesuggestion)`[])` | `void` | Shows suggestions in a dropdown. |
| `getRenderedValue()` | `string` | Returns the currently displayed value. |
| `getIsShowingSuggestions()` | `boolean` | Returns whether suggestions are visible. |
| `render()` | [`AutocompleteInput`](#interfaces-autocompleteinputviewcontroller-autocompleteinput) | Builds and returns the input view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`AutocompleteInput`](#interfaces-autocompleteinputviewcontroller-autocompleteinput) | Autocomplete input view model. |
| [`AutocompleteSuggestion`](#interfaces-autocompleteinputviewcontroller-autocompletesuggestion) | A suggestion item. |

<a id="interfaces-autocompleteinputviewcontroller-autocompleteinput"></a>
#### `AutocompleteInput`
```ts
interface AutocompleteInput {
    id?: string
    value?: string
    renderedValue?: any
    label?: string
    hint?: string
    isRequired?: boolean
    isInteractive?: boolean
    onChange?: (value: any) => void | Promise<void | boolean> | boolean
    onChangeRenderedValue?: (value: any) => void | Promise<void | boolean> | boolean
    onFocus?: () => void | Promise<void>
    onBlur?: () => void | Promise<void>
    rightButtons?: InputButton[]
    placeholder?: string
    controller?: AutocompleteInputViewController
    suggestions?: AutocompleteSuggestion[]
}
```

<a id="interfaces-autocompleteinputviewcontroller-autocompletesuggestion"></a>
#### `AutocompleteSuggestion`
```ts
interface AutocompleteSuggestion {
    id: string
    label: string
    onClick?: (id: string) => void | Promise<void>
}
```

### Testing
- Tools: [`autocompleteAssert`](#autocompleteassert), `autocompleteInteractor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/autocompletes/ControllingAndTestingAnAutocompleteInput.test.ts`.

</details>

<details>

<summary><strong>BigFormViewController</strong> - One-question-at-a-time form controller.</summary>

Extends `FormViewController` with slide-based navigation for step-by-step forms.

### API

| Method | Returns | Description |
|---|---|---|
| `setShouldRenderSlideTitles(shouldRender: boolean)` | `void` | Sets whether to render slide titles. |
| `isSlideValid(idx: number)` | `boolean` | Returns whether the slide at the given index is valid. |
| `setOnSubmit(cb: SubmitHandler<S>)` | `void` | Sets the final submit handler. |
| `setOnSubmitSlide(cb: SubmitSlideHandler<S>)` | `void` | Sets the per-slide submit handler. |
| `getPresentSlide()` | `number` | Returns the current slide index. |
| `jumpToSlide(idx: number)` | `Promise<void>` | Jumps to the specified slide. |
| `getTotalSlides()` | `number` | Returns the total number of slides. |
| `replaySlideHeading(idx: number)` | `void` | Replays the slide heading animation. |
| `goForward()` | `Promise<void>` | Advances to the next slide. |
| `goBack()` | `Promise<void>` | Goes back to the previous slide. |
| `submit()` | `Promise<void>` | Submits the current slide. Advances if valid, shows errors otherwise. |
| `getIsLastSlide()` | `boolean` | Returns whether on the last slide. |
| `isPresentSlideValid()` | `boolean` | Returns whether the current slide is valid. |
| `setShouldRenderFirstFieldsLabel(should: boolean)` | `void` | Sets whether to render the label for the first field. |
| `render()` | [`BigForm`](#interfaces-bigformviewcontroller-bigform)`<S>` | Builds and returns the form view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`BigFormViewControllerOptions`](#interfaces-bigformviewcontroller-bigformviewcontrolleroptions) | Options for creating a big form. |
| [`BigForm`](#interfaces-bigformviewcontroller-bigform) | Big form view model. |
| [`BigFormOnSubmitOptions`](#interfaces-bigformviewcontroller-bigformonsubmitoptions) | Options passed to submit handlers. |

<a id="interfaces-bigformviewcontroller-bigformviewcontrolleroptions"></a>
#### `BigFormViewControllerOptions`
```ts
interface BigFormViewControllerOptions<S extends Schema> {
    id: string
    schema: S
    sections: BigFormSection<S>[]
    values?: SchemaPartialValues<S>
    onSubmit?: SubmitHandler<S>
    onSubmitSlide?: SubmitSlideHandler<S>
    onSlideChange?: BigFormSlideChangeHandler
    onChange?: (options: FormOnChangeOptions<S>) => void | Promise<void>
    shouldRenderFirstFieldsLabel?: boolean
    shouldRenderSlideTitles?: boolean
    sprucebotAvatar?: SprucebotAvatar
    footer?: CardFooter
    isBusy?: boolean
}
```

<a id="interfaces-bigformviewcontroller-bigform"></a>
#### `BigForm`
```ts
interface BigForm<S extends Schema> {
    id: string
    controller?: BigFormViewController<S>
    schema: S
    sections: BigFormSection<S>[]
    values?: SchemaPartialValues<S>
    presentSlide?: number
    onSubmit?: SubmitHandler<S>
    onSubmitSlide?: SubmitSlideHandler<S>
    onSlideChange?: BigFormSlideChangeHandler
    onChange?: (options: FormOnChangeOptions<S>) => void | Promise<void>
    shouldRenderSlideTitles?: boolean
    shouldRenderFirstFieldsLabel?: boolean
    sprucebotAvatar?: SprucebotAvatar
    talkingSprucebot?: TalkingSprucebot
    footer?: CardFooter
    isBusy?: boolean
    isEnabled?: boolean
    errorsByField?: FormErrorsByField<S>
}
```

<a id="interfaces-bigformviewcontroller-bigformonsubmitoptions"></a>
#### `BigFormOnSubmitOptions`
```ts
interface BigFormOnSubmitOptions<S extends Schema> {
    values: SchemaPartialValues<S>
    errorsByField: FormErrorsByField<S>
    isValid: boolean
    presentSlide: number
    controller: BigFormViewController<S>
}
```

### Testing
- Tools: [`formAssert`](#formassert), `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/forms/AddingRemovingFormSections.test.ts`, `src/__tests__/behavioral/forms/AssertingForms.test.ts`, `src/__tests__/behavioral/forms/ControllingABigForm.test.ts`.

</details>

<details>

<summary><strong>ButtonBarViewController</strong> - Horizontal button bar controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getButtonGroupVc()` | `ButtonGroupViewController` | Returns the underlying button group controller. |
| `setSelectedButtons(ids: string[])` | `Promise<void>` | Sets which buttons are selected by id. |
| `getSelectedButtons()` | `string[]` | Returns the ids of selected buttons. |
| `selectButton(id: string)` | `Promise<void>` | Selects a button by id. |
| `setButtons(buttons: `[`ButtonBarButton`](#interfaces-buttonbarviewcontroller-buttonbarbutton)`[])` | `void` | Replaces all buttons. |
| `deselectButton(id: string)` | `Promise<void>` | Deselects a button by id. |
| `render()` | [`ButtonBar`](#interfaces-buttonbarviewcontroller-buttonbar) | Builds and returns the button bar view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`ButtonBar`](#interfaces-buttonbarviewcontroller-buttonbar) | Button bar view model. |
| [`ButtonBarButton`](#interfaces-buttonbarviewcontroller-buttonbarbutton) | A button in the bar. |

<a id="interfaces-buttonbarviewcontroller-buttonbar"></a>
#### `ButtonBar`
```ts
interface ButtonBar {
    controller?: ButtonBarViewController
    buttons: ButtonBarButton[]
}
```

<a id="interfaces-buttonbarviewcontroller-buttonbarbutton"></a>
#### `ButtonBarButton`
```ts
interface ButtonBarButton {
    id: string
    label?: string
    controller?: ButtonController
    isSelected?: boolean
    isEnabled?: boolean
    shouldQueueShow?: boolean
    shouldShowHintIcon?: boolean
    hint?: Text
    type?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
    image?: string
    avatar?: string
    lineIcon?: LineIcon
    selectedLineIcon?: LineIcon
}
```

### Testing
- Tools: [`buttonAssert`](#buttonassert), `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/buttons/AssertingButtonBars.test.ts`, `src/__tests__/behavioral/buttons/AssertingButtonBarsInCards.test.ts`, `src/__tests__/behavioral/buttons/AssertingButtons.test.ts`.

</details>

<details>

<summary><strong>ButtonGroupViewController</strong> - Selectable button group controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `triggerRender()` | `void` | Triggers a render of all buttons. |
| `getIsMultiSelect()` | `boolean` | Returns whether multi-select is enabled. |
| `setSelectedButtons(ids: string[])` | `Promise<void>` | Sets which buttons are selected by id. |
| `setButtons(buttons: `[`ButtonGroupButton`](#interfaces-buttongroupviewcontroller-buttongroupbutton)`[])` | `void` | Replaces all buttons. |
| `selectButton(id: string)` | `Promise<void>` | Adds a button to the selection. |
| `deselectButton(id: string)` | `Promise<void>` | Removes a button from the selection. |
| `getSelectedButtons()` | `string[]` | Returns the ids of selected buttons. |
| `render()` | `Button[]` | Builds and returns the button view models. |

### Interfaces

| Interface | Description |
|---|---|
| [`ButtonGroupViewControllerOptions`](#interfaces-buttongroupviewcontroller-buttongroupviewcontrolleroptions) | Options for creating a button group. |
| [`ButtonGroupButton`](#interfaces-buttongroupviewcontroller-buttongroupbutton) | A button in the group. |
| [`ButtonGroupChanges`](#interfaces-buttongroupviewcontroller-buttongroupchanges) | Change info passed to selection handlers. |

<a id="interfaces-buttongroupviewcontroller-buttongroupviewcontrolleroptions"></a>
#### `ButtonGroupViewControllerOptions`
```ts
interface ButtonGroupViewControllerOptions {
    buttons: ButtonGroupButton[]
    onSelectionChange?: SelectionChangeHandler
    onWillChangeSelection?: WillChangeSelectionHandler
    onClickHintIcon?: (id: string) => void
    shouldAllowMultiSelect?: boolean
    selected?: string[]
    lineIcon?: LineIcon
    selectedLineIcon?: LineIcon
    lineIconPosition?: LineIconPosition
}
```

<a id="interfaces-buttongroupviewcontroller-buttongroupbutton"></a>
#### `ButtonGroupButton`
```ts
interface ButtonGroupButton {
    id: string
    label?: string
    isSelected?: boolean
    isEnabled?: boolean
    shouldShowHintIcon?: boolean
    hint?: Text
    type?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
    image?: string
    avatar?: string
    lineIcon?: LineIcon
    selectedLineIcon?: LineIcon
}
```

<a id="interfaces-buttongroupviewcontroller-buttongroupchanges"></a>
#### `ButtonGroupChanges`
```ts
interface ButtonGroupChanges {
    added: string[]
    removed: string[]
}
```

### Testing
- Tools: [`buttonAssert`](#buttonassert), `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/buttons/AssertingButtonBars.test.ts`, `src/__tests__/behavioral/buttons/AssertingButtonBarsInCards.test.ts`, `src/__tests__/behavioral/buttons/AssertingButtons.test.ts`.

</details>

<details>

<summary><strong>EditFormBuilderFieldCardViewController</strong> - Edits a form builder field.</summary>

Extends `CardViewController`. Renders a form for editing field properties (label, type, hint, required, etc.).

### API

| Method | Returns | Description |
|---|---|---|
| `handleFormChange()` | `void` | Called when the form changes. Updates sections based on field type. |
| `getFormVc()` | `FormViewController<EditFieldFormSchema>` | Returns the form view controller. |
| `render()` | [`Card`](#interfaces-cardviewcontroller-card) | Builds and returns the card view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`EditFormBuilderFieldOptions`](#interfaces-editformbuilderfield-options) | Options for creating the field editor. |

<a id="interfaces-editformbuilderfield-options"></a>
#### `EditFormBuilderFieldOptions`
```ts
interface EditFormBuilderFieldOptions {
    name: string
    field: Partial<FieldDefinitions>
    renderOptions?: Partial<FieldRenderOptions<Schema>> | null
    onDone: (fieldDefinition: FieldDefinitions, renderOptions: FieldRenderOptions<Schema>) => void | Promise<void>
}
```

### Testing
- Tools: `calendarSeeder`, [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/formBuilders/AddingAFormBuilderSection.test.ts`, `src/__tests__/behavioral/formBuilders/AddingARatingsField.test.ts`, `src/__tests__/behavioral/formBuilders/AddingASignatureField.test.ts`.

</details>

<details>

<summary><strong>EditFormBuilderSectionCardViewController</strong> - Edits a form builder section.</summary>

Extends `CardViewController`. Renders a form for editing section properties (title, type, fields).

### API

| Method | Returns | Description |
|---|---|---|
| `getFormVc()` | `FormViewController<EditSectionSchema>` | Returns the form view controller. |
| `getFieldListVc()` | `ListViewController` | Returns the field list view controller. |
| `addField()` | `void` | Adds a new field to the section. |
| `render()` | [`Card`](#interfaces-cardviewcontroller-card) | Builds and returns the card view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`EditFormBuilderSectionOptions`](#interfaces-editformbuildersection-options) | Options for creating the section editor. |
| [`SimpleSection`](#interfaces-editformbuildersection-simplesection) | Simplified section data. |
| [`SimpleRow`](#interfaces-editformbuildersection-simplerow) | Simplified field/row data. |

<a id="interfaces-editformbuildersection-options"></a>
#### `EditFormBuilderSectionOptions`
```ts
interface EditFormBuilderSectionOptions {
    onDone: (section: SimpleSection) => void | Promise<void>
    editSection?: SimpleSection
    defaultTitle: string
}
```

<a id="interfaces-editformbuildersection-simplesection"></a>
#### `SimpleSection`
```ts
interface SimpleSection {
    title: string
    type: 'form' | 'text'
    shouldRenderAsGrid?: boolean
    text?: string
    fields?: SimpleRow[]
}
```

<a id="interfaces-editformbuildersection-simplerow"></a>
#### `SimpleRow`
```ts
interface SimpleRow {
    label: string
    type: FormBuilderFieldType
    renderOptions: FieldRenderOptions<Schema>
}
```

### Testing
- Tools: `calendarSeeder`, [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/formBuilders/AddingAFormBuilderSection.test.ts`, `src/__tests__/behavioral/formBuilders/AddingARatingsField.test.ts`, `src/__tests__/behavioral/formBuilders/AddingASignatureField.test.ts`.

</details>

<details>

<summary><strong>FormBuilderCardViewController</strong> - Form builder UI rendered as a card.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `buildField(fieldIdx: number)` | `{ type: string; label: string }` | Returns a default field definition for the given index; used when adding new fields. |
| `getTotalPages()` | `number` | Returns the number of pages (slides) in the builder. |
| `setHeaderTitle(title: string)` | `void` | Updates the header title on the underlying swipe card. |
| `setHeaderSubtitle(title: string)` | `void` | Updates the header subtitle on the underlying swipe card. |
| `addPage(options?: { atIndex?: number; title?: string } & Partial<FormBuilderPage>)` | `Promise<void>` | Adds a new page, optionally inserting at `atIndex` and merging [\`FormBuilderPage\`](#interfaces-formbuildercardviewcontroller-formbuilderpage) values; rebuilds footer buttons. |
| `removePage(idx: number)` | `Promise<void>` | Removes the page at `idx`, refreshes the footer, and jumps to the previous page (or index `0`). |
| `removePresentPage()` | `Promise<void>` | Removes the currently displayed page. |
| `getPage(idx: number)` | [\`CardSection\`](#interfaces-formbuildercardviewcontroller-cardsection) | Returns the raw slide model for the page at `idx`. |
| `getPageVc(idx: number)` | [\`FormBuilderPageViewController\`](#interfaces-formbuildercardviewcontroller-formbuilderpageviewcontroller) | Wraps the page's form controller in a page VC; throws if the form controller is missing. |
| `getPresentPage()` | `number` | Returns the index of the currently displayed page. |
| `getPresentPageVc()` | [\`FormBuilderPageViewController\`](#interfaces-formbuildercardviewcontroller-formbuilderpageviewcontroller) | Returns the page VC for the current page. |
| `jumpToPage(idx: number)` | `Promise<void>` | Navigates to the requested page index. |
| `getPageVcs()` | [\`FormBuilderPageViewController\`](#interfaces-formbuildercardviewcontroller-formbuilderpageviewcontroller)[] | Returns a page VC for every page in the builder. |
| `handleClickDeletePage()` | `Promise<void>` | Shows a destructive confirm dialog and removes the current page when confirmed. |
| `handleClickAddPage()` | `Promise<void>` | Opens the add-page dialog, then creates a page with the submitted title. |
| `handleClickAddSection(clickedSectionIdx: number)` | `void` | Opens the edit-section dialog and inserts the new section after `clickedSectionIdx`. |
| `setShouldAllowEditing(shouldAllow: boolean)` | `void` | Sets whether the rendered model exposes editing affordances. |
| `getShouldAllowEditing()` | `boolean` | Returns the current editability flag (defaults to `true`). |
| `handleClickEditSection(clickedSectionIdx: number)` | `void` | Opens the edit-section dialog prefilled with the chosen section; writes updates back to the page. |
| `handleClickPageTitles()` | `void` | Opens the manage-page-titles dialog for renaming pages. |
| `EditSectionVc(options: { onDone: EditFormBuilderSectionOptions['onDone']; editingSection?: SimpleSection })` | `EditFormBuilderSectionCardViewController` | Creates and returns the edit-section card VC; uses [\`EditFormBuilderSectionOptions\`](#interfaces-formbuildercardviewcontroller-editformbuildersectionoptions). |
| `handleClickEditField(fieldName: string)` | `void` | Opens the edit-field dialog for `fieldName` and updates the field definition (and name) on save. |
| `toObject()` | [\`FormBuilder\`](#interfaces-formbuildercardviewcontroller-formbuilder) | Renders the card and exports a stripped [\`FormBuilder\`](#interfaces-formbuildercardviewcontroller-formbuilder) object. |
| `importObject(imported: FormBuilder<any>)` | `Promise<void>` | Clears existing pages, then rebuilds the builder from the imported [\`FormBuilder\`](#interfaces-formbuildercardviewcontroller-formbuilder) data. |
| `getValues()` | [\`SchemaPartialValues\`](#interfaces-formbuildercardviewcontroller-schemapartialvalues)&lt;[\`Schema\`](#interfaces-formbuildercardviewcontroller-schema)&gt;[] | Returns page values in page order (one entry per page). |
| `setValues(values: Record<string, any>[])` | `Promise<void>` | Sets values per page by index; throws `SchemaError` if `values` is not an array. |
| `render()` | [\`Card\`](#interfaces-formbuildercardviewcontroller-card) | Returns the swipe-card model with `controller` and `shouldAllowEditing` applied. |

### Interfaces

| Interface | Description |
|---|---|
| [`Card`](#interfaces-formbuildercardviewcontroller-card) | Card view model with `shouldAllowEditing`. |
| [`CardSection`](#interfaces-formbuildercardviewcontroller-cardsection) | Card section (slide) model. |
| [`FormBuilder`](#interfaces-formbuildercardviewcontroller-formbuilder) | Import/export representation of a form builder. |
| [`FormBuilderPage`](#interfaces-formbuildercardviewcontroller-formbuilderpage) | Import/export representation of a page. |
| [`FormBuilderPageViewController`](#interfaces-formbuildercardviewcontroller-formbuilderpageviewcontroller) | Page-level controller for a form builder page. |
| [`FormBuilderPageViewControllerEnhancements`](#interfaces-formbuildercardviewcontroller-formbuilderpageviewcontrollerenhancements) | Form-builder-specific methods added on top of the form controller. |
| [`FieldBuilder`](#interfaces-formbuildercardviewcontroller-fieldbuilder) | Builder for default field definitions. |
| [`AddSectionOptions`](#interfaces-formbuildercardviewcontroller-addsectionoptions) | Options for adding a new section to a page. |
| [`EditFormBuilderSectionOptions`](#interfaces-formbuildercardviewcontroller-editformbuildersectionoptions) | Options for the edit-section dialog. |
| [`SimpleSection`](#interfaces-formbuildercardviewcontroller-simplesection) | Simplified section shape used by the editor. |
| [`SimpleRow`](#interfaces-formbuildercardviewcontroller-simplerow) | Simplified field row shape used by the editor. |
| [`EditFormBuilderSectionValues`](#interfaces-formbuildercardviewcontroller-editformbuildersectionvalues) | Form values captured by the edit-section dialog. |
| [`EditSectionSectionSchema`](#interfaces-formbuildercardviewcontroller-editsectionsectionschema) | Schema for the edit-section form. |
| [`formBuilderFieldTypes`](#interfaces-formbuildercardviewcontroller-formbuilderfieldtypes) | Field type labels used in the form builder. |
| [`FormBuilderFieldType`](#interfaces-formbuildercardviewcontroller-formbuilderfieldtype) | Allowed field types in a form builder section. |
| [`RenderAsInputComponentType`](#interfaces-formbuildercardviewcontroller-renderasinputcomponenttype) | Literal input component names. |
| [`RenderAsInputComponent`](#interfaces-formbuildercardviewcontroller-renderasinputcomponent) | Input component overrides for fields. |
| [`RatingsInputComponent`](#interfaces-formbuildercardviewcontroller-ratingsinputcomponent) | Ratings input render configuration. |
| [`MediaInputComponent`](#interfaces-formbuildercardviewcontroller-mediainputcomponent) | Media input render configuration. |
| [`FieldHint`](#interfaces-formbuildercardviewcontroller-fieldhint) | Hint content for form fields. |
| [`FieldRenderOptions`](#interfaces-formbuildercardviewcontroller-fieldrenderoptions) | Render configuration for form fields. |
| [`FormViewController`](#interfaces-formbuildercardviewcontroller-formviewcontroller) | Schema-backed form controller type. |
| [`SchemaFieldsByName`](#interfaces-formbuildercardviewcontroller-schemafieldsbyname) | Schema fields map type. |
| [`Schema`](#interfaces-formbuildercardviewcontroller-schema) | Schema definition type. |
| [`SchemaPartialValues`](#interfaces-formbuildercardviewcontroller-schemapartialvalues) | Partial value map for schema values. |
| [`StaticSchemaPartialValues`](#interfaces-formbuildercardviewcontroller-staticschemapartialvalues) | Partial value map for static schemas. |
| [`DynamicSchemaPartialValues`](#interfaces-formbuildercardviewcontroller-dynamicschemapartialvalues) | Partial value map for dynamic schemas. |

<a id="interfaces-formbuildercardviewcontroller-card"></a>
#### `Card`
```ts
// Extends base Card with shouldAllowEditing
interface Card {
    id?: string | undefined | null
    className?: string | undefined | null
    /** Controller. */
    controller?: CardViewController | undefined | null
    /** Header. */
    header?: CardHeader | undefined | null
    /** Critical error. */
    criticalError?: CriticalError | undefined | null
    /** Fade in. */
    shouldFadeIn?: boolean | undefined | null
    /** Style. */
    style?: ("standard" | "informational" | "visual" | "heading") | undefined | null
    /** Background image URL. */
    backgroundImage?: string | undefined | null
    /** Background image size. */
    backgroundImageSize?: ("cover" | "contain") | undefined | null
    /** Click handler. */
    onClick?: (() => Promise<any> | any) | undefined | null
    /** Body. Card bodies are comprised of sections. */
    body?: CardBody | undefined | null
    /** Footer. */
    footer?: CardFooter | undefined | null
    /** Form builder specific: whether editing is allowed. */
    shouldAllowEditing?: boolean
}
```

<a id="interfaces-formbuildercardviewcontroller-cardsection"></a>
#### `CardSection`
```ts
interface CardSection {
    /** Id. */
    id?: string | undefined | null
    /** Title. */
    title?: string | undefined | null
    /** Complete. */
    isComplete?: boolean | undefined | null
    /** Collapsible. */
    isCollapsed?: boolean | undefined | null
    /** Padding. */
    shouldBePadded?: boolean | undefined | null
    /** Centered. */
    isCentered?: boolean | undefined | null
    /** Controller. */
    controller?: ViewController<CardSection>
    /** Has top padding. */
    shouldHaveTopPadding?: boolean | undefined | null
    /** Has bottom padding. */
    shouldHaveBottomPadding?: boolean | undefined | null
    /** Alignment. */
    alignment?: ("left" | "center" | "right")
    text?: Text | undefined | null
    image?: string | undefined | null
    avatar?: string | undefined | null
    buttons?: Button[] | undefined | null
    form?: Form<Schema> | undefined | null
    bigForm?: BigForm<Schema> | undefined | null
    swipeCard?: SwipeCard | undefined | null
    talkingSprucebot?: TalkingSprucebot | undefined | null
    calendar?: Calendar | undefined | null
    buttonBar?: ButtonBar | undefined | null
    stats?: Stats | undefined | null
    cellButton?: CellButton | undefined | null
    countdownTimer?: CountdownTimer | undefined | null
    progressNavigator?: ProgressNavigator | undefined | null
    activeRecordCard?: ActiveRecordCard | undefined | null
    feed?: Feed | undefined | null
    map?: Map | undefined | null
    markdown?: string | undefined | null
    list?: List | undefined | null
    polarArea?: PolarArea | undefined | null
    lineGraph?: LineGraph | undefined | null
    barChart?: BarChart | undefined | null
    progress?: Progress | undefined | null
    ratings?: Ratings | undefined | null
    buttonGroup?: ButtonGroup | undefined | null
    embeddedVideo?: EmbeddedVideo | undefined | null
    webRtcPlayer?: WebRtcPlayer | undefined | null
    receipt?: Receipt | undefined | null
}
```

<a id="interfaces-formbuildercardviewcontroller-formbuilder"></a>
#### `FormBuilder`
```ts
interface FormBuilder<S extends Schema = Schema> {
    /** Title. */
    title: string
    /** Subtitle. */
    subtitle?: string | undefined | null
    /** Pages. */
    pages: FormBuilderPage<S>[]
}
```

<a id="interfaces-formbuildercardviewcontroller-formbuilderpage"></a>
#### `FormBuilderPage`
```ts
interface FormBuilderPage<S extends Schema = Schema> {
    /** Page title. */
    title: string
    /** Schema. */
    schema: Schema
    /** Sections. */
    sections: FormSection<S>[]
}
```

<a id="interfaces-formbuildercardviewcontroller-formbuilderpageviewcontroller"></a>
#### `FormBuilderPageViewController`
```ts
export type FormBuilderPageViewController = Omit<
    FormViewController<Schema>,
    keyof FormBuilderPageViewControllerEnhancements
> &
    FormBuilderPageViewControllerEnhancements
```

<a id="interfaces-formbuildercardviewcontroller-formbuilderpageviewcontrollerenhancements"></a>
#### `FormBuilderPageViewControllerEnhancements`
```ts
export interface FormBuilderPageViewControllerEnhancements {
    getId(): string
    addSection(options?: AddSectionOptions): void
    setSection(sectionIdx: number, section: SimpleSection): void
    addField(
        sectionIdx: number,
        options?: { name?: string; type?: string; label?: string }
    ): void
    getIndex(): number
    getTitle(): string
    setTitle(string: string): void
    getSection(sectionIdx: number): SimpleSection
}
```

<a id="interfaces-formbuildercardviewcontroller-fieldbuilder"></a>
#### `FieldBuilder`
```ts
export type FieldBuilder = FormBuilderCardViewController['buildField']
```

<a id="interfaces-formbuildercardviewcontroller-addsectionoptions"></a>
#### `AddSectionOptions`
```ts
export type AddSectionOptions = Partial<SimpleSection> & {
    atIndex?: number
}
```

<a id="interfaces-formbuildercardviewcontroller-editformbuildersectionoptions"></a>
#### `EditFormBuilderSectionOptions`
```ts
export interface EditFormBuilderSectionOptions {
    onDone: (section: SimpleSection) => void | Promise<void>
    editSection?: SimpleSection
    defaultTitle: string
}
```

<a id="interfaces-formbuildercardviewcontroller-simplesection"></a>
#### `SimpleSection`
```ts
export type SimpleSection = EditFormBuilderSectionValues & {
    fields?: SimpleRow[]
}
```

<a id="interfaces-formbuildercardviewcontroller-simplerow"></a>
#### `SimpleRow`
```ts
export type SimpleRow = Omit<FieldDefinitions, 'type'> & {
    type: FormBuilderFieldType
    renderOptions: FieldRenderOptions<Schema>
}
```

<a id="interfaces-formbuildercardviewcontroller-editformbuildersectionvalues"></a>
#### `EditFormBuilderSectionValues`
```ts
export type EditFormBuilderSectionValues =
    SchemaValues<EditSectionSectionSchema>
```

<a id="interfaces-formbuildercardviewcontroller-editsectionsectionschema"></a>
#### `EditSectionSectionSchema`
```ts
export type EditSectionSectionSchema = typeof addSectionSchema
```

<a id="interfaces-formbuildercardviewcontroller-formbuilderfieldtypes"></a>
#### `formBuilderFieldTypes`
```ts
export const formBuilderFieldTypes = {
    address: 'Address',
    date: 'Date',
    dateTime: 'Date & Time',
    select: 'Dropdown',
    image: 'Image',
    number: 'Number',
    phone: 'Phone',
    signature: 'Signature',
    ratings: 'Ratings',
    text: 'Text',
    boolean: 'Toggle',
}
```

<a id="interfaces-formbuildercardviewcontroller-formbuilderfieldtype"></a>
#### `FormBuilderFieldType`
```ts
export type FormBuilderFieldType = keyof typeof formBuilderFieldTypes
```

<a id="interfaces-formbuildercardviewcontroller-renderasinputcomponenttype"></a>
#### `RenderAsInputComponentType`
```ts
export type RenderAsInputComponentType =
    | 'colorPicker'
    | 'number'
    | 'textarea'
    | 'ratings'
    | 'checkbox'
    | 'autocomplete'
    | 'tags'
    | 'signature'
    | 'password'
    | 'search'
    | 'slider'
    | 'markdownInput'
    | 'media'
```

<a id="interfaces-formbuildercardviewcontroller-renderasinputcomponent"></a>
#### `RenderAsInputComponent`
```ts
export type RenderAsInputComponent =
    | RenderAsInputComponentType
    | RatingsInputComponent
    | MediaInputComponent
```

<a id="interfaces-formbuildercardviewcontroller-ratingsinputcomponent"></a>
#### `RatingsInputComponent`
```ts
interface RatingsInputComponent {
    type: 'ratings'
    /** Steps. How many choices does a person have? Defaults to 5. */
    steps?: number | undefined | null
    /** Left Label. The label on the left side of the ratings. */
    leftLabel?: string | undefined | null
    /** Right Label. The label on the right side of the ratings. */
    rightLabel?: string | undefined | null
    /** Middle Label. The label in the middle of the ratings. */
    middleLabel?: string | undefined | null
    /** Style. How should I render the ratings? Defaults to 'star'. */
    icon?: ("star" | "radio") | undefined | null
}
```

<a id="interfaces-formbuildercardviewcontroller-mediainputcomponent"></a>
#### `MediaInputComponent`
```ts
export interface MediaInputComponent {
    type: 'media'
}
```

<a id="interfaces-formbuildercardviewcontroller-fieldhint"></a>
#### `FieldHint`
```ts
export type FieldHint =
    | string
    | null
    | {
          markdown?: string
      }
```

<a id="interfaces-formbuildercardviewcontroller-fieldrenderoptions"></a>
#### `FieldRenderOptions`
```ts
export interface FieldRenderOptions<S extends Schema> {
    name: SchemaFieldNames<S>
    renderAs?: RenderAsInputComponent
    renderHintAs?: 'subtitle' | 'tooltip'
    placeholder?: string | null
    label?: string | null
    hint?: FieldHint
    vc?: FormInputViewController
    fieldDefinition?: FieldDefinitions
    rightButtons?: InputButton[]
}
```

<a id="interfaces-formbuildercardviewcontroller-formviewcontroller"></a>
#### `FormViewController`
```ts
export type FormViewController<S extends Schema> = FormViewControllerImpl<S>
```

<a id="interfaces-formbuildercardviewcontroller-schemafieldsbyname"></a>
#### `SchemaFieldsByName`
```ts
export type SchemaFieldsByName = Record<string, FieldDefinitions>
```

<a id="interfaces-formbuildercardviewcontroller-schema"></a>
#### `Schema`
```ts
export interface Schema {
    id: string
    name?: string
    version?: string
    namespace?: string
    description?: string
    importsWhenLocal?: string[]
    importsWhenRemote?: string[]
    moduleToImportFromWhenRemote?: string
    typeSuffix?: string
    dynamicFieldSignature?: FieldDefinitions & {
        keyName: string
        keyTypeLiteral?: string
    }
    fields?: SchemaFieldsByName
}
```

<a id="interfaces-formbuildercardviewcontroller-schemapartialvalues"></a>
#### `SchemaPartialValues`
```ts
export type SchemaPartialValues<
    S extends Schema,
    CreateEntityInstances extends boolean = false,
> =
    IsDynamicSchema<S> extends true
        ? DynamicSchemaPartialValues<S, CreateEntityInstances>
        : StaticSchemaPartialValues<S, CreateEntityInstances>
```

<a id="interfaces-formbuildercardviewcontroller-staticschemapartialvalues"></a>
#### `StaticSchemaPartialValues`
```ts
export type StaticSchemaPartialValues<
    T extends Schema,
    CreateEntityInstances extends boolean = false,
> = {
    [K in SchemaFieldNames<T>]?:
        | SchemaFieldValueType<T, K, CreateEntityInstances>
        | undefined
        | null
}
```

<a id="interfaces-formbuildercardviewcontroller-dynamicschemapartialvalues"></a>
#### `DynamicSchemaPartialValues`
```ts
export type DynamicSchemaPartialValues<
    S extends Schema,
    CreateEntityInstances extends boolean = false,
> = Partial<
    Record<
        string,
        S['dynamicFieldSignature'] extends FieldDefinitions
            ? FieldDefinitionValueType<
                  S['dynamicFieldSignature'],
                  CreateEntityInstances
              >
            : never
    >
>
```

### Testing
- Notes: Use [`vcAssert`](#vcassert) to open dialogs/confirmations, [`formAssert`](#formassert) and [`listAssert`](#listassert) to validate form/row rendering, and `interactor` to drive click flows.
- Tools: `errorAssert`, [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/formBuilders/ControllingAFormBuilder.test.ts`, `src/__tests__/behavioral/formBuilders/GettingAndSettingFormBuilderValues.test.ts`, `src/__tests__/behavioral/formBuilders/ImportingABuiltForm.test.ts`, `src/__tests__/behavioral/formBuilders/ExportingABuiltForm.test.ts`.

</details>

<details>

<summary><strong>FormBuilderPageViewController</strong> - Page-level controller inside the form builder.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getTitle()` | `string` | Returns the page title. |
| `getId()` | `string` | Returns a kebab-case id derived from the title. |
| `setTitle(title: string)` | `void` | Sets the page title and triggers the title handler. |
| `addField(sectionIdx: number, options?: `[`AddFieldOptions`](#interfaces-formbuilderpageviewcontroller-addfieldoptions)`)` | `void` | Adds a new field to the specified section. |
| `getIndex()` | `number` | Returns this page's index in the form builder. |
| `setSection(sectionIdx: number, section: `[`SimpleSection`](#interfaces-formbuilderpageviewcontroller-simplesection)`)` | `void` | Replaces the section at the given index. |
| `addSection(options?: `[`AddSectionOptions`](#interfaces-formbuilderpageviewcontroller-addsectionoptions)`)` | `void` | Adds a new section to the page. |
| `getSection(sectionIdx: number)` | [`SimpleSection`](#interfaces-formbuilderpageviewcontroller-simplesection) | Returns the section at the given index as a SimpleSection. |

### Interfaces

| Interface | Description |
|---|---|
| [`AddFieldOptions`](#interfaces-formbuilderpageviewcontroller-addfieldoptions) | Options for adding a field to a section. |
| [`AddSectionOptions`](#interfaces-formbuilderpageviewcontroller-addsectionoptions) | Options for adding a new section to a page. |
| [`SimpleSection`](#interfaces-formbuilderpageviewcontroller-simplesection) | Simplified section shape used by the form builder. |
| [`FieldBuilder`](#interfaces-formbuilderpageviewcontroller-fieldbuilder) | Builder function for default field definitions. |
| [`FormBuilderPageViewControllerEnhancements`](#interfaces-formbuilderpageviewcontroller-formbuilderpageviewcontrollerenhancements) | Form-builder-specific methods added on top of the form controller. |

<a id="interfaces-formbuilderpageviewcontroller-addfieldoptions"></a>
#### `AddFieldOptions`
```ts
interface AddFieldOptions {
    name?: string
    type?: string
    label?: string
}
```

<a id="interfaces-formbuilderpageviewcontroller-addsectionoptions"></a>
#### `AddSectionOptions`
```ts
type AddSectionOptions = Partial<SimpleSection> & {
    atIndex?: number
}
```

<a id="interfaces-formbuilderpageviewcontroller-simplesection"></a>
#### `SimpleSection`
```ts
type SimpleSection = EditFormBuilderSectionValues & {
    fields?: SimpleRow[]
}
```

<a id="interfaces-formbuilderpageviewcontroller-fieldbuilder"></a>
#### `FieldBuilder`
```ts
type FieldBuilder = FormBuilderCardViewController['buildField']
```

<a id="interfaces-formbuilderpageviewcontroller-formbuilderpageviewcontrollerenhancements"></a>
#### `FormBuilderPageViewControllerEnhancements`
```ts
interface FormBuilderPageViewControllerEnhancements {
    getId(): string
    addSection(options?: AddSectionOptions): void
    setSection(sectionIdx: number, section: SimpleSection): void
    addField(sectionIdx: number, options?: { name?: string; type?: string; label?: string }): void
    getIndex(): number
    getTitle(): string
    setTitle(string: string): void
    getSection(sectionIdx: number): SimpleSection
}
```

### Testing
- Tools: `calendarSeeder`, [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/formBuilders/AddingAFormBuilderSection.test.ts`, `src/__tests__/behavioral/formBuilders/AddingARatingsField.test.ts`, `src/__tests__/behavioral/formBuilders/AddingASignatureField.test.ts`.

</details>

<details>

<summary><strong>FormViewController</strong> - Schema-backed form controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getId()` | `string` | Returns the form's id. |
| `focusInput(named: string)` | `void` | Focuses the input for the given field name. |
| `setValue<N extends SchemaFieldNames<S>>(name: N, value: SchemaPartialValues<S>[N])` | `Promise<void>` | Sets a single field value. |
| `isFieldBeingRendered(name: SchemaFieldNames<S>)` | `boolean` | Checks if a field is currently being rendered in any section. |
| `setTriggerRenderForInput(fieldName: SchemaFieldNames<S>, cb: `[`TriggerRender`](#interfaces-formviewcontroller-triggerrender)`)` | `void` | Sets a render trigger callback for a specific input field. |
| `setTriggerRenderForFooter(cb: `[`TriggerRender`](#interfaces-formviewcontroller-triggerrender)`)` | `void` | Sets a render trigger callback for the footer. |
| `getFieldVc(fieldName: SchemaFieldNames<S>)` | [`FormInputViewController`](#interfaces-formviewcontroller-forminputviewcontroller) | Returns the view controller for the given field. |
| `setValues(values: SchemaPartialValues<S>)` | `Promise<void>` | Sets multiple field values at once. |
| `setErrors(errors: `[`TypedFieldError`](#interfaces-formviewcontroller-typedfielderror)`<S>[])` | `void` | Sets errors from an array of typed field errors. |
| `setErrorsByField(errorsByField: `[`FormErrorsByField`](#interfaces-formviewcontroller-formerrorsbyfield)`<S>)` | `void` | Sets errors keyed by field name. |
| `validate()` | [`FormErrorsByField`](#interfaces-formviewcontroller-formerrorsbyfield)`<S>` | Validates all visible fields and returns errors by field. |
| `isValid()` | `boolean` | Returns true if the form has no validation errors. |
| `disable()` | `void` | Disables the form (prevents submission). |
| `enable()` | `void` | Enables the form. |
| `getIsBusy()` | `boolean` | Returns true if the form is in a busy state. |
| `setIsBusy(isBusy: boolean)` | `void` | Sets the form's busy state. |
| `getIsDirty()` | `boolean` | Returns true if any field has been modified. |
| `submit()` | `Promise<void>` | Triggers form submission and calls onSubmit handler. |
| `getErrorsByField()` | [`FormErrorsByField`](#interfaces-formviewcontroller-formerrorsbyfield)`<S>` | Returns current errors keyed by field name. |
| `hasErrors()` | `boolean` | Returns true if the form has any errors. |
| `hideSubmitControls()` | `void` | Hides the submit button controls. |
| `showSubmitControls()` | `void` | Shows the submit button controls. |
| `getShouldRenderSubmitControls()` | `boolean` | Returns whether submit controls should be rendered. |
| `getShouldRenderCancelButton()` | `boolean` | Returns whether cancel button should be rendered. |
| `getSubmitButtonLabel()` | `string` | Returns the submit button label. |
| `reset()` | `Promise<void>` | Resets the form to original values. |
| `clearDirty()` | `void` | Clears the dirty state without changing values. |
| `addSection(section: `[`FormSection`](#interfaces-formviewcontroller-formsection)`<S> & { atIndex?: number })` | `void` | Adds a new section, optionally at a specific index. |
| `setSectionTitle(sectionIdx: number, title: string)` | `void` | Sets the title of a section by index. |
| `updateField(fieldName: SchemaFieldNames<S>, updates: `[`UpdateFieldOptions`](#interfaces-formviewcontroller-updatefieldoptions)`)` | `void` | Updates a field's definition and/or render options. |
| `isFieldRendering<N extends SchemaFieldNames<S>>(fieldName: N)` | `boolean` | Returns true if the field is currently being rendered. |
| `getField<N extends SchemaFieldNames<S>>(fieldName: N)` | [`CompiledFieldOptions`](#interfaces-formviewcontroller-compiledfieldoptions)`<S, N>` | Returns the compiled field options for a field. |
| `updateSection(section: number \| string, newSection: `[`FormSection`](#interfaces-formviewcontroller-formsection)`<S>)` | `void` | Replaces a section by index or id. |
| `removeSection(section: number \| string)` | `void` | Removes a section by index or id. |
| `setSections(sections: `[`FormSection`](#interfaces-formviewcontroller-formsection)`<S>[])` | `void` | Replaces all sections. |
| `resetField<N extends SchemaFieldNames<S>>(name: N)` | `Promise<void>` | Resets a single field to its original value. |
| `getSections()` | [`FormSection`](#interfaces-formviewcontroller-formsection)`<S>[]` | Returns all form sections. |
| `getTotalSections()` | `number` | Returns the total number of sections. |
| `getSection(idOrIdx: number \| string)` | [`FormSection`](#interfaces-formviewcontroller-formsection)`<S>` | Returns a section by index or id. |
| `hasSection(idOrIdx: number \| string)` | `boolean` | Returns true if a section exists with the given index or id. |
| `getSchema()` | `S` | Returns the form's schema. |
| `removeField<N extends SchemaFieldNames<S>>(fieldName: N)` | `void` | Removes a field from being rendered. |
| `addFieldToSection<N extends SchemaFieldNames<S>>(sectionIdOrIdx: string \| number, fieldNameOrRenderOptions: N \| `[`FieldRenderOptions`](#interfaces-formviewcontroller-fieldrenderoptions)`<S>)` | `void` | Adds a field to a specific section. |
| `addFields(options: `[`AddFieldsOptions`](#interfaces-formviewcontroller-addfieldsoptions)`)` | `void` | Adds multiple fields with their definitions. |
| `getValue<N extends SchemaFieldNames<S>>(named: N, options?: `[`GetValueOptions`](#interfaces-formviewcontroller-getvalueoptions)`)` | `SchemaValues<S>[N]` | Returns a single field's value. |
| `getValues(options?: `[`GetValueOptions`](#interfaces-formviewcontroller-getvalueoptions)`)` | `SchemaPartialValues<S>` | Returns all visible field values. |
| `setFooter(footer?: `[`CardFooter`](#interfaces-formviewcontroller-cardfooter)` \| null)` | `void` | Sets or clears the form footer. |
| `getIsEnabled()` | `boolean` | Returns true if the form is enabled. |
| `render()` | [`Form`](#interfaces-formviewcontroller-form)`<S>` | Builds and returns the form view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`FormViewControllerOptions`](#interfaces-formviewcontroller-formviewcontrolleroptions) | Options for creating a form view controller. |
| [`FormSection`](#interfaces-formviewcontroller-formsection) | A section within a form. |
| [`FormInputViewController`](#interfaces-formviewcontroller-forminputviewcontroller) | View controller for a form input field. |
| [`FormErrorsByField`](#interfaces-formviewcontroller-formerrorsbyfield) | Errors keyed by field name. |
| [`TypedFieldError`](#interfaces-formviewcontroller-typedfielderror) | A typed field validation error. |
| [`UpdateFieldOptions`](#interfaces-formviewcontroller-updatefieldoptions) | Options for updating a field. |
| [`CompiledFieldOptions`](#interfaces-formviewcontroller-compiledfieldoptions) | Compiled field definition with render options. |
| [`FieldRenderOptions`](#interfaces-formviewcontroller-fieldrenderoptions) | Render configuration for form fields. |
| [`AddFieldsOptions`](#interfaces-formviewcontroller-addfieldsoptions) | Options for adding multiple fields. |
| [`GetValueOptions`](#interfaces-formviewcontroller-getvalueoptions) | Options for getting values. |
| [`TriggerRender`](#interfaces-formviewcontroller-triggerrender) | Callback to trigger a re-render. |
| [`CardFooter`](#interfaces-formviewcontroller-cardfooter) | Footer for a card/form. |
| [`Form`](#interfaces-formviewcontroller-form) | Form view model. |

<a id="interfaces-formviewcontroller-formviewcontrolleroptions"></a>
#### `FormViewControllerOptions`
```ts
type FormViewControllerOptions<S extends Schema> = Pick<
    Form<S>,
    | 'schema'
    | 'sections'
    | 'onSubmit'
    | 'onChange'
    | 'onCancel'
    | 'onWillChange'
    | 'shouldRenderCancelButton'
    | 'shouldRenderSubmitControls'
    | 'submitButtonLabel'
    | 'cancelButtonLabel'
    | 'values'
    | 'footer'
    | 'isBusy'
    | 'isEnabled'
> & Partial<Pick<Form<S>, 'id' | 'isBusy'>>
```

<a id="interfaces-formviewcontroller-formsection"></a>
#### `FormSection`
```ts
interface FormSection<S extends Schema = Schema> {
    id?: string | undefined | null
    title?: string | undefined | null
    shouldRenderAsGrid?: boolean | undefined | null
    fields?: (string | FieldRenderOptions<S>)[] | undefined | null
    text?: { content?: string } | undefined | null
}
```

<a id="interfaces-formviewcontroller-forminputviewcontroller"></a>
#### `FormInputViewController`
```ts
interface FormInputViewController<
    Value = any,
    RenderedValue = any
> {
    setValue?(value: Value): Promise<void> | void
    getValue?(): Value
    setRenderedValue?(value: RenderedValue): Promise<void> | void
    getRenderedValue?(): RenderedValue
    setHandlers?(handlers: {
        setValue: (value: Value) => Promise<void>
        getValue: () => Value
        getModel: () => any
        setModel: (model: any) => void
    }): void
    render(): any
}
```

<a id="interfaces-formviewcontroller-formerrorsbyfield"></a>
#### `FormErrorsByField`
```ts
type FormErrorsByField<S extends Schema> = Partial<
    Record<SchemaFieldNames<S>, TypedFieldError<S>[]>
>
```

<a id="interfaces-formviewcontroller-typedfielderror"></a>
#### `TypedFieldError`
```ts
interface TypedFieldError<S extends Schema, N extends SchemaFieldNames<S> = SchemaFieldNames<S>> {
    code: string
    name: N
    friendlyMessage?: string
    label?: string
}
```

<a id="interfaces-formviewcontroller-updatefieldoptions"></a>
#### `UpdateFieldOptions`
```ts
interface UpdateFieldOptions {
    newName?: string
    fieldDefinition?: FieldDefinitions
    renderOptions?: Partial<FieldRenderOptions<Schema>>
}
```

<a id="interfaces-formviewcontroller-compiledfieldoptions"></a>
#### `CompiledFieldOptions`
```ts
type CompiledFieldOptions<S extends Schema, N extends SchemaFieldNames<S>> =
    S['fields'][N] & {
        renderOptions: FieldRenderOptions<S>
    }
```

<a id="interfaces-formviewcontroller-fieldrenderoptions"></a>
#### `FieldRenderOptions`
```ts
interface FieldRenderOptions<S extends Schema> {
    name: SchemaFieldNames<S>
    renderAs?: RenderAsInputComponent
    renderHintAs?: 'subtitle' | 'tooltip'
    placeholder?: string | null
    label?: string | null
    hint?: string | null | { markdown?: string }
    vc?: FormInputViewController
    fieldDefinition?: FieldDefinitions
    rightButtons?: InputButton[]
}
```

<a id="interfaces-formviewcontroller-addfieldsoptions"></a>
#### `AddFieldsOptions`
```ts
interface AddFieldsOptions {
    sectionIdx: number
    fields: Record<string, FieldDefinitions & {
        renderOptions?: Partial<FieldRenderOptions<any>>
    }>
}
```

<a id="interfaces-formviewcontroller-getvalueoptions"></a>
#### `GetValueOptions`
```ts
interface GetValueOptions {
    shouldIncludePendingValues?: boolean
}
```

<a id="interfaces-formviewcontroller-triggerrender"></a>
#### `TriggerRender`
```ts
type TriggerRender = () => void
```

<a id="interfaces-formviewcontroller-cardfooter"></a>
#### `CardFooter`
```ts
interface CardFooter {
    buttons?: Button[] | undefined | null
    isSticky?: boolean | undefined | null
    shouldRenderBorder?: boolean | undefined | null
}
```

<a id="interfaces-formviewcontroller-form"></a>
#### `Form`
```ts
interface Form<S extends Schema = Schema> {
    id?: string | undefined | null
    className?: string | undefined | null
    controller?: FormViewController<S>
    schema: S
    sections: FormSection<S>[]
    values?: SchemaPartialValues<S>
    errorsByField?: FormErrorsByField<S>
    shouldRenderSubmitControls?: boolean
    shouldRenderCancelButton?: boolean
    submitButtonLabel?: string
    cancelButtonLabel?: string
    isBusy?: boolean
    isEnabled?: boolean
    footer?: CardFooter | null
    onSubmit?: (options: FormOnSubmitOptions<S>) => Promise<any> | any
    onChange?: (options: FormOnChangeOptions<S>) => Promise<any> | any
    onCancel?: () => Promise<any> | any
    onWillChange?: (options: FormWillChangeOptions<S>) => Promise<boolean | void> | boolean | void
    setValue?: <N extends SchemaFieldNames<S>>(name: N, value: SchemaPartialValues<S>[N]) => Promise<void>
}
```

### Testing
- Tools: [`formAssert`](#formassert), `interactor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/forms/AddingRemovingFormSections.test.ts`, `src/__tests__/behavioral/forms/AssertingForms.test.ts`, `src/__tests__/behavioral/forms/ControllingABigForm.test.ts`.

</details>

<details>

<summary><strong>ManagePageTitlesCardViewController</strong> - Manages form builder page titles.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getListVc()` | [`ListViewController`](#listviewcontroller) | Returns the list view controller that displays page titles. |

### Interfaces

| Interface | Description |
|---|---|
| [`ManagePageTitlesCardViewControllerOptions`](#interfaces-managepagetitlescardviewcontroller-managepagetitlescardviewcontrolleroptions) | Options for creating the manage page titles card. |

<a id="interfaces-managepagetitlescardviewcontroller-managepagetitlescardviewcontrolleroptions"></a>
#### `ManagePageTitlesCardViewControllerOptions`
```ts
interface ManagePageTitlesCardViewControllerOptions {
    onDone(): void
    formBuilderVc: FormBuilderCardViewController
}
```

### Testing
- Tools: `calendarSeeder`, [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/formBuilders/AddingAFormBuilderSection.test.ts`, `src/__tests__/behavioral/formBuilders/AddingARatingsField.test.ts`, `src/__tests__/behavioral/formBuilders/AddingASignatureField.test.ts`.

</details>

<details>

<summary><strong>PagerViewController</strong> - Pagination controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setTotalPages(totalPages: number)` | `void` | Sets the total number of pages. |
| `setCurrentPage(page: number)` | `void` | Sets the current page (validates against totalPages). |
| `getTotalPages()` | `number` | Returns the total number of pages (-1 if not set). |
| `clear()` | `void` | Clears currentPage and totalPages. |
| `shouldRender()` | `boolean` | Returns true if both currentPage and totalPages are set. |
| `getCurrentPage()` | `number` | Returns the current page (-1 if not set). |
| `render()` | [`Pager`](#interfaces-pagerviewcontroller-pager) | Builds and returns the pager view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`PagerViewControllerOptions`](#interfaces-pagerviewcontroller-pagerviewcontrolleroptions) | Options for creating a pager view controller. |
| [`Pager`](#interfaces-pagerviewcontroller-pager) | Pager view model. |

<a id="interfaces-pagerviewcontroller-pagerviewcontrolleroptions"></a>
#### `PagerViewControllerOptions`
```ts
type PagerViewControllerOptions = Omit<Pager, 'controller' | 'setCurrentPage'>
```

<a id="interfaces-pagerviewcontroller-pager"></a>
#### `Pager`
```ts
interface Pager {
    /** Controller. */
    controller?: PagerViewController | undefined | null
    id?: string | undefined | null
    totalPages?: number | undefined | null
    currentPage?: number | undefined | null
    onChangePage?: ((page: number) => Promise<any> | any) | undefined | null
    setCurrentPage: ((page: number) => Promise<any> | any)
}
```

### Testing
- Tools: `interactor`, [`pagerAssert`](#pagerassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/pagers/AssertingPagers.test.ts`, `src/__tests__/behavioral/pagers/ControllingAPager.test.ts`, `src/__tests__/behavioral/pagers/InteractingWithPagers.test.ts`.

</details>

<details>

<summary><strong>ProgressNavigatorViewController</strong> - Step navigation controller for multi-step flows.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `completeStep(stepId: string)` | `void` | Marks a step as complete. |
| `setCurrentStepAndCompletePrevious(id: string)` | `void` | Sets current step and marks all previous steps as complete. |
| `isStepComplete(id: string)` | `boolean` | Returns true if the step is complete. |
| `openStep(id: string)` | `void` | Marks a complete step as incomplete (throws if not complete). |
| `openStepAndAllAfter(id: string)` | `void` | Opens the step and all steps after it. |
| `reset()` | `void` | Opens all steps and sets current to the first step. |
| `setCurrentStep(stepId: string)` | `void` | Sets the current step (throws if step doesn't exist). |
| `getCurrentStep()` | `string \| null \| undefined` | Returns the current step id. |
| `render()` | [`ProgressNavigator`](#interfaces-progressnavigatorviewcontroller-progressnavigator) | Builds and returns the progress navigator view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`ProgressNavigatorViewControllerOptions`](#interfaces-progressnavigatorviewcontroller-progressnavigatorviewcontrolleroptions) | Options for creating a progress navigator. |
| [`ProgressNavigator`](#interfaces-progressnavigatorviewcontroller-progressnavigator) | Progress navigator view model. |
| [`ProgressNavigatorStep`](#interfaces-progressnavigatorviewcontroller-progressnavigatorstep) | A step in the progress navigator. |

<a id="interfaces-progressnavigatorviewcontroller-progressnavigatorviewcontrolleroptions"></a>
#### `ProgressNavigatorViewControllerOptions`
```ts
type ProgressNavigatorViewControllerOptions = Omit<ProgressNavigator, 'controller'>
```

<a id="interfaces-progressnavigatorviewcontroller-progressnavigator"></a>
#### `ProgressNavigator`
```ts
interface ProgressNavigator {
    currentStepId?: string | undefined | null
    processLabel?: string | undefined | null
    /** Line icon. */
    lineIcon?: LineIcon | undefined | null
    controller?: ProgressNavigatorViewController | undefined | null
    steps: ProgressNavigatorStep[]
}
```

<a id="interfaces-progressnavigatorviewcontroller-progressnavigatorstep"></a>
#### `ProgressNavigatorStep`
```ts
interface ProgressNavigatorStep {
    id: string
    label: string
    isComplete?: boolean | undefined | null
    hasError?: boolean | undefined | null
}
```

### Testing
- Tools: [`progressNavigatorAssert`](#progressnavigatorassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/progressNavigator/AssertingProgressNavigator.test.ts`, `src/__tests__/behavioral/progressNavigator/ControllingProgressNavigator.test.ts`.

</details>

### Navigation

<details>

<summary><strong>NavigationViewController</strong> - Control bar navigation controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `hide()` | `void` | Hides the navigation. |
| `show()` | `void` | Shows the navigation. |
| `setButtons(buttons: `[`NavigationButton`](#interfaces-navigationviewcontroller-navigationbutton)`[])` | `void` | Replaces all navigation buttons. |
| `setShouldRenderButtonLabels(shouldRender: boolean)` | `void` | Sets whether button labels should be rendered. |
| `updateButton(id: string, updates: Partial<`[`NavigationItem`](#interfaces-navigationviewcontroller-navigationitem)`>)` | `void` | Updates a button by id (throws if not found). |
| `render()` | [`Navigation`](#interfaces-navigationviewcontroller-navigation) | Builds and returns the navigation view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`Navigation`](#interfaces-navigationviewcontroller-navigation) | Navigation view model. |
| [`NavigationButton`](#interfaces-navigationviewcontroller-navigationbutton) | A button in the navigation. |
| [`NavigationItem`](#interfaces-navigationviewcontroller-navigationitem) | Navigation item (button or divider). |

<a id="interfaces-navigationviewcontroller-navigation"></a>
#### `Navigation`
```ts
interface Navigation {
    /** Render button labels. Should the button labels be rendered? */
    shouldRenderButtonLabels?: boolean | undefined | null
    /** Is visible. Should the navigation be visible? Defaults to true. */
    isVisible?: boolean | undefined | null
    /** Controller. */
    controller?: NavigationViewController | undefined | null
    buttons?: NavigationItem[] | undefined | null
    additionalValidRoutes?: NavigationRoute[] | undefined | null
}
```

<a id="interfaces-navigationviewcontroller-navigationbutton"></a>
#### `NavigationButton`
```ts
interface NavigationButton {
    /** Line icon. */
    lineIcon?: LineIcon | undefined | null
    id: string
    viewPermissionContract?: PermissionContractReference | undefined | null
    /** Destination skill view controller. */
    destination?: RouterDestination | undefined | null
    /** Selected. */
    isEnabled?: boolean | undefined | null
    /** Label. */
    label?: string | undefined | null
    /** Click handler. */
    onClick?: (() => Promise<any> | any) | undefined | null
    /** Image. */
    image?: string | undefined | null
    /** Avatar. */
    avatar?: string | undefined | null
    /** Dropdown. */
    dropdown?: Dropdown | undefined | null
}
```

<a id="interfaces-navigationviewcontroller-navigationitem"></a>
#### `NavigationItem`
```ts
type NavigationItem = NavigationButton | 'divider'
```

### Testing
- Tools: `interactor`, [`navigationAssert`](#navigationassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/navigation/AssertingNavigation.test.ts`, `src/__tests__/behavioral/navigation/ControllingNavigation.test.ts`, `src/__tests__/behavioral/navigation/InteractingWithNavigation.test.ts`.

</details>

### Lists and Records

<details>

<summary><strong>ActiveRecordCardViewController</strong> - Card wrapper around an active record list.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `static setShouldThrowOnResponseError(shouldThrow: boolean)` | `void` | Sets whether to throw on response errors. |
| `setCriticalError(error: `[`CriticalError`](#interfaces-activerecordcardviewcontroller-criticalerror)`)` | `void` | Sets a critical error on the card. |
| `getHasCriticalError()` | `boolean` | Returns true if the card has a critical error. |
| `load()` | `Promise<void>` | Loads data and prepares the controller. |
| `getIsLoaded()` | `boolean` | Returns true if the card has been loaded. |
| `clearCriticalError()` | `void` | Clears any critical error. |
| `getRecords()` | `Record<string, any>[]` | Returns all loaded records. |
| `upsertRow(id: string, row: Omit<`[`ListRow`](#interfaces-activerecordcardviewcontroller-listrow)`, 'id'>)` | `void` | Updates or inserts a row. |
| `getTarget()` | `Record<string, any> \| undefined` | Returns the current target. |
| `setTarget(target?: Record<string, any>)` | `void` | Sets the fetch target. |
| `setPayload(payload?: Record<string, any>)` | `void` | Sets the fetch payload. |
| `deleteRow(id: string)` | `void` | Deletes a row by id. |
| `setIsBusy(isBusy: boolean)` | `void` | Sets the card's busy state. |
| `refresh()` | `Promise<void>` | Refreshes the data (requires prior load). |
| `setHeaderTitle(title: string)` | `void` | Sets the card header title. |
| `setHeaderSubtitle(subtitle: string)` | `void` | Sets the card header subtitle. |
| `selectRow(row: string \| number)` | `void` | Selects a row by id. |
| `deselectRow(row: string \| number)` | `void` | Deselects a row by id. |
| `addRow(row: `[`ListRow`](#interfaces-activerecordcardviewcontroller-listrow)`)` | `void` | Adds a new row. |
| `setSelectedRows(rows: (string \| number)[])` | `void` | Sets which rows are selected. |
| `getRowVc(row: string \| number)` | [`ListRowViewController`](#listrowviewcontroller) | Returns the view controller for a row. |
| `getValues()` | [`RowValues`](#interfaces-activerecordcardviewcontroller-rowvalues)`[]` | Returns values from all rows. |
| `setValue(rowId: string \| number, name: string, value: any)` | `Promise<void>` | Sets a value in a specific row. |
| `getValue(rowId: string \| number, name: string)` | `any` | Gets a value from a specific row. |
| `getPayload()` | `Record<string, any> \| undefined` | Returns the current payload. |
| `setFooter(footer: `[`CardFooter`](#interfaces-activerecordcardviewcontroller-cardfooter)` \| null)` | `void` | Sets the card footer. |
| `disableFooter()` | `void` | Disables the footer. |
| `enableFooter()` | `void` | Enables the footer. |
| `getListVc()` | [`ListViewController`](#listviewcontroller) | Returns the list VC (throws if paging enabled). |
| `doesRowExist(id: string)` | `boolean` | Returns true if a row with the id exists. |
| `getCardVc()` | [`CardViewController`](#cardviewcontroller) | Returns the underlying card view controller. |
| `render()` | [`Card`](#interfaces-activerecordcardviewcontroller-card) | Builds and returns the card view model. |

### Interfaces

| Interface | Description |
|---|---|
| [`ActiveRecordCardViewControllerOptions`](#interfaces-activerecordcardviewcontroller-activerecordcardviewcontrolleroptions) | Options for creating an active record card. |
| [`ListRow`](#interfaces-activerecordcardviewcontroller-listrow) | A row in the list. |
| [`CardFooter`](#interfaces-activerecordcardviewcontroller-cardfooter) | Card footer configuration. |
| [`CriticalError`](#interfaces-activerecordcardviewcontroller-criticalerror) | Critical error display. |

<a id="interfaces-activerecordcardviewcontroller-activerecordcardviewcontrolleroptions"></a>
#### `ActiveRecordCardViewControllerOptions`
```ts
interface ActiveRecordCardViewControllerOptions extends ActiveRecordListViewControllerOptions {
    header?: CardHeader | null
    footer?: CardFooter | null
    criticalError?: CriticalError | null
}
```

<a id="interfaces-activerecordcardviewcontroller-listrow"></a>
#### `ListRow`
```ts
interface ListRow {
    id: string
    cells: ListCell[]
    isSelected?: boolean | undefined | null
    isEnabled?: boolean | undefined | null
    height?: 'standard' | 'content' | undefined | null
    style?: 'standard' | 'critical' | undefined | null
    onClick?: (() => Promise<any> | any) | undefined | null
    controller?: ListRowViewController | undefined | null
}
```

<a id="interfaces-activerecordcardviewcontroller-cardfooter"></a>
#### `CardFooter`
```ts
interface CardFooter {
    buttons?: Button[] | undefined | null
    isSticky?: boolean | undefined | null
    shouldRenderBorder?: boolean | undefined | null
    pager?: Pager | undefined | null
}
```

<a id="interfaces-activerecordcardviewcontroller-criticalerror"></a>
#### `CriticalError`
```ts
interface CriticalError {
    title?: string | undefined | null
    message?: string | undefined | null
    buttons?: Button[] | undefined | null
}
```

<a id="interfaces-activerecordcardviewcontroller-rowvalues"></a>
#### `RowValues`
```ts
type RowValues = Record<string, any>
```

<a id="interfaces-activerecordcardviewcontroller-card"></a>
#### `Card`
```ts
// See CardViewController for full Card interface
```

### Testing
- Tools: [`activeRecordCardAssert`](#activerecordcardassert), [`activeRecordListAssert`](#activerecordlistassert), [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`pagerAssert`](#pagerassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/activeRecord/ActiveRecordCardNotUsingIdFieldAsRowId.test.ts`, `src/__tests__/behavioral/activeRecord/ActiveRecordCardsWithClientSidePaging.test.ts`, `src/__tests__/behavioral/activeRecord/ActiveRecordCardsWithClientSideSearch.test.ts`.

</details>

<details>

<summary><strong>ActiveRecordListViewController</strong> - List controller with paging, searching, and loading helpers.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `load()` | `Promise<void>` | Loads data and prepares the controller. |
| `doesRowExist(id: string)` | `boolean` | Returns true if a row with the id exists. |
| `setRecords(records: Record<string, any>[])` | `void` | Sets the records. |
| `getIsLoaded()` | `boolean` | Returns true if the list has been loaded. |
| `isRowSelected(id: string \| number)` | `boolean` | Returns true if the row is selected. |
| `selectRow(id: string \| number)` | `void` | Selects a row by id. |
| `setSelectedRows(rows: (string \| number)[])` | `void` | Sets which rows are selected. |
| `deselectRow(id: string \| number)` | `void` | Deselects a row by id. |
| `getRecords()` | `Record<string, any>[]` | Returns all records. |
| `upsertRow(id: string, row: Omit<ListRow, 'id'>)` | `void` | Updates or inserts a row. |
| `getTarget()` | `Record<string, any> \| undefined` | Returns the current target. |
| `setTarget(target?: Record<string, any>)` | `void` | Sets the fetch target. |
| `setPayload(payload?: Record<string, any>)` | `void` | Sets the fetch payload. |
| `deleteRow(id: string)` | `void` | Deletes a row by id. |
| `refresh()` | `Promise<void>` | Refreshes the data. |
| `getValues()` | `Record<string, any>[]` | Returns values from all rows. |
| `addRow(row: ListRow)` | `void` | Adds a new row. |
| `getRowVc(row: string \| number)` | [`ListRowViewController`](#listrowviewcontroller) | Returns the view controller for a row. |
| `getPayload()` | `Record<string, any> \| undefined` | Returns the current payload. |
| `getListVc()` | [`ListViewController`](#listviewcontroller) | Returns the underlying list view controller. |
| `render()` | `List` | Builds and returns the list view model. |

### Testing
- Tools: [`activeRecordCardAssert`](#activerecordcardassert), [`activeRecordListAssert`](#activerecordlistassert), [`formAssert`](#formassert), `interactor`, [`listAssert`](#listassert), [`pagerAssert`](#pagerassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/activeRecord/ActiveRecordCardNotUsingIdFieldAsRowId.test.ts`, `src/__tests__/behavioral/activeRecord/ActiveRecordCardsWithClientSidePaging.test.ts`, `src/__tests__/behavioral/activeRecord/ActiveRecordCardsWithClientSideSearch.test.ts`.

</details>

<details>

<summary><strong>ListCellViewController</strong> - Cell controller for lists.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `triggerRender()` | `void` | Triggers a re-render of the cell. |
| `setTriggerRenderHandler(handler: () => void)` | `void` | Sets the render trigger callback. |
| `setValue(name: string, value: any)` | `Promise<void>` | Sets a value in the cell. |
| `getIsDeleted()` | `boolean` | Returns true if the cell has been deleted. |
| `hasInput(name: string)` | `boolean` | Returns true if the cell has an input with the name. |
| `render()` | `ListCell` | Builds and returns the cell view model. |

### Testing
- Tools: `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/lists/AssertingButtonBarsInLists.test.ts`, `src/__tests__/behavioral/lists/AssertingCalendarsInLists.test.ts`, `src/__tests__/behavioral/lists/AssertingCellsInLists.test.ts`.

</details>

<details>

<summary><strong>ListRowViewController</strong> - Row controller for lists.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `triggerRender()` | `void` | Triggers a re-render of the row. |
| `setTriggerRenderHandler(handler: () => void)` | `void` | Sets the render trigger callback. |
| `setValue(name: string, value: any)` | `Promise<void>` | Sets a value in the row. |
| `hasInput(name: string)` | `boolean` | Returns true if the row has an input with the name. |
| `getValues()` | `Record<string, any>` | Returns all values from the row. |
| `getValue(fieldName: string)` | `any` | Returns a specific field value. |
| `isLastRow()` | `boolean` | Returns true if this is the last row. |
| `delete()` | `void` | Marks the row as deleted. |
| `getId()` | `string` | Returns the row's id. |
| `getIsSelected()` | `boolean` | Returns true if the row is selected. |
| `setIsEnabled(isEnabled: boolean)` | `void` | Sets whether the row is enabled. |
| `getIsEnabled()` | `boolean` | Returns true if the row is enabled. |
| `setIsSelected(isSelected: boolean)` | `void` | Sets whether the row is selected. |
| `getIsDeleted()` | `boolean` | Returns true if the row has been deleted. |
| `getCellVc(idx: number)` | [`ListCellViewController`](#listcellviewcontroller) | Returns the cell view controller at the index. |
| `render()` | `ListRow` | Builds and returns the row view model. |

### Testing
- Tools: `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/lists/AssertingButtonBarsInLists.test.ts`, `src/__tests__/behavioral/lists/AssertingCalendarsInLists.test.ts`, `src/__tests__/behavioral/lists/AssertingCellsInLists.test.ts`.

</details>

<details>

<summary><strong>ListViewController</strong> - Row/cell list controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getRows()` | `ListRow[]` | Returns all rows. |
| `addRows(rows: ListRow[])` | `void` | Adds multiple rows. |
| `setColumnWidths(widths: List['columnWidths'])` | `void` | Sets the column widths. |
| `addRow(row: ListRow)` | `void` | Adds a single row. |
| `getRowVc(row: string \| number)` | [`ListRowViewController`](#listrowviewcontroller) | Returns the view controller for a row. |
| `getTotalRows()` | `number` | Returns the total number of rows. |
| `getRowVcs()` | [`ListRowViewController`](#listrowviewcontroller)`[]` | Returns all row view controllers. |
| `getValues()` | `Record<string, any>[]` | Returns values from all rows. |
| `setValue(row: string \| number, name: string, value: any)` | `Promise<void>` | Sets a value in a specific row. |
| `getValue(row: string \| number, name: string)` | `any` | Gets a value from a specific row. |
| `setRows(rows: ListRow[])` | `void` | Replaces all rows. |
| `deleteRow(rowIdx: string \| number)` | `void` | Deletes a row by id or index. |
| `upsertRowById(id: string, row: Omit<ListRow, 'id'>)` | `void` | Updates or inserts a row by id (deprecated). |
| `upsertRow(id: string, row: Omit<ListRow, 'id'>)` | `void` | Updates or inserts a row. |
| `doesRowExist(idOrIdx: string \| number)` | `boolean` | Returns true if a row exists. |
| `doesIdExist(id: string)` | `boolean` | Returns true if a row with the id exists. |
| `getSelectedRows()` | `string[]` | Returns ids of selected rows. |
| `selectRow(id: string \| number)` | `void` | Selects a row. |
| `deselectRow(id: string \| number)` | `void` | Deselects a row. |
| `isRowSelected(row: string \| number)` | `boolean` | Returns true if the row is selected. |
| `setSelectedRows(rows: (string \| number)[])` | `void` | Sets which rows are selected. |
| `deleteAllRows()` | `void` | Deletes all rows. |
| `getIsDragAndDropSortingEnabled()` | `boolean` | Returns true if drag-and-drop sorting is enabled. |
| `disableDragAndDropSorting()` | `void` | Disables drag-and-drop sorting. |
| `enableDragAndDropSorting()` | `void` | Enables drag-and-drop sorting. |
| `render()` | `List` | Builds and returns the list view model. |

### Testing
- Tools: `interactor`, [`listAssert`](#listassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/lists/AssertingButtonBarsInLists.test.ts`, `src/__tests__/behavioral/lists/AssertingCalendarsInLists.test.ts`, `src/__tests__/behavioral/lists/AssertingCellsInLists.test.ts`.

</details>

### Calendars and Time

<details>

<summary><strong>CalendarEventViewController</strong> - Controller for a calendar event instance.</summary>

### API

No public methods declared on this class. This is a base/marker class for calendar events.

### Testing
- Tools: `calendarInteractor`, `calendarSeeder`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/calendars/AssertingCalendars.test.ts`, `src/__tests__/behavioral/calendars/ControllingACalendar.test.ts`, `src/__tests__/behavioral/calendars/ControllingACalendarEvent.test.ts`.

</details>

<details>

<summary><strong>CalendarViewController</strong> - Calendar controller for day/month views.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getPeople()` | `CalendarPerson[]` | Returns all people. |
| `setPeople(people: CalendarPerson[])` | `void` | Sets the people. |
| `setMinTime(time: CalendarTime)` | `void` | Sets the minimum time. |
| `setMaxTime(time: CalendarTime)` | `void` | Sets the maximum time. |
| `getIsAnimationEnabled()` | `boolean` | Returns true if animation is enabled. |
| `setShifts(shifts: CalendarShift[])` | `void` | Sets the shifts. |
| `enableAnimation()` | `void` | Enables animation. |
| `disableAnimations()` | `void` | Disables animations. |
| `setTimezoneOffsetMs(offsetMs: number)` | `void` | Sets timezone offset in milliseconds. |
| `getTimezoneOffsetMs()` | `number` | Returns timezone offset in milliseconds. |
| `getShifts()` | `CalendarShift[] \| null \| undefined` | Returns the shifts. |
| `selectEvent(id: string)` | `Promise<void>` | Selects an event by id. |
| `deselectEvent()` | `Promise<void>` | Deselects the current event. |
| `deselectDate(year: number, month: number, day: number)` | `void` | Deselects a date. |
| `getSelectedDates()` | `CalendarSelectedDate[]` | Returns selected dates. |
| `clearSelectedDates()` | `void` | Clears all selected dates. |
| `isDateSelected(year: number, month: number, day: number)` | `boolean` | Returns true if the date is selected. |
| `getSelectedEvent()` | `CalendarEvent \| undefined` | Returns the selected event. |
| `getView()` | `'day' \| 'month' \| null \| undefined` | Returns the current view. |
| `setView(view: 'day' \| 'month')` | `void` | Sets the view mode. |
| `addEvent(event: CalendarEvent)` | `void` | Adds an event. |
| `removeEvent(id: string)` | `Promise<void>` | Removes an event by id. |
| `removeEvents(ids: string[])` | `Promise<void>` | Removes multiple events. |
| `clearEvents()` | `void` | Clears all events. |
| `removePerson(id: string)` | `void` | Removes a person by id. |
| `addPerson(person: CalendarPerson)` | `void` | Adds a person. |
| `updateEvent(id: string, updates: Partial<CalendarEvent>)` | `CalendarEvent` | Updates an event. |
| `getEvent(id: string)` | `CalendarEvent` | Returns an event by id. |
| `getDefaultControllerForEvents()` | `string \| undefined` | Returns the default event controller. |
| `setDefaultControllerForEvents(vcId: string)` | `void` | Sets the default event controller. |
| `setEnabledDays(expected: CalendarSelectedDate[])` | `void` | Sets which days are enabled. |
| `getEnabledDays()` | `CalendarSelectedDate[] \| null \| undefined` | Returns enabled days. |
| `setControllerForEventType(type: string, vcId: string)` | `void` | Sets controller for event type. |
| `getEventVc(eventId: string)` | [`CalendarEventViewController`](#calendareventviewcontroller) | Returns the event view controller. |
| `hasEvent(id: string)` | `boolean` | Returns true if event exists. |
| `mixinEvents(events: CalendarEvent[])` | `void` | Merges events into existing events. |
| `getEvents()` | `CalendarEvent[]` | Returns all events. |
| `setStartDate(date: number)` | `Promise<void>` | Sets the start date (timestamp). |
| `getStartDate()` | `number \| null \| undefined` | Returns the start date. |
| `setSelectedDates(dates: CalendarSelectedDate[])` | `void` | Sets selected dates. |
| `selectDate(year: number, month: number, day: number)` | `void` | Selects a date. |
| `replaceEventsInRange(events: CalendarEvent[], startDate: number, endDate: number)` | `void` | Replaces events in date range. |
| `render()` | `Calendar & { events: CalendarEvent[] }` | Builds and returns the calendar view model. |

### Testing
- Tools: `calendarInteractor`, `calendarSeeder`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/calendars/AssertingCalendars.test.ts`, `src/__tests__/behavioral/calendars/ControllingACalendar.test.ts`, `src/__tests__/behavioral/calendars/ControllingACalendarEvent.test.ts`.

</details>

<details>

<summary><strong>CountdownTimerViewController</strong> - Countdown timer controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `start(toMs: number)` | `void` | Starts the countdown to the specified timestamp. |
| `stop()` | `void` | Stops the countdown. |
| `render()` | `CountdownTimer` | Builds and returns the timer view model. |

### Testing
- Tools: [`countdownTimerAssert`](#countdowntimerassert), `countdownTimerInteractor`.
- Examples: `src/__tests__/behavioral/countdownTimers/AssertingCountdownTimers.test.ts`, `src/__tests__/behavioral/countdownTimers/ControllingCountdownTimers.test.ts`, `src/__tests__/behavioral/countdownTimers/InteractingWithCountdownTimers.test.ts`.

</details>

### Tools and Utilities

<details>

<summary><strong>ToolBeltViewController</strong> - Tool belt controller with optional sticky tools.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `addTool(tool: ToolBeltTool)` | `void` | Adds a tool. |
| `setStickyTool(sticky: StickyTool)` | `void` | Sets a sticky tool at a position. |
| `getStickyTools()` | `Record<StickyToolPosition, ToolBeltTool \| undefined>` | Returns all sticky tools. |
| `clearStickyTools()` | `void` | Clears all sticky tools. |
| `setTools(tools: ToolBeltTool[])` | `void` | Replaces all tools. |
| `removeTool(id: string)` | `void` | Removes a tool by id. |
| `removeStickyTool(position: StickyToolPosition)` | `void` | Removes a sticky tool by position. |
| `getTools()` | `ToolBeltTool[]` | Returns all tools. |
| `clearTools()` | `void` | Clears all tools. |
| `getTool(id: string)` | `ToolBeltTool \| undefined` | Returns a tool by id. |
| `focusTool(id: string)` | `void` | Focuses a tool by id. |
| `renderTools()` | `ToolBeltTool[]` | Returns tools for rendering. |
| `close()` | `void` | Closes the tool belt. |
| `open(options?: { toolId?: string })` | `void` | Opens the tool belt (optionally to a specific tool). |
| `render()` | `ToolBelt` | Builds and returns the tool belt view model. |

### Testing
- Tools: [`toolBeltAssert`](#toolbeltassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/toolbelts/AddingStickyToolsToToolBelt.test.ts`, `src/__tests__/behavioral/toolbelts/AssertingStickyTools.test.ts`, `src/__tests__/behavioral/toolbelts/AssertingTools.test.ts`.

</details>

### Communication and Media

<details>

<summary><strong>FeedViewController</strong> - Feed/chat-style controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `addItem(item: FeedItem)` | `void` | Adds an item to the feed. |
| `removeItem(id: string)` | `void` | Removes an item by id. |
| `setItems(items: FeedItem[])` | `void` | Replaces all items. |
| `getItems()` | `FeedItem[]` | Returns all items. |
| `setScrollMode(mode: 'bottom' \| 'top')` | `void` | Sets the scroll mode. |
| `render()` | `Feed` | Builds and returns the feed view model. |

### Testing
- Tools: [`feedAssert`](#feedassert), `feedInteractor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/feed/ControllingTheFeed.test.ts`, `src/__tests__/behavioral/feed/InteractingWithTheFeed.test.ts`.

</details>

<details>

<summary><strong>MapViewController</strong> - Map controller with pins and view state.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `getPins()` | `MapPin[] \| null \| undefined` | Returns all pins. |
| `setPins(pins: MapPin[])` | `void` | Sets the pins. |
| `addPin(pin: MapPin)` | `void` | Adds a pin. |
| `getZoom()` | `'house' \| 'block' \| 'longWalk' \| 'shortDrive' \| 'city' \| 'state' \| null \| undefined` | Returns the zoom level. |
| `setZoom(zoom: MapZoom)` | `void` | Sets the zoom level. |
| `render()` | `Map` | Builds and returns the map view model. |

### Testing
- Tools: [`mapAssert`](#mapassert), `mapInteractor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/maps/AssertingMaps.test.ts`, `src/__tests__/behavioral/maps/ControllingMaps.test.ts`, `src/__tests__/behavioral/maps/InteractingWithMaps.test.ts`.

</details>

<details>

<summary><strong>TalkingSprucebotViewController</strong> - Sprucebot conversation controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `play()` | `Promise<void>` | Starts playing the sentences. |
| `restart()` | `void` | Restarts from the beginning. |
| `pause()` | `void` | Pauses playback. |
| `getIsPlaying()` | `boolean` | Returns true if currently playing. |
| `setSentences(sentences: SprucebotTypedMessageSentence[])` | `void` | Sets the sentences to speak. |
| `render()` | `TalkingSprucebot` | Builds and returns the talking sprucebot view model. |

### Testing
- Tools: `talkingSprucebotInteractor`, [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/talkingSprucebots/AssertingTalkingSprucebots.test.ts`, `src/__tests__/behavioral/talkingSprucebots/ControllingATalkingSprucebot.test.ts`, `src/__tests__/behavioral/talkingSprucebots/InteractingWithTalkingSprucebot.test.ts`.

</details>

<details>

<summary><strong>WebRtcPlayerViewController</strong> - Video streaming player controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setStreamer(streamer: WebRtcStreamer)` | `void` | Sets the WebRTC streamer. |
| `createOffer(offerOptions?: RTCOfferOptions)` | `Promise<string>` | Creates an SDP offer. |
| `setAnswer(answerSdp: string)` | `Promise<void>` | Sets the SDP answer. |
| `getCrop()` | `WebRtcCropPoint \| null \| undefined` | Returns the current crop point. |
| `enableCropping()` | `void` | Enables crop mode. |
| `disableCropping()` | `void` | Disables crop mode. |
| `setCrop(point?: WebRtcCropPoint)` | `void` | Sets the crop point. |
| `render()` | `WebRtcPlayer` | Builds and returns the WebRTC player view model. |

### Testing
- Tools: `generateCropPointValues`, [`vcAssert`](#vcassert), [`webRtcAssert`](#webrtcassert), `webRtcInteractor`.
- Examples: `src/__tests__/behavioral/webRtcStreaming/AssertingWebrtcPlayer.test.ts`, `src/__tests__/behavioral/webRtcStreaming/ControllingAWebRtcPlayer.test.ts`, `src/__tests__/behavioral/webRtcStreaming/InteractingWithWebRtcPlayers.test.ts`.

</details>

### Reporting and Charts

<details>

<summary><strong>BarChartViewController</strong> - Bar chart controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setDataSets(dataSets: BarChartDataSet[])` | `void` | Sets the bar chart data sets. |
| `render()` | `BarChart` | Builds and returns the bar chart view model. |

### Testing
- Tools: [`chartAssert`](#chartassert).
- Examples: `src/__tests__/behavioral/charts/barChart/AssertingBarCharts.test.ts`, `src/__tests__/behavioral/charts/barChart/ControllingBarCharts.test.ts`.

</details>

<details>

<summary><strong>LineGraphViewController</strong> - Line graph controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setDataSets(dataSets: LineGraphDataSet[])` | `void` | Sets the line graph data sets. |
| `render()` | `LineGraph` | Builds and returns the line graph view model. |

### Testing
- Tools: [`chartAssert`](#chartassert).
- Examples: `src/__tests__/behavioral/charts/lineGraph/AssertingLineGraphs.test.ts`, `src/__tests__/behavioral/charts/lineGraph/ControllingLineGraph.test.ts`.

</details>

<details>

<summary><strong>PolarAreaViewController</strong> - Polar area chart controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setData(data: PolarAreaDataItem[])` | `void` | Sets the polar area data. |
| `render()` | `PolarArea` | Builds and returns the polar area view model. |

### Testing
- Tools: [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/polarArea/PolarAreaViewController.test.ts`.

</details>

<details>

<summary><strong>ProgressViewController</strong> - Progress metrics controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setPercentComplete(percentComplete: number)` | `void` | Sets the percentage complete (0-1). |
| `setTitle(title: string)` | `void` | Sets the title. |
| `getPercentComplete()` | `number \| null \| undefined` | Returns the percentage complete. |
| `render()` | `Progress` | Builds and returns the progress view model. |

### Testing
- Tools: [`progressNavigatorAssert`](#progressnavigatorassert), [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/progress/AssertingProgress.test.ts`, `src/__tests__/behavioral/progress/ControllingAProgressView.test.ts`, `src/__tests__/behavioral/progressNavigator/AssertingProgressNavigator.test.ts`.

</details>

<details>

<summary><strong>RatingsViewController</strong> - Ratings UI controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setIcon(icon: 'star' \| 'radio')` | `void` | Sets the icon style. |
| `getIcon()` | `'star' \| 'radio' \| null \| undefined` | Returns the icon style. |
| `setCanBeChanged(canBeChanged: boolean)` | `void` | Sets whether the rating can be changed. |
| `getCanBeChanged()` | `boolean` | Returns true if the rating can be changed. |
| `setValue(value: number)` | `void` | Sets the rating value. |
| `getValue()` | `number \| null \| undefined` | Returns the rating value. |
| `render()` | `Ratings` | Builds and returns the ratings view model. |

### Testing
- Tools: [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/ratings/AssertingRatingsViews.test.ts`, `src/__tests__/behavioral/ratings/ControllingARatingsView.test.ts`.

</details>

<details>

<summary><strong>StatsViewController</strong> - Statistic tiles controller.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `setValue(idx: number, value: string \| number)` | `void` | Sets the value at the given index. |
| `render()` | `Stats` | Builds and returns the stats view model. |

### Testing
- Tools: [`vcAssert`](#vcassert).
- Examples: `src/__tests__/behavioral/stats/AssertingStats.test.ts`, `src/__tests__/behavioral/stats/ControllingStats.test.ts`.

</details>

---

## Assertion Tools

All assertion tools in this list are declared in `@sprucelabs/heartwood-view-controllers` and are used for testing view controllers. Import them from `@sprucelabs/heartwood-view-controllers/build/tests/utilities/`.

> **Note**: Methods that start with `assert` are typically deprecated in favor of shorter method names (e.g., `assertCardRendersForm` → `cardRendersForm`).

### vcAssert

The main assertion utility for testing view controllers. Handles dialogs, alerts, confirms, cards, skill views, redirects, calendars, and general view controller assertions.

<details>

<summary><strong>vcAssert</strong> - Primary view controller assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `attachTriggerRenderCounter(vc: ViewController<any>)` | `() => number` | Attaches a render counter to track how many times `triggerRender()` is called. |
| `assertTriggerRenderCount(vc: ViewController<any>, expected: number)` | `void` | Asserts the render count equals expected. Call `attachTriggerRenderCounter` first. |
| `assertRendersAsInstanceOf<Vc>(vc: ViewController<any>, Class: new (...args: any[]) => Vc, msg?: string)` | `Vc` | Asserts the controller is an instance of the given class. |
| `assertSkillViewRendersCard(vc: SkillViewController, id?: string)` | `CardViewController` | Asserts a skill view renders a card, optionally by id. |
| `assertSkillViewRendersCards(vc: SkillViewController, ids: string[])` | `CardViewController[]` | Asserts a skill view renders multiple cards by ids. |
| `assertSkillViewDoesNotRenderCard(vc: SkillViewController, id: string)` | `void` | Asserts a skill view does not render a card with the given id. |
| `assertSkillViewDoesNotRenderCards(vc: SkillViewController, ids: string[])` | `void` | Asserts a skill view does not render any of the given card ids. |
| `assertCardRendersSection(vc: ViewController<Card>, sectionIdOrIdx: string \| number)` | `CardSection` | Asserts a card renders a section by id or index. |
| `assertCardRendersSections(vc: ViewController<Card>, ids: string[])` | `CardSection[]` | Asserts a card renders multiple sections. |
| `assertCardDoesNotRenderSection(vc: ViewController<Card>, sectionIdOrIdx: string \| number)` | `void` | Asserts a card does not render a section. |
| `assertCardRendersList(vc: ViewController<Card>, id?: string)` | `ListViewController` | Asserts a card renders a list, optionally by id. |
| `assertCardRendersLists(vc: ViewController<Card>, ids: string[])` | `ListViewController[]` | Asserts a card renders multiple lists by ids. |
| `assertCardDoesNotRenderList(vc: ViewController<Card>, id?: string)` | `void` | Asserts a card does not render a list. |
| `assertCardRendersHeader(vc: ViewController<Card>)` | `CardHeader` | Asserts a card renders a header. |
| `assertCardRendersFooter(vc: ViewController<Card>)` | `CardFooter` | Asserts a card renders a footer. |
| `assertCardDoesNotRenderHeader(vc: ViewController<Card>)` | `void` | Asserts a card does not render a header. |
| `assertCardDoesNotRenderFooter(vc: ViewController<Card>)` | `void` | Asserts a card does not render a footer. |
| `assertSkillViewRendersCalendar(vc: SkillViewController)` | `CalendarViewController` | Asserts a skill view renders a calendar. |
| `assertCardRendersCalendar(vc: ViewController<Card>, id?: string)` | `CalendarViewController` | Asserts a card renders a calendar, optionally by id. |
| `assertRendersDialog(vc: ViewController<any>, action: () => Promise<any> \| any, DialogVc?: new (...args: any[]) => ViewController<any>)` | `Promise<DialogViewController>` | Asserts an action renders a dialog. |
| `assertDoesNotRenderDialog(vc: ViewController<any>, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action does not render a dialog. |
| `assertRendersAlert(vc: ViewController<any>, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action renders an alert dialog. |
| `assertDoesNotRenderAlert(vc: ViewController<any>, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action does not render an alert. |
| `assertRendersConfirm(vc: ViewController<any>, action: () => Promise<any> \| any, options?: { accept?: boolean })` | `Promise<ConfirmViewController>` | Asserts an action renders a confirm dialog. |
| `assertDoesNotRenderConfirm(vc: ViewController<any>, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action does not render a confirm. |
| `assertActionRedirects(options: { action: () => Promise<any>, router: Router, destination: { id: SkillViewControllerId, args?: Record<string, any> } })` | `Promise<void>` | Asserts an action redirects to a destination. |
| `assertActionDoesNotRedirect(options: { action: () => Promise<any>, router: Router })` | `Promise<void>` | Asserts an action does not redirect. |
| `assertControllerInstanceOf(controller: ViewController<any>, Class: any)` | `ViewController<any>` | Asserts a controller is an instance of a class. |
| `assertIsFullScreen(vc: SkillViewController)` | `void` | Asserts a skill view is full screen. |
| `assertIsNotFullScreen(vc: SkillViewController)` | `void` | Asserts a skill view is not full screen. |
| `assertIsCentered(vc: SkillViewController)` | `void` | Asserts a skill view is centered vertically. |
| `assertIsNotCentered(vc: SkillViewController)` | `void` | Asserts a skill view is not centered vertically. |
| `assertLayoutEquals(vc: SkillViewController, expected: 'grid' \| 'big-left' \| 'big-right' \| 'big-top' \| 'big-top-left')` | `void` | Asserts the skill view layout type. |
| `assertCardIsBusy(vc: ViewController<Card>)` | `void` | Asserts a card is in busy state. |
| `assertCardIsNotBusy(vc: ViewController<Card>)` | `void` | Asserts a card is not busy. |
| `assertCardSectionIsBusy(vc: ViewController<Card>, sectionIdOrIdx: string \| number)` | `void` | Asserts a card section is busy. |
| `assertCardSectionIsNotBusy(vc: ViewController<Card>, sectionIdOrIdx: string \| number)` | `void` | Asserts a card section is not busy. |
| `assertCardSectionWillFadeIn(vc: ViewController<Card>, sectionIdOrIdx: string \| number)` | `void` | Asserts a card section has fade-in enabled. |
| `assertCardSectionWillNotFadeIn(vc: ViewController<Card>, sectionIdOrIdx: string \| number)` | `void` | Asserts a card section does not have fade-in. |
| `assertRendersValidCard(vc: ViewController<any>)` | `void` | Asserts the view model passes schema validation. |

### Testing
- Examples: `src/__tests__/behavioral/vcAssert.test.ts`.

</details>

### formAssert

Assertion utility for testing form view controllers.

<details>

<summary><strong>formAssert</strong> - Form view controller assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersForm(vc: ViewController<Card>, id?: string)` | `FormViewController<any>` | Asserts a card renders a form, optionally by id. |
| `skillViewRendersForm(vc: SkillViewController, formId?: string)` | `FormViewController<any>` | Asserts a skill view renders a form. |
| `cardDoesNotRenderForm(vc: ViewController<Card>, id?: string)` | `void` | Asserts a card does not render a form. |
| `formRendersSection(vc: FormViewController<any>, sectionIdOrIdx: string \| number)` | `FormSection<any>` | Asserts a form renders a section. |
| `formDoesNotRenderSection(vc: FormViewController<any>, sectionIdOrIdx: string \| number)` | `void` | Asserts a form does not render a section. |
| `formRendersField(vc: FormViewController<any>, fieldName: string)` | `FieldRenderOptions<any>` | Asserts a form renders a field. |
| `formDoesNotRenderField(vc: FormViewController<any>, fieldName: string)` | `void` | Asserts a form does not render a field. |
| `formIsDisabled(vc: FormViewController<any>)` | `void` | Asserts a form is disabled. |
| `formIsEnabled(vc: FormViewController<any>)` | `void` | Asserts a form is enabled. |
| `formIsValid(vc: FormViewController<any>)` | `void` | Asserts a form has no validation errors. |
| `formIsInvalid(vc: FormViewController<any>)` | `void` | Asserts a form has validation errors. |
| `formFieldRendersAs(vc: FormViewController<any>, fieldName: string, renderAs: FieldRenderAs)` | `void` | Asserts a field renders with a specific type. |
| `formFieldRendersUsingInstanceOf(vc: FormViewController<any>, fieldName: string, Class: any)` | `ViewController<any>` | Asserts a field renders using a specific controller class. |
| `inputVcIsValid(vc: FormInputViewController)` | `void` | Asserts an input view controller is valid. |
| `inputVcIsInvalid(vc: FormInputViewController)` | `void` | Asserts an input view controller is invalid. |
| `skillViewRendersFormBuilder(vc: SkillViewController)` | `FormBuilderCardViewController` | Asserts a skill view renders a form builder. |
| `cardRendersFormBuilder(vc: ViewController<Card>)` | `FormBuilderCardViewController` | Asserts a card renders a form builder. |
| `formFieldIsRequired(vc: FormViewController<any>, fieldName: string)` | `void` | Asserts a form field is required. |
| `formFieldIsNotRequired(vc: FormViewController<any>, fieldName: string)` | `void` | Asserts a form field is not required. |

### Testing
- Examples: `src/__tests__/behavioral/forms/AssertingForms.test.ts`.

</details>

### listAssert

Assertion utility for testing list view controllers.

<details>

<summary><strong>listAssert</strong> - List view controller assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersList(vc: ViewController<Card>, id?: string)` | `ListViewController` | Asserts a card renders a list. |
| `listRendersRows(vc: ListViewController, ids: string[])` | `void` | Asserts a list renders rows with the given ids. |
| `listDoesNotRenderRows(vc: ListViewController, ids: string[])` | `void` | Asserts a list does not render rows with the given ids. |
| `listRendersRow(vc: ListViewController, id: string)` | `ListRow` | Asserts a list renders a row and returns it. |
| `listDoesNotRenderRow(vc: ListViewController, id: string)` | `void` | Asserts a list does not render a row. |
| `rowRendersCell(vc: ListViewController, rowId: string, cellId: string)` | `ListCell` | Asserts a row renders a cell. |
| `rowDoesNotRenderCell(vc: ListViewController, rowId: string, cellId: string)` | `void` | Asserts a row does not render a cell. |
| `rowRendersCheckBox(vc: ListViewController, rowId: string)` | `void` | Asserts a row renders a checkbox. |
| `rowDoesNotRenderCheckBox(vc: ListViewController, rowId: string)` | `void` | Asserts a row does not render a checkbox. |
| `rowRendersToggle(vc: ListViewController, rowId: string)` | `void` | Asserts a row renders a toggle. |
| `rowDoesNotRenderToggle(vc: ListViewController, rowId: string)` | `void` | Asserts a row does not render a toggle. |
| `rowRendersButton(vc: ListViewController, rowId: string, buttonId?: string)` | `Button` | Asserts a row renders a button. |
| `rowDoesNotRenderButton(vc: ListViewController, rowId: string, buttonId?: string)` | `void` | Asserts a row does not render a button. |
| `rowRendersContent(vc: ListViewController, rowId: string)` | `string` | Asserts a row renders content text. |
| `rowRendersInput(vc: ListViewController, rowId: string, cellIdOrIdx?: string \| number)` | `FormInputViewController` | Asserts a row renders an input. |
| `rowRendersSelect(vc: ListViewController, rowId: string, cellIdOrIdx?: string \| number)` | `SelectViewController` | Asserts a row renders a select. |
| `rowRendersImage(vc: ListViewController, rowId: string)` | `void` | Asserts a row renders an image. |
| `rowRendersAvatar(vc: ListViewController, rowId: string, avatarId?: string)` | `void` | Asserts a row renders an avatar. |
| `rowRendersRatings(vc: ListViewController, rowId: string)` | `RatingsViewController` | Asserts a row renders ratings. |
| `rowIsEnabled(vc: ListViewController, rowId: string)` | `void` | Asserts a row is enabled. |
| `rowIsDisabled(vc: ListViewController, rowId: string)` | `void` | Asserts a row is disabled. |
| `rowIsSelected(vc: ListViewController, rowId: string)` | `void` | Asserts a row is selected. |
| `rowIsNotSelected(vc: ListViewController, rowId: string)` | `void` | Asserts a row is not selected. |
| `rowIsChecked(vc: ListViewController, rowId: string)` | `void` | Asserts a row checkbox is checked. |
| `rowIsNotChecked(vc: ListViewController, rowId: string)` | `void` | Asserts a row checkbox is not checked. |
| `rowIsDeleted(vc: ListViewController, rowId: string)` | `void` | Asserts a row has been deleted (style). |
| `rowIsNotDeleted(vc: ListViewController, rowId: string)` | `void` | Asserts a row is not deleted. |
| `rowIsToggled(vc: ListViewController, rowId: string)` | `void` | Asserts a row toggle is on. |
| `rowIsNotToggled(vc: ListViewController, rowId: string)` | `void` | Asserts a row toggle is off. |
| `listIsBusy(vc: ListViewController)` | `void` | Asserts a list is in busy state. |
| `listIsNotBusy(vc: ListViewController)` | `void` | Asserts a list is not busy. |
| `rowsAreSelectable(vc: ListViewController)` | `void` | Asserts list rows are selectable. |
| `rowsAreNotSelectable(vc: ListViewController)` | `void` | Asserts list rows are not selectable. |

### Testing
- Examples: `src/__tests__/behavioral/lists/AssertingLists.test.ts`.

</details>

### buttonAssert

Assertion utility for testing buttons in cards and button bars.

<details>

<summary><strong>buttonAssert</strong> - Button assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersButton(vc: ViewController<Card>, id: string)` | `ButtonViewController` | Asserts a card renders a button with the given id. |
| `cardRendersButtons(vc: ViewController<Card>, ids: string[])` | `ButtonViewController[]` | Asserts a card renders multiple buttons. |
| `cardDoesNotRenderButton(vc: ViewController<Card>, id: string)` | `void` | Asserts a card does not render a button. |
| `cardDoesNotRenderButtons(vc: ViewController<Card>, ids: string[])` | `void` | Asserts a card does not render any of the given buttons. |
| `buttonIsEnabled(vc: ViewController<Card>, id: string)` | `void` | Asserts a button is enabled. |
| `buttonIsDisabled(vc: ViewController<Card>, id: string)` | `void` | Asserts a button is disabled. |
| `buttonIsSelected(vc: ViewController<Card>, id: string)` | `void` | Asserts a button is selected. |
| `buttonBarRendersButton(buttonBarVc: ButtonBarViewController, buttonId: string)` | `void` | Asserts a button bar renders a button. |
| `cardRendersButtonBar(cardVc: ViewController<Card>)` | `ButtonBarViewController` | Asserts a card renders a button bar. |
| `cardRendersButtonGroup(cardVc: ViewController<Card>)` | `ButtonGroupViewController` | Asserts a card renders a button group. |
| `buttonGroupIsMultiSelect(buttonGroupVc: ButtonGroupViewController)` | `void` | Asserts a button group allows multi-select. |
| `cardSectionRendersButton(vc: ViewController<Card>, sectionIdOrIdx: string \| number, buttonId?: string)` | `void` | Asserts a card section renders a button. |
| `footerRendersButtonWithType(vc: ViewController<Card \| Dialog>, type?: Button['type'])` | `void` | Asserts footer renders a button of the given type. |
| `lastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(vc: ViewController<Card>)` | `void` | Asserts the last footer button is primary. |

### Testing
- Examples: `src/__tests__/behavioral/buttons/AssertingButtons.test.ts`.

</details>

### toolBeltAssert

Assertion utility for testing tool belt view controllers.

<details>

<summary><strong>toolBeltAssert</strong> - Tool belt assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `rendersToolBelt(svcOrToolBelt: SkillViewController \| ToolBeltViewController, assertHasAtLeast1Tool?: boolean)` | `ToolBeltViewController` | Asserts a skill view renders a tool belt. |
| `doesNotRenderToolBelt(svc: SkillViewController)` | `void` | Asserts a skill view does not render a tool belt. |
| `hidesToolBelt(svc: SkillViewController)` | `void` | Asserts a tool belt is hidden (returns null). |
| `toolBeltRendersTool(svcOrToolBelt: SkillViewController \| ToolBeltViewController, toolId: string)` | `ViewController<Card>` | Asserts a tool belt renders a tool. |
| `toolBeltDoesNotRenderTool(svc: SkillViewController \| ToolBeltViewController, toolId: string)` | `void` | Asserts a tool belt does not render a tool. |
| `toolInstanceOf(svcOrToolBelt: SkillViewController \| ToolBeltViewController, toolId: string, Class: any)` | `ViewController<any>` | Asserts a tool is an instance of a class. |
| `toolBeltStickyToolInstanceOf(options: { toolBeltVc: ToolBeltViewController, position: StickyToolPosition, Class: any })` | `ViewController<any>` | Asserts a sticky tool is an instance of a class. |
| `toolBeltDoesNotRenderStickyTools(svcOrToolBelt: SkillViewController \| ToolBeltViewController)` | `void` | Asserts no sticky tools are rendered. |
| `actionFocusesTool(svcOrToolBelt: SkillViewController \| ToolBeltViewController, toolId: string, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action focuses a tool. |
| `actionOpensToolBelt(svcOrToolBelt: SkillViewController \| ToolBeltViewController, action: () => Promise<any> \| any, options?: OpenToolBeltOptions)` | `Promise<void>` | Asserts an action opens the tool belt. |
| `actionDoesNotOpenToolBelt(svcOrToolBelt: SkillViewController \| ToolBeltViewController, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action does not open the tool belt. |
| `actionClosesToolBelt(svcOrToolBelt: SkillViewController \| ToolBeltViewController, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action closes the tool belt. |
| `actionDoesNotCloseToolBelt(svcOrToolBelt: SkillViewController \| ToolBeltViewController, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action does not close the tool belt. |

### Testing
- Examples: `src/__tests__/behavioral/toolBelts/AssertingToolBelts.test.ts`.

</details>

### navigationAssert

Assertion utility for testing navigation view controllers.

<details>

<summary><strong>navigationAssert</strong> - Navigation assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `skillViewRendersNavigation(vc: SkillViewController, msg?: string)` | `ViewController<Navigation>` | Asserts a skill view renders navigation. |
| `skillViewDoesNotRenderNavigation(vc: SkillViewController)` | `void` | Asserts a skill view does not render navigation. |
| `appRendersNavigation(vc: AppController)` | `ViewController<Navigation>` | Asserts an app controller renders navigation. |
| `appDoesNotRenderNavigation(vc: AppController)` | `void` | Asserts an app controller does not render navigation. |
| `rendersButton(vc: ViewController<Navigation>, id: string)` | `void` | Asserts navigation renders a button. |
| `rendersButtons(vc: ViewController<Navigation>, ids: string[])` | `void` | Asserts navigation renders multiple buttons. |
| `doesNotRenderButton(vc: ViewController<Navigation>, id: string)` | `void` | Asserts navigation does not render a button. |
| `rendersButtonLabels(vc: ViewController<Navigation>)` | `void` | Asserts navigation renders button labels. |
| `buttonRedirectsTo(options: { vc: ViewController<Navigation>, button: string, destination: { id: SkillViewControllerId, args?: Record<string, any> } })` | `void` | Asserts a button redirects to a destination. |
| `buttonRequiresViewPermissions(vc: ViewController<Navigation>, button: string, permissionContractId: PermissionContractId)` | `void` | Asserts a button requires view permissions. |
| `hasAdditionalValidRoutes(vc: ViewController<Navigation>, routes: NavigationRoute[])` | `void` | Asserts navigation has additional valid routes. |
| `isHidden(vc: ViewController<Navigation>)` | `void` | Asserts navigation is hidden. |
| `isVisible(vc: ViewController<Navigation>)` | `void` | Asserts navigation is visible. |

### Testing
- Examples: `src/__tests__/behavioral/navigation/AssertingNavigation.test.ts`.

</details>

### activeRecordCardAssert

Assertion utility for testing active record card view controllers.

<details>

<summary><strong>activeRecordCardAssert</strong> - Active record card assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `rendersAsActiveRecordCard(vc: ViewController<Card>)` | `void` | Asserts a card is an active record card. |
| `skillViewRendersActiveRecordCard(svc: SkillViewController, id?: string)` | `ActiveRecordCardViewController` | Asserts a skill view renders an active record card. |
| `pagingOptionsEqual(vc: ActiveRecordCardViewController, expected: ActiveRecordPagingOptions)` | `void` | Asserts paging options match expected values. |

### Testing
- Examples: `src/__tests__/behavioral/activeRecord/AssertingActiveRecordCards.test.ts`.

</details>

### activeRecordListAssert

Assertion utility for testing active record list view controllers.

<details>

<summary><strong>activeRecordListAssert</strong> - Active record list assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersActiveRecordList(vc: ViewController<Card>, id?: string)` | `ActiveRecordListViewController` | Asserts a card renders an active record list. |
| `cardDoesNotRendersActiveRecordList(vc: CardViewController, id?: string)` | `void` | Asserts a card does not render an active record list. |

### Testing
- Examples: `src/__tests__/behavioral/activeRecord/AssertingActiveRecordLists.test.ts`.

</details>

### toastAssert

Assertion utility for testing toast messages.

<details>

<summary><strong>toastAssert</strong> - Toast message assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `rendersToast(cb: () => any \| Promise<any>)` | `Promise<ToastMessage>` | Asserts an action renders a toast and returns the message. |
| `doesNotRenderToast(cb: () => any \| Promise<any>)` | `Promise<void>` | Asserts an action does not render a toast. |
| `toastMatches(action: () => Promise<any> \| any, message: Partial<ToastMessage>)` | `Promise<ToastMessage>` | Asserts a toast matches expected properties. |

### Testing
- Examples: `src/__tests__/behavioral/toasts/AssertingToastMessages.test.ts`.

</details>

### chartAssert

Assertion utility for testing chart view controllers.

<details>

<summary><strong>chartAssert</strong> - Chart assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersLineGraph(cardVc: ViewController<Card>, id?: string)` | `ViewController<LineGraph>` | Asserts a card renders a line graph. |
| `cardRendersBarChart(cardVc: ViewController<Card>, id?: string)` | `ViewController<BarChart>` | Asserts a card renders a bar chart. |
| `dataSetsEqual(chartVc: ViewController<BarChart> \| ViewController<LineGraph>, dataSets: ChartDataSet[])` | `void` | Asserts chart data sets match expected values. |

### Testing
- Examples: `src/__tests__/behavioral/charts/AssertingCharts.test.ts`.

</details>

### autocompleteAssert

Assertion utility for testing autocomplete input view controllers.

<details>

<summary><strong>autocompleteAssert</strong> - Autocomplete input assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `actionShowsSuggestions(vc: AutocompleteInputViewController, action: () => Promise<any> \| any, expectedSuggestionIds?: string[])` | `Promise<void>` | Asserts an action shows suggestions. |
| `actionHidesSuggestions(vc: AutocompleteInputViewController, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action hides suggestions. |
| `suggestionsAreShowing(vc: AutocompleteInputViewController, suggestionIds: string[])` | `void` | Asserts specific suggestions are showing. |
| `suggestionIsShowing(vc: AutocompleteInputViewController, suggestionId: string)` | `void` | Asserts a suggestion is showing. |
| `suggestionIsNotShowing(vc: AutocompleteInputViewController, suggestionId: string)` | `void` | Asserts a suggestion is not showing. |

### Testing
- Examples: `src/__tests__/behavioral/autocomplete/AssertingAutocompleteSuggestions.test.ts`.

</details>

### mapAssert

Assertion utility for testing map view controllers.

<details>

<summary><strong>mapAssert</strong> - Map assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `assertCardRendersMap(vc: ViewController<Card>)` | `ViewController<Map>` | Asserts a card renders a map. |
| `assertMapHasPin(vc: ViewController<Map>, pin: Partial<MapPin>)` | `void` | Asserts a map has a pin matching the given values. |

### Testing
- Examples: `src/__tests__/behavioral/maps/AssertingMaps.test.ts`.

</details>

### pagerAssert

Assertion utility for testing pager view controllers.

<details>

<summary><strong>pagerAssert</strong> - Pager assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersPager(vc: ViewController<Card>, id?: string)` | `PagerViewController` | Asserts a card renders a pager. |
| `cardDoesNotRenderPager(vc: ViewController<Card>, id?: string)` | `void` | Asserts a card does not render a pager. |
| `totalPages(vc: ViewController<Pager>, expected: number)` | `void` | Asserts total pages equals expected. |
| `currentPage(vc: ViewController<Pager>, expected: number)` | `void` | Asserts current page equals expected. |
| `pagerIsCleared(vc: ViewController<Pager>)` | `void` | Asserts pager is cleared (no pages configured). |
| `pagerIsConfigured(vc: ViewController<Pager>)` | `void` | Asserts pager is configured (has pages set). |

### Testing
- Examples: `src/__tests__/behavioral/pagers/AssertingPagers.test.ts`.

</details>

### feedAssert

Assertion utility for testing feed view controllers.

<details>

<summary><strong>feedAssert</strong> - Feed assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersFeed(vc: ViewController<Card>)` | `FeedViewController` | Asserts a card renders a feed. |
| `scrollModeEquals(vc: ViewController<Feed>, expected: ScrollMode)` | `void` | Asserts feed scroll mode equals expected. |

### Testing
- Examples: `src/__tests__/behavioral/feeds/AssertingFeeds.test.ts`.

</details>

### progressNavigatorAssert

Assertion utility for testing progress navigator view controllers.

<details>

<summary><strong>progressNavigatorAssert</strong> - Progress navigator assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `skillViewRendersNavigator(vc: SkillViewController)` | `ProgressNavigatorViewController` | Asserts a skill view renders a progress navigator. |
| `skillViewDoesNotRenderNavigator(vc: SkillViewController)` | `void` | Asserts a skill view does not render a progress navigator. |
| `rendersStep(vc: ViewController<ProgressNavigator>, stepId: string)` | `void` | Asserts progress navigator renders a step. |
| `rendersSteps(vc: ViewController<ProgressNavigator>, stepIds: string[])` | `void` | Asserts progress navigator renders multiple steps. |
| `stepIsComplete(vc: ViewController<ProgressNavigator>, stepId: string)` | `void` | Asserts a step is complete. |
| `stepIsNotComplete(vc: ViewController<ProgressNavigator>, stepId: string)` | `void` | Asserts a step is not complete. |
| `currentStep(vc: ViewController<ProgressNavigator>, stepId: string)` | `void` | Asserts the current step matches. |

### Testing
- Examples: `src/__tests__/behavioral/progressNavigator/AssertingProgressNavigator.test.ts`.

</details>

### deviceAssert

Assertion utility for testing device interactions.

<details>

<summary><strong>deviceAssert</strong> - Device interaction assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `wasVibrated(vc: AbstractViewController<any>)` | `void` | Asserts the device was vibrated. |
| `wasNotVibrated(vc: AbstractViewController<any>)` | `void` | Asserts the device was not vibrated. |
| `madeCall(vc: AbstractViewController<any>, number: string)` | `void` | Asserts a phone call was made to the given number. |
| `openedUrl(vc: AbstractViewController<any>, url: string)` | `void` | Asserts a URL was opened. |
| `isTorchOn(vc: AbstractViewController<any>, expectedBrightness?: number)` | `void` | Asserts the device torch is on. |
| `isTorchOff(vc: AbstractViewController<any>)` | `void` | Asserts the device torch is off. |

### Testing
- Examples: `src/__tests__/behavioral/device/AssertingDeviceInteractions.test.ts`.

</details>

### lockScreenAssert

Assertion utility for testing lock screen rendering.

<details>

<summary><strong>lockScreenAssert</strong> - Lock screen assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `actionRendersLockScreen(svcOrApp: AbstractSkillViewController \| AbstractAppController, action: () => Promise<any> \| any)` | `Promise<LockScreenSkillViewController>` | Asserts an action renders a lock screen. |
| `actionDoesNotRenderLockScreen(svcOrApp: AbstractSkillViewController \| AbstractAppController, action: () => Promise<any> \| any)` | `Promise<void>` | Asserts an action does not render a lock screen. |

### Testing
- Examples: `src/__tests__/behavioral/lockScreen/AssertingLockScreens.test.ts`.

</details>

### countdownTimerAssert

Assertion utility for testing countdown timer view controllers.

<details>

<summary><strong>countdownTimerAssert</strong> - Countdown timer assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `cardRendersCountdownTimer(vc: ViewController<Card>)` | `CountdownTimerViewController` | Asserts a card renders a countdown timer. |
| `timerStartedWithEndDate(vc: ViewController<CountdownTimer>, endDateMs: number)` | `void` | Asserts timer started with the exact end date. |
| `timerStartedWithEndDateInRangeInclusive(vc: ViewController<CountdownTimer>, bottomMs: number, topMs: number)` | `void` | Asserts timer started within a date range. |
| `timerIsStopped(vc: ViewController<CountdownTimer>)` | `void` | Asserts timer is stopped. |

### Testing
- Examples: `src/__tests__/behavioral/countdownTimer/AssertingCountdownTimers.test.ts`.

</details>

### vcDurationAssert

Assertion utility for testing duration utility configuration.

<details>

<summary><strong>vcDurationAssert</strong> - Duration utility assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `beforeEach(views: Pick<ViewControllerFactory, 'setDates'>)` | `void` | Sets up duration assert in beforeEach. Call this before creating view controllers. |
| `durationUtilIsConfiguredForVc(vc: ViewController<any>)` | `void` | Asserts durationUtil is configured for the view controller. |

### Testing
- Examples: `src/__tests__/behavioral/duration/AssertingDurationConfiguration.test.ts`.

</details>

### vcPluginAssert

Assertion utility for testing view controller plugins.

<details>

<summary><strong>vcPluginAssert</strong> - Plugin assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `pluginIsInstalled<Plugin>(vc: ViewController<any>, named: string, PluginClass?: new (options: any) => Plugin)` | `Plugin` | Asserts a plugin is installed on the view controller. |

### Testing
- Examples: `src/__tests__/behavioral/plugins/AssertingPlugins.test.ts`.

</details>

### webRtcAssert

Assertion utility for testing WebRTC player view controllers.

<details>

<summary><strong>webRtcAssert</strong> - WebRTC player assertion utility.</summary>

### API

| Method | Returns | Description |
|---|---|---|
| `beforeEach(views: SimpleViewControllerFactory)` | `void` | Sets up WebRTC mocking in beforeEach. Call this before creating view controllers. |
| `cardRendersPlayer(vc: ViewController<Card>, id?: string)` | `WebRtcPlayerViewController` | Asserts a card renders a WebRTC player. |
| `actionCreatesOffer(vc: WebRtcPlayerViewController, action: () => void \| Promise<void>, expectedOptions?: RTCOfferOptions)` | `Promise<string>` | Asserts an action creates an RTC offer. Returns the offer SDP. |
| `answerSet(vc: WebRtcPlayerViewController, answerSdp?: string)` | `Promise<void>` | Asserts an answer was set on the player. |
| `croppingIsEnabled(vc: WebRtcPlayerViewController)` | `void` | Asserts cropping is enabled. |
| `croppingIsDisabled(vc: WebRtcPlayerViewController)` | `void` | Asserts cropping is disabled. |
| `assertCropEquals(vc: WebRtcPlayerViewController, expectedCrop?: WebRtcCropPoint)` | `void` | Asserts crop settings match expected values. |

### Testing
- Examples: `src/__tests__/behavioral/webRtc/AssertingWebRtcPlayers.test.ts`.

</details>
