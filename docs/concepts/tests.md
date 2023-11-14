---
title: Tests
intro: Testing in Spruce
show_concepts_header: true
show_TOC: true
show_concepts_navigation: true
show_concepts_video: false
section: Concepts
order: 2
---

# Overview
In Sprucebot, Tests maintain quality, ensuring that every aspect of the system performs flawlessly. This guide provides insights into the testing methodologies within Sprucebot.

# Creating and Running Tests

`spruce create.test` - Commits to quality by initializing a new test.
`spruce test` - Validates code readiness for deployment by running the test suite.

## Fixtures

Fixtures are utility classes that emulate real-world scenarios, setting up the environment for tests. They are essential for creating realistic test conditions.

- View Fixture
- Store Fixture
- Mercury Fixture
- Person Fixture
- Location Fixture
- Organization Fixture
- Role Fixture
- Seed Fixture

### Built-in Fixtures

When extending `AbstractSpruceFixtureTest`, built-in fixtures are available:
- `this.views` => ViewFixture
- `this.roles` => RoleFixture
- `this.locations` => LocationFixture
- `this.organizations` => OrganizationFixture
- `this.people` => PersonFixture
- `this.seeder` => SeedFixture
- `this.skills` => SkillFixture
- `this.mercury` => MercuryFixture

### Example Fixture Use

```typescript
export default class RenderingRootViewControllerTest extends AbstractSpruceFixtureTest {

    @test()
    protected static gettingFixtures() {

        const organizationFixture = this.organizations

        assert.isTruthy(organizationFixture)

        //Save time by accessing the fixture via protected pro
        assert.isTruthy(this.organizations)
        assert.isTruthy(this.locations)
    }
}
```

## Authentication in Testing

Authentication mechanisms are tested using the `@login` decorator, ensuring security is as robust as other system components.

```typescript
@login()
export default class MySkillViewControllerTest extends AbstractSpruceFixtureTest {

    @test()
    protected static async beforeEach() {
        await super.beforeEach()

        /**
        * Is the exact same as @login decorator, don't bother doing this manually
        * const { client } = await this.Fixture('view').loginAsDemoPerson(DEMO_NUMBER_ROOT_SVC)
        * MercuryFixture.setDefaultClient(client)
        **/

        const client = login.getClient()
        const { client: client2 } = await this.Fixture('view').loginAsDemoPerson()

        assert.isEqual(client, client2) //once default client is set, unless you pass a new number, the client is reused

        const { client: client3 } = await this.Fixture('view').loginAsDemoPerson(DEMO_NUMBER_ROOT_2)
        assert.isNotEqual(client,client3)

    }
}
```

## Seeding Data

Seeding prepares the testing landscape with necessary data, from roles to profiles, using decorators like `@seed`.

### Seeding Example

```typescript
//@login sets the default client for all fixtures and seeders going forward
@login()
export default class RenderingRootViewControllerTest extends AbstractSpruceFixtureTest {

    @seed('organizations', 2)
    protected static async beforeEach() {
        await super.beforeEach()

        const totalOrgs = await this.organizations.listOrganizations()
        assert.isLength(totalOrgs, 2)

        //since this is in the beforeEach(), every test will come with 2 organizations
    }

    @test()
    @seed('locations',10)
    protected static async locationsShouldSeed() {
        const currentOrg = await this.organizations.getNewestOrganization()
        const locations = await this.locations.listLocations({ organizationId: currentOrg?.id })

        assert.isLength(locations, 10)
    }

    @test()
    protected static async seedingEntireAccount() {

        // will seed data under newest organization
        const {
            locations, 
            guests, 
            managers, 
            owners, 
            teammates 
        } = await this.seeder.seedAccount({
            totalLocations: 1,
            totalGuests: 3,
            totalManagers: 5,
            totalOwners: 2,
            totalTeammetes: 3,
            startingPhone: DEMO_NUMBER_SEED_STARTING_PHONE
        })


    }

}
```

## Installing your Skill
```
@login()
export default class RenderingRootViewControllerTest extends AbstractSpruceFixtureTest {

    @test()
    @seed('organization',1)
    @install.skills('skill-namespace-1', 'skill-namespace-2')
    protected static async skillsArInstalled() {
        //the skill is only installed at the newest organizatios
        //now your skill can emit events to skills that are installed at the newest org
    }
}
```
## Skill Views
Everything you need to know is under the Views section!

## Best Practices and Advanced Strategies

Creating reusable fixtures, employing meaningful assertions, and anticipating user behavior are among the golden rules of Spruce testing.

**AbstractProfileTest Setup Guide**

To optimize your testing process, start by creating an abstract test class named `AbstractProfileTest`. This class will serve as the foundation for all your subsequent tests.

- **Inheritance:** Ensure that every new test class extends the `AbstractProfileTest`.
  
- **Helper Methods:** Implement utility functions such as `getNewestInvite()` and `listOrgs()` to streamline common actions.

- **Fixture Initialization:**
  - In the `beforeEach()` setup method, assign commonly used fixtures to class properties with plural names for easy reference. For example:
    ```typescript
    this.views = this.Fixture('views');
    this.orgs = this.Fixture('organizations');
    ```
  
- **Store Access:**
  - Similarly, initialize stores as class properties within `beforeEach()`, using the store's singular name. For instance:
    ```typescript
    this.invites = await this.Store('invites');
    this.profiles = await this.Store('profiles');
    ```

- **Reusability:**
  - Avoid repetitive fixture creation by saving them as protected properties within your abstract test.

- **Convenience Getters:** For frequently accessed data, create getter methods like `getNewestOrganization()` to retrieve information quickly.

- **Assertions:**
  - Use assertive checks with clear error messages to ensure the test environment is correctly set up, aiding in troubleshooting.

Follow these guidelines to establish a robust and efficient testing structure that will benefit your current and future development needs.

### Abstract Skill Test Example

```typescript
export default class AbstractProfileTest extends AbstractViewControllerTest {
    protected static profiles: ProfilesStore
    protected static router: Router

    protected static async beforeEach() {
        await super.beforeEach()

        this.profiles = await this.stores.Store('profiles')
        this.router = this.views.getRouter()
    }

    protected static async getNewestProfile() {
        const profile = await this.profiles.findOne({})

        assert.isTruthy(profile, `You gotta @seed('profiles',1) to continue.`)
        return profile
    }

    protected static async getNewestOrg() {
        const org = await this.organizations.getNewestOrganization()
        assert.isTruthy(org, `You gotta @seed('organizations',1) to continue.`)
        return org
    }

    protected static async listProfiles () {
        const profiles = await this.profiles.findOne({})
        assert.isAbove(profiles.length, 0, `You gotta @seed('profiles',1) to continue.`)
        return profiles
    }
}
```

## Use Cases