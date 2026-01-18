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

Currently, the Spruce Platform has 4 adapters for `Stores`:

1. NeDb: For testing and development purposes.
2. MongoDb: The default adapter for production.
3. Postgres: Can be enabled for production and/or tests.
4. ChromaDb: A vector-based database for semantic search.


## Stores in Development

During development, by default, the `Stores` layer will utilize a `MongoDb` in memory store called `NeDb`. While this database is no longer supported, it provides enough functionality to work for testing and development purposes.

### Seeding Data

When you are in development, you may want to seed your store with data so you can test against it. Luckily, that's a pretty easy thing to do! Let's walk through it!

For this scenario, we're going to ensure that our `listener` returns the expected results from the Database. We'll start with some listener tests that have already been created.

<details>
<summary><strong>Test 1</strong>: Add the <em>@seed(...)</em> decorator</summary>

```typescript
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, suite } from '@sprucelabs/test-utils'
import { crudAssert } from '@sprucelabs/spruce-crud-utils'

@suite()
export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    @test()
    protected async rendersMaster() {
        const vc = this.views.Controller('eightbitstories.root', {})
        crudAssert.skillViewRendersMasterView(]vc)
    }
}
```

</details>


### Custom Data

## Stores in Production


## Chroma Data Store

Give your skill the ability to store and retrieve data from a Chroma database for vector based searching. This gives your Data Store the ability to handle semantic and nearest neighbor searches.

### Running Chroma

1. Clone the `@sprucelabs/chroma-data-store` repository
3. cd into the repository
2. Run `yarn start.chroma.docker`

### Setting an embedding model

By default , the ChromaDabatase class will use llama3.2 hosted through Ollama to generate embeddings

#### Installing Ollama

1. Visit https://ollama.com
2. Click "Download"
3. Select your OS

#### Installing Llama3.2

Llama 3.2 is the newest version of Llama (as of this writing) that supports embeddings.

1. Inside of terminal, run `ollama run llama3.2`
2. You should be able to visit http://localhost:11434/api/embeddings and get a 404 response (this is because the route only accepts POST requests)

### Connecting to Chroma

Here are the steps to configure your skill to use ChromaDatabase

<details>
<summary><strong>Step 1:</strong> Installing the Chroma Adapter</summary>

Inside your skill's directory run:

```bash
yarn install @sprucelabs/chroma-data-store
```

</details>

<details>
<summary><strong>Step 2:</strong> Enabling the adapter</summary>

Inside your skill's directory run:

```bash
Coming soon.
```

</details>

### Improving embeddings with `nomic-embed-text`

We have seen significantly better search performance when using `nomic-embed-text` to generate embeddings.

<details>
<summary><strong>Step 1:</strong> Installing nomic-embed-text</summary>

Run the following in your terminal:

```bash
ollama run nomic-embed-text
```
</details>

<details>
<summary><strong>Step 2:</strong> Configuring nomic-embed-text in your skill</summary>

Add the following to your skill's `.env`:
```bash
CHROMA_EMBEDDING_MODEL="nomic-embed-text"
```
</details>




### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>