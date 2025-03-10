# Scope

Spruce has the ability to allow multiple `Organizations` to signup for accounts. It also allows them to add `Locations` and `People` under those `Organizations` & `Locations`. `SkillViews` can be set to a `Scope` to ensure operations are only done at the current `Organization` or `Location`. Here are the scopes:

1. Global
    - All operations are happening at the platform level. 
    - This is the highest level of `Scope` and requires someone to have a global role.
    - Someone who has this role will still not have access to all the data under `Organizations` and `Locations`.
2. Organization
    - All operations are happening at the 'Organization' level.
    - Someone with an `Organization` `Role` has the same `Role` at all `Locations` under that `Organization`.
    - `Roles` are configured at an `Organization` level, but can be given to `People` at a `Location` level.
    - We would say they are `Scoped` to that `Organization`.
3. Location
    - All operations are happening at the `Location` level.
    - Someone with a `Location` `Role` can only see data at that `Location`.
    - We would say they are `Scoped` to that `Location`.
4. Employed
    - This `Scope` applies only to `SkillViews`.
    - `Events` use `Role` to determine access.
    - Is used in combination with `Organization` and `Location` `Scopes`.
    - Ensures the `Person` has a `Role` based on the following:
        - `Owner`
        - `Group Manager`
        - `Manager`
        - `Teammate`


## Scope in Action
The video below is the `locations.root` `SkillView`. It has been `Scoped` to `Organization` and `Employed`. Any `SkillView` that has `Scope` will render the `ToolBelt` on the right that allows you to change the `Scope` (in this case, changing the current `Organization`).
<div class="video scope shadow">
    <video autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline">
        <source src="https://spruce-theatre.s3.us-east-1.amazonaws.com/Scope.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>

## ScopeFlag

The `ScopeFlag` type is an enum that is used to define the `Scope` of a `SkillView`. Here is the type (exported from `@sprucelabs/heartwood-view-controllers`):

```ts
export type ScopeFlag = 'location' | 'organization' | 'employed' | 'none';
```

## Applying `Scope` to your `SkillView`

<details>
    <summary><strong>Test 1:</strong> Asserting your <em>SkillView</em> is scoped correctly</summary>

We're going to start with a test that already has a `SkillView` ready to go and is available at `this.vc`. 

```ts
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { vcAssert } from '@sprucelabs/heartwood-view-controllers'   

export default class RenderingARemoteCard extends AbstractSpruceFixtureTest {
    private vc!: RootSkillViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.views.Controller('eightbitstories.root', {})
    }

    @test()
    protected async mustBeScopedByOrganization() {
        vcAssert.assertSkillViewScopedBy(this.vc, ['organization'])
    }
    
}
```
</details>

<details>
    <summary><strong>Production 1:</strong> Scoping your <em>SkillView</em></summary>

We're going to start with a test that already has a `SkillView` ready to go and is available at `this.vc`. 

```ts
import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
    ScopeFlag,
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'
    protected cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
    }

    public getScope = () => ['organization'] as ScopeFlag[]

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [],
                },
            ],
        }
    }
}

```
</details>

## Pulling Scope From a `SkillView`

The currenty `Organization` or `Location` can be pulled out of the `Scope` object passed to the `load()` `lifecycle` method of your `SkillView`.

> **Note:** Even though the results to `getCurrentOrganization()` and `getCurrentLocation()` are optional, they will always be set according to the `Scope` of the `SkillView`.

```ts
import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    SkillViewControllerLoadOptions,
    ScopeFlag,
} from '@sprucelabs/heartwood-view-controllers'

export default class OrganizationDashboardSkillViewController extends AbstractSkillViewController {
    public static id = 'organization-dashboard'

    public constructor(options: ViewControllerOptions) {
        super(options)
    }

    public getScope = () => ['organization'] as ScopeFlag[]

    public async load(options: SkillViewControllerLoadOptions) {
        const { scope } = options

        //current organization in scope, will be set because we are scoped to organization
        const organization = await scope.getCurrentOrganization()
        console.log('Current Organization:', organization)

        //current location in scope, will be empty because we are scoped to organization
        const location = await scope.getCurrentLocation()
        console.log('Current Location:', location)
    }

    public render(): SkillView {
        return buildSkillViewLayout('big-left', {
            leftCards: [this.detectionsCardVc.render()],
            rightCards: [this.locationsCardVc.render()],
        })
    }
}


```


### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>