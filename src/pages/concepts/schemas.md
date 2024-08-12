# Schemas

Powered by the [spruce-schema](https://github.com/sprucelabsai-community/spruce-schema) module, schemas are the universal way to define the shape of data in Spruce. There is also great typing support.

## Validating Data

### Creating a Schema in your Skill

Schemas are first class citizens in Spruce and your Skills. The best way to define a schema as the "source of truth" is to run the following to create a `builder`. From that `builder`, both the final schema and the TypeScript typings are generated.

<details>
<summary><strong>Creating a schema builder</strong></summary>

```bash
spruce create.schema
```

After you give your `Schema` a name and a version, a `.builder.ts` file will be created at:

```bash
/src/schemas/{version}/{name}.builder.ts
```

You can go in and make any edits you need and then `sync` schemas after?

</details>

<details>

<summary><strong>Syncing schemas</strong></summary>

After you edit an `builder` file, you can run the following command to sync your schema:

```bash
spruce sync.schemas
```

</details>

<details>
<summary><strong>Accessing your built schema</strong></summary>

</details>


### Creating a Schema programmatically



### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>