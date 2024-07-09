# Permissions

Permissions are handled by 2 main classes: `Authenticator` and `Authorizer`. The `Authenticator` is responsible for checking if someone is logged in, and the `Authorizer` is responsible for checking if a logged in person has the right permissions to do something.


## Important Classes

<details>
<summary>
<strong>Authenticator</strong> - See if someone is logged in, who it is, and persist a session token to keep a person logged in.
</summary>

| Method | Returns | Description |
| --- | --- | --- |
| `getPerson()` | [`Person`](https://github.com/search?q=repo%3Asprucelabsai-community%2Fspruce-core-schemas+%22Person%22&type=code) \| `null` | Get the logged in person, if someone is logged in |
| [`setSessionToken`](https://github.com/search?q=org%3Asprucelabsai-community+SessionToken&type=code)(token: string, person: Person) | `void` | Log a person in by setting their token and Person record |
| `getSessionToken()` | `string` \| `null` | Get the session token of a logged in person |
| `isLoggedIn()` | `bool` | Check if someone is logged in |
| [`clearSession()`](https://github.com/search?q=org%3Asprucelabsai-community+Session&type=code)| `void` | Clear the session, logging the person out |
| [`addEventListener<N extends 'did-login'`](https://github.com/search?q=org%3Asprucelabsai-community+EventListener&type=code)| 'did-logout'>(name: N, cb: Payloads[N])` | `void` | Add an event listener for when someone logs in or out to take some action |
| `removeEventListener<N extends 'did-login' \| 'did-logout'>(name: N, cb?: Payloads[N])` | `void` | Remove an event listener, passing no cb will remove all listeners for that event |

</details>

<details>
<summary>
<strong>Authorizer</strong> - Check if a person has the right permissions to do something. Works if someone is not logged in.
</summary>

| Method | Returns | Description |
| --- | --- | --- |
| `can<ContractId, Ids>(options: AuthorizerCanOptions<ContractId, Ids>)` | `Promise<Record<Ids, boolean>>` | Check if the current person has a permission |
| `savePermissions<ContractId, Ids>(options: SavePermissionsOptions<ContractId, Ids>)` | `Promise<void>` | Save permissions for a person. Note: the person must have the permission to save permissions |

</details>

## Checking in the backend

Coming soon...

## Checking in Skill Views

### Redirecting if someone is not logged in

<details>

<summary><strong>Test 1:</strong> Check for redirect on load</summary>

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

| Method                                                | Returns    | Description                                                                                                             |
|-------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------|
| `views.Controller(viewId: string, options: object)`   | `View`     | Creates and returns a view controller for the specified view ID with the given options.                                 |
| `permissions.getAuthenticator().clearSession()`       | `void`     | Clears the current session, logging the person out.                                                                     |
| `views.load(view: View)`                              | `Promise`  | Loads the specified view and returns a promise that resolves when the view is loaded.                                   |
| `views.getRouter()`                                   | `Router`   | Gets the router instance used for navigating between views.                                                             |
| `vcAssert.assertActionRedirects(options: object)`     | `Promise`  | Asserts that a specified action redirects to the expected destination. Options include the action, router, and destination. |

</details>

<details>
<summary><strong>Production 1:</strong> Redirect no matter what</summary>

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

| Method                                              | Returns    | Description                                                                                                                |
|-----------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------------------|
| `router.redirect(destination: string)`              | `Promise`  | Redirects to the specified destination.                                                                                    |
| `load(options: SkillViewControllerLoadOptions)`     | `Promise`  | Loads the view controller with the given options and redirects to the 'eightbitstories.onboarding' destination.            |

</details>

<details>
<summary><strong>Test 2:</strong> Should not redirect if logged in</summary>

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

| Method                                          | Returns   | Description                                                                                                             |
|-------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------|
| `views.Controller(viewId: string, options: object)` | `View`    | Creates and returns a view controller for the specified view ID with the given options.                                 |
| `views.load(view: View)`                        | `Promise` | Loads the specified view and returns a promise that resolves when the view is loaded.                                    |
| `test()`                                        | `void`    | Marks a method as a test method to be executed by the test runner.                                                      |
| `shouldNotRedirectIfLoggedIn()`                 | `Promise` | Ensures that the view does not redirect if someone is already logged in.                                                |

</details>


<details>
<summary><strong>Production 2:</strong> Check if person is logged in</summary>
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

| Method                                              | Returns    | Description                                                                                                                     |
|-----------------------------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------|
| `router.redirect(destination: string)`              | `Promise`  | Redirects to the specified destination.                                                                                         |
| `authenticator.isLoggedIn()`                        | `boolean`  | Checks if the person is logged in and returns true if logged in, false otherwise.                                               |
| `load(options: SkillViewControllerLoadOptions)`     | `Promise`  | Loads the view controller with the given options, and if the person is not logged in, redirects to the 'eightbitstories.onboarding' destination. |

</details>

<details>
<summary><strong>Test 3:</strong> Refactor tests</summary>

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
| Method                                                  | Returns    | Description                                                                                                                    |
|---------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------|
| `views.Controller(viewId: string, options: object)`     | `View`     | Creates and returns a view controller for the specified view ID with the given options.                                        |
| `permissions.getAuthenticator().clearSession()`         | `void`     | Clears the current session, logging the person out.                                                                            |
| `vcAssert.assertActionRedirects(options: object)`       | `Promise`  | Asserts that a specified action redirects to the expected destination. Options include the action, router, and destination.    |
| `test()`                                                | `void`     | Marks a method as a test method to be executed by the test runner.                                                             |
| `beforeEach()`                                          | `Promise`  | Sets up the necessary preconditions before each test, including constructing the RootSkillViewController.                     |
| `redirectsToOnboardingIfNotLoggedIn()`                  | `Promise`  | Tests that the controller redirects to onboarding if the person is not logged in.                                              |
| `shouldNotRedirectIfLoggedIn()`                         | `Promise`  | Tests that the controller does not redirect if the person is logged in.                                                        |
| `load()`                                                | `Promise`  | Loads the RootSkillViewController for use in tests.                                                                            |

</details>

## In event contracts

Coming soon...