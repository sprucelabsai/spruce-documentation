## `SkillView` Lifecycle

These are the methods and their order called when your Skill View renders on screen.

Keep in mind your `SkillView`'s `render()` method is called first, so you have to setup your `SkillView` to render nicely before load.

<img src="../../assets/img/concepts/skill_view_lifecycle.png">

### Lifecycle Description

Whenever a `SkillView` is rendered, your `SkillViewController` is pushed onto the `NavigationViewController` (inside the `Heartwood Skill`) and immediately rendered (by calling `render()`). Then, the lifecycle methods are called in the following order:

1. A request is made to the `Theatre` and is handled by `Heartwood`.
2. `Heartwood` loads the requested `SkillViewController` and pushes it onto the `NavigationViewController`.
2. If a `SkillView` is already focused.
    - `willBlur(): Promise<void>` is called on the focused `SkillViewController`
    - This is chance to do something just before your `SkillView` is sent to the background.
2. `willFocus(): Promise<void>` is called on the `SkillViewController` that is about to be focused.
    - You can run any last minute operations before your `SkillView` is brought to the foreground.
    - Your access to resources (like `Router` or `Authenticator`) is limited, so you can't do anything too heavy here.
3. If your `Skill` as an `AppViewController` defined:
    - `load()` is called on the `AppViewController`.
    - This is the time to load anything all your `SkillViews` may need and that you want to share between them.
    - You can also the `AppViewController` to render the `NavigationViewController` you want shared across all your `SkillViews`.
3. `getIsLoginRequired(): Promise<bool>` is called on the `SkillViewController` that is about to be focused.
    - If `true`, the `NavigationViewController` will render a `LoginCardViewController` as a `Dialog`.
    - If the person fails to login, they are redirected to the `RootSkillViewController` of the `Heartwood Skill`.
5. `getScope(): ScopeFlags[]` is called on the `SkillViewController` that is about to be focused.
    - Allow you to configure if your `SkillView`'s actions are scoped to a `Location` or an `Organization`.
    - You can learn more about `Scope` in the [Scope Section](/concepts/scope/).
6. `load(options: SkillViewControllerLoadOptions): Promise<void>` is called on the `SkillViewController` that is about to be focused.
    - This is the best time for your heavy lifting.
    - Your skill view is loaded after all prerequisites are met (logged in & `Scope`)
    - Remember: Your `SkillView` as already focused at this point.
7. `didFocus(): Promise<void>` is called on the `SkillViewController` that is about to be focused.
    - A chance to do something after your `SkillView` is brought to the foreground & loaded.
8. If there was a previously focused `SkillViewController`:
    - `didBlur(): Promise<void>` is called
        - Now that the previously focused `SkillView` is in the background, you can do any cleanup.
    - `destroy(): Promise<void>` is called
        - This is the final chance to do cleanup. 
        - Remove all listeners, clear intervals, etc.
