# Stores

Stores are a database agnostic way to persist data in your skill. Thare have a simple intreface that handles CRUD operations. 

* `createOne(...)`: Create a new record in the store.
* `crate(...)`: Create many records in the store.
* `updateOne(...)`: Update a record in the store.
* `update(...)`: Update many records in the store.
* `deleteOne(...)`: Delete a record in the store.
* `delete(...)`: Delete many records in the store.
* `findOne(...)`: Find a record in the store.
* `find(...)`: Find many records in the store.
* `scramble(...)`: Scramble a record in the store.

## Current Adapters

Currently, the Spruce Platform has 3 adapters for `Stores`:

1. NeDb: For testing and development purposes.
2. MongoDb: The default adapter for production.
3. Postgres: Can be enabled for production and/or tests.


## Stores in Development

During development, by default, the `Stores` layer will utilize a `MongoDb` in memory store called `NeDb`. While this database is no longer supported, it provides enough functionality to work for testing and development purposes.

### Seeding Data

When you are in development, you may want to seed your store with data so you can test against it. Luckily, that's a pretty easy thing to do! Let's walk through it!

For this scenario, we're going to ensure that our `listener` returns the expected results from the Database. We'll start with some listener tests that have already been created.

<details>
<summary><strong>Test 1</strong>: Add the <em>@seed(...)</em> decorator</summary>

```typescript
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'
import { crudAssert } from '@sprucelabs/spruce-crud-utils'

export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected static async rendersMaster() {
        const vc = this.views.Controller('eightbitstories.root', {})
        crudAssert.skillViewRendersMasterView(]vc)
    }
}
```

</details>


### Custom Data

## Stores in Production

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>