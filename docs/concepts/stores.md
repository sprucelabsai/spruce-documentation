---
title: Stores
intro: Data Stores - The Technical Backbone of Spruce
show_concepts_header: true
show_TOC: true
show_concepts_sidebar: true
show_concepts_video: false
section: Concepts
order: 3
---

# Overview
Data Stores serve as the pivotal repositories within Spruce's digital ecosystem. They are fundamentally database-agnostic, providing a uniform interface for data manipulation across various database systems. This technical manual delves into the intricacies of creating, synchronizing, and utilizing Stores to their full potential.

## Command Line Interface (CLI) Operations

### Initialization of Stores
To start with a Store, use the `spruce create.store` command. This initializes a new Store, setting the stage for data management operations.

### Store Synchronization
Post-renaming of classes or files, it's imperative to align the Store with the changes. This is achieved through the `spruce sync.stores` command, ensuring that the Store's structure and its references remain consistent.

## Schema Definition within Stores
Schemas act as the blueprint for data validation and structure within the Stores. They come in various forms, tailoring to specific actions:

- `fullSchema`: Defines the data structure returned by `.find(...)` or `.findOne(...)`.
- `createSchema`: Ensures data integrity for `.create(...)` or `.createOne(...)`.
- `updateSchema`: Governs data adjustments made through `.update(...)`, `.updateOne(...)`, or `.upsert(...)`.
- `databaseSchema`: Represents the actual data structure stored in the database.

A recommended best practice is to generate a fully typed schema using `spruce create.schema`, aligning it with `fullSchema` to enforce data consistency.

## Data Lifecycle Hooks
Hooks are critical in managing the data lifecycle within Stores, allowing for pre- and post-operation data manipulation:

- `willCreate`: Invoked before data creation.
- `didCreate`: Triggered after data creation.
- `willUpdate`: Engaged before data updates.
- `didUpdate`: Activated after data updates.
- `willScramble`: Employed to obfuscate data before saving or retrieval for security reasons.

These hooks provide a mechanism to fine-tune data before it's committed to the Store or before it's fetched from it.

## Implementing Stores in Listeners and Tests

### Listeners Integration
When integrating Stores within listeners, it's crucial to manage data fields efficiently. Utilizing `includeFields` ensures the Store only retrieves necessary data fields, thus optimizing performance and adherence to response payload constraints.

```ts
export default async (
    event: SpruceEvent<SkillEventContract, EmitPayload>
): SpruceEventResponse<ResponsePayload> => {

    const { stores, source } = event

    const store = await stores.getStore('profiles')
    const profile = await store.findOne({
        target: {
            personId: source.personId
        }
    }, {
        includeFields: getFields(getProfileSchema),
    })

    return {
        profile
    }

}
```

### Testing with Stores
Stores also prove their mettle in testing environments. Through seeding and various assertive checks, one can ensure the Store's performance and reliability. Testing operations like `youCanSeedDataIntoYourStore` and `helpersLikeGetNewestAndListAreSoNice` provide evidence of a well-functioning Store.

```ts
export default class AcceptingAnInviteTest extends AbstractSpruceFixtureTest {
    private static vc: AcceptSkillViewController
    private static invites: InvitesStore

    protected static async beforeEach() {
        await super.beforeEach()
        this.invites = await this.stores.getStore('invites')
    }

    @test()
    @seed('invites', 1)
    protected static async youCanSeedDataIntoYourStore() {
        const invite = await this.getNewestInvite()
        assert.isTruthy(invite)
    }

   @test()
   @seed('invites', 20)
    proctected static async helpersLikeGetNewestAndListAreSoNice() {
        const invites = this.listInvites()
        assert.isLength(invites, 20)
    }

    private static async getNewestInvite() {
        const invite = await this.invites.findOne({})
        assert.isTruthy(invite, `Don't forget to @seed('invites', 1) to get started!`)
        return invite
    }
    
    private static async listInvites() {
        const invites = await this.invites.find({})
        assert.isAbove(invite.length, 0, `Don't forget to @seed('invites', 1) to get started!`)
        return invites
    }

    
}
```

## Database Integration: Embracing Postgres
While Stores are indifferent to the underlying database technology, they can be augmented with adapters like `@sprucelabs/postgres-data-store`. This extends the Store's capabilities to leverage the robustness of SQL-based systems, configured via environment variables like `DATABASE_CONNECTION_STRING`. If you want to add Postgres support, you must import the dependency.

```bash
yarn add @sprucelabs/postgres-data-store
```
Then you can configure your databes in your env.

```
DATABASE_CONNECTION_STRING="postgres://postgres:password@localhost:5432/database_name"
```

## Use Case