# Permissions

Permissions are handled by 2 main classes: `Authenticator` and `Authorizer`. The `Authenticator` is responsible for checking if someone is logged in, and the `Authorizer` is responsible for checking if a logged in person has the right permissions to do something.

## Important Classes

### Authenticator
See if someone is logged in, who it is, and persist a session token to keep a person logged in.
```ts
export interface Authenticator {
    //Get the logged in person, if someone is logged in
    getPerson(): Person | null
    //Log a person in by setting their token and Person record.
    setSessionToken(token: string, person: Person): void
    //Get the session token of a logged in person
    getSessionToken(): string | null
    //Check if someone is logged in
    isLoggedIn(): boolean
    //Clear the session, logging the person out
    clearSession(): void
    //Add an event listener for when someone logs in or out to take some action
    addEventListener<N extends 'did-login' | 'did-logout'>(
        name: N,
        cb: Payloads[N]
    ): void
    
    //Remove an event listener, passing no cb will remove all listeners for that event
    removeEventListener<N extends 'did-login' | 'did-logout'>(
        name: N,
        cb?: Payloads[N]
    ): void
}

type DidLoginPayload = (payload: { token: string; person: Person }) => void
type DidLogoutPayload = (payload: { person: Person }) => void

interface Payloads {
    'did-login': DidLoginPayload
    'did-logout': DidLogoutPayload
}
```
### Authorizer
Check if a person has the right permissions to do something. Works if someone is not logged in.

```ts
export interface Authorizer {
    //Check if the current person has a permission
    can<
        ContractId extends PermissionContractId,
        Ids extends PermissionId<ContractId>,
    >(
        options: AuthorizerCanOptions<ContractId, Ids>
    ): Promise<Record<Ids, boolean>>

    //Save permissions for a person. Note: the person must have the permission to save permissions
    savePermissions<
        ContractId extends PermissionContractId,
        Ids extends PermissionId<ContractId>,
    >(
        options: SavePermissionsOptions<ContractId, Ids>
    ): Promise<void>
}

//Options sent to authorizer.can(...)
export interface AuthorizerCanOptions<
    ContractId extends PermissionContractId,
    Ids extends PermissionId<ContractId> = PermissionId<ContractId>,
> {
    contractId: ContractId
    permissionIds: Ids[]
    target?: SpruceSchemas.Mercury.v2020_12_25.GetResolvedPermissionsContractEmitTarget
}

//When checking can(...), you can override the target to check against. It'll default to the logged in user and their current scope (location or organization)
namespace SpruceSchemas.Mercury.v2020_12_25 {
    interface SavePermissionsEmitTarget {
        'locationId'?: string | undefined | null;
        'organizationId'?: string | undefined | null;
        'permissionPersonId'?: string | undefined | null;
        'permissionSkillId'?: string | undefined | null;
        'permissionContractId': string;
        'roleId'?: string | undefined | null;
    }
}

//Options sent to authorizer.savePermissions(...)
export interface SavePermissionsOptions<
    ContractId extends PermissionContractId,
    Ids extends PermissionId<ContractId>,
> {
    target: SavePermissionsTarget & { personId?: string; skillId?: string }
    contractId: ContractId
    permissions: {
        id: Ids
        can: StatusFlag
    }[]
}

//The target for saving permissions
type SavePermissionsTarget = Omit<
    SpruceSchemas.Mercury.v2020_12_25.SavePermissionsEmitTarget,
    'permissionPersonId' | 'permissionContractId' | 'permissionSkillId'
>

```
## Checking in the backend

Coming soon...

## Checking in Skill Views

### Redirecting if someone is not logged in

#### Test 1: Check for redirect on load
We're going to write this test with the person not logged in and redirect, but it'll take another test to get the `Authenticator` into the production code.

```ts
import { fake, AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'

//@fake.login() will ensure a fake person is logged in for each test
@fake.login()
export default class RootSkillViewTest extends AbstractSpruceFixtureTest {

    @test()
    protected static async redirectsToOnboardingIfNotLoggedIn() {
        const vc = this.views.Controller('eightbitstories.root', {})

        //first thing we do is log the person back out =)
        this.permissions.getAuthenticator().clearSession()

        //Assert that loading the skill view redirects
        await vcAssert.assertActionRedirects({
            action: () => this.views.load(vc),
            router: this.views.getRouter(),
            destination: {
                id: 'eightbitstories.onboarding',
            },
        })
    }
}
```

#### Production 1: Redirect no matter what
We actually don't need to check if the person is logged in yet! Go TDD!

```ts
import { AbstractSkillViewController, SkillViewControllerLoadOptions } from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {

    public async load(
        options: SkillViewControllerLoadOptions
    ): Promise<void> {
        const { router } = options

        await this.router.redirect('eightbitstories.onboarding')
        
    }
}

```

#### Test 2: Should not redirect if logged in
Now we'll test that it does NOT redirect if someone is logged in, which will force us to do the `authenticator.isLoggedIn()` check. Something to note: If a redirect is triggered without an assert, it will throw an error and fail the test. So, you don't actually need to assert anything in this test.

```ts
...

@test()
protected static async shouldNotRedirectIfLoggedIn() {
    const vc = this.views.Controller('eightbitstories.root', {})

    //Because we use the @fake.login() decorator, the person is already logged in
    await this.views.load(vc)
}

...

```

#### Production 2: Check if person is logged in
Now, inside our `RootSkillViewController`, we'll check if the person is logged in before redirecting. If you run logic after this check, you'll need to write tests to ensure that logic is not run after the redirect (not covered in this example).

```ts
import { AbstractSkillViewController, SkillViewControllerLoadOptions } from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {

    public async load(
        options: SkillViewControllerLoadOptions
    ): Promise<void> {
        const { router, authenticator } = options

        if (!authenticator.isLoggedIn()) {
            await this.router.redirect('eightbitstories.onboarding')
        }
    }
}

```

#### Test 3: Refactor tests

Here is how you could refactor your tests to make them more readable and maintainable.

```ts
import { fake, AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import RootSkillViewController from '../../skillViewControllers/Root.svc'

@fake.login()
export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    protected static vc: RootSkillViewController

    protected static async beforeEach() {
        await super.beforeEach()

        //Construct the RootSkillViewController once here to work on in every test
        this.vc = this.views.Controller('eightbitstories.root', {})
    }

    @test()
    protected static async redirectsToOnboardingIfNotLoggedIn() {
        //This could be exctracted too, but I'll wait until the second time we need to call it
        this.permissions.getAuthenticator().clearSession()

        await vcAssert.assertActionRedirects({
            action: () => this.load(),
            router: this.views.getRouter(),
            destination: {
                id: 'eightbitstories.onboarding',
            },
        })
    }

    @test()
    protected static async shouldNotRedirectIfLoggedIn() {
        await this.load()
    }

    //I'll extract `this.views.load(this.vc)` to `this.load()` because it's been called twice now
    protected static async load() {
        await this.views.load(this.vc)
    }
}
```


## In event contracts