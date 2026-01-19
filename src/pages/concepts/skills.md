# Skills

A `Skill` is a descrete piece of functionality that includes the full stack of an application. It's a way to encapsulate a feature or set of features that can easily be deployed, installed, updated, configured, removed, etc.

<img src="../../assets/img/concepts/skill_stack.png">

## Skill Lifecycle

To start, your `Skill` is only a `BootLoader` that looks for `Features`. `Features` map closely to the `Concepts`. Your `Skill` starts with no `Features` and the [`SpruceCLI`](/concepts/spruce-cli/) installs them for you as you need them.

<img src="../../assets/img/concepts/skill_lifecycle.png">

## Folder Structure

| Folder/File | Purpose |
|---|---|
| `.vscode` | VS Code workspace settings, tasks, and recommended extensions for the project. |
| `build` | Compiled TypeScript output. Tests run against built code for speed. |
| `node_modules` | Installed npm/yarn dependencies. |
| `src` | Source code root directory. |
| `src/__tests__` | Test files organized into `behavioral` and `implementation` subdirectories. |
| `src/.spruce` | Auto-generated Spruce files including combined schemas, events, errors, and type definitions. Do not edit manually. |
| `src/errors` | Custom error definitions using `SpruceError`. Created via `spruce create.error`. |
| `src/listeners` | Event listeners that respond to Mercury events. Created via `spruce create.listener`. |
| `src/permissions` | Permission contracts defining access controls for your skill. Created via `spruce create.permission`. |
| `src/schemas` | Schema definitions for data structures. Created via `spruce create.schema`. |
| `src/skillViewControllers` | Skill-level view controllers (full pages/screens). Created via `spruce create.view`. |
| `src/stores` | Data store definitions for database operations. Created via `spruce create.store`. |
| `src/viewControllers` | Reusable view controllers (components). Created via `spruce create.view`. |
| `src/viewPlugins` | View controller plugins for extending VC functionality. Created via `spruce create.view.plugin`. |
| `.editorconfig` | Editor configuration ensuring consistent coding style across IDEs. |
| `.eslintcache` | ESLint cache file for faster subsequent linting runs. |
| `.npmignore` | Specifies files to exclude when publishing to npm. |
| `.nvmrc` | Specifies the Node.js version for the project. Use `nvm use` to switch. |
| `eslint.config.mjs` | ESLint configuration for code linting rules. |
| `package.json` | npm package manifest with dependencies, scripts, and metadata. |
| `README.md` | Project documentation and getting started guide. |
| `tsconfig.json` | TypeScript compiler configuration. |

## Creating your Skill

When you're ready to start building a new `Skill`, you can use the [`SpruceCLI`](../spruce-cli/) to generate the `Skill` scaffolding. 

```bash
spruce create.skill [directory]
``` 

> **Note:** If you don't provide a directory, the `Skill` will be created in the current directory.

## Booting your Skill

If you want to boot your `Skill` in a local environment, you can use the `boot` command.

```bash
spruce boot
```

## Registering your skill

If your skill uses an `Events`, `Listeners` or `Views`, you'll need to register it with `Mercury`.

```bash
spruce register
```

> **Note:** You will need to log into your personal account to register your skill. You can login using `spruce login`.

## Listening to Skill Boot Events

The `Event Feature` allows you to listen to 2 events that are emitted during the boot process:

1. `will-boot` - Fired ASAP when the skill is booted.
2. `did-boot` - Fired after all features have booted.

You can add your listener by running:

```bash
spruce create.listener
```

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>
