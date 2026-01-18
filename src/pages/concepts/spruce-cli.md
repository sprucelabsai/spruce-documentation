# SpruceCLI

**A World Class, Open Source Testing Framework for Typescript and Visual Studio Code**. 

<div class="grid-buttons">
    <a href="https://github.com/sprucelabsai-community/spruce-cli-workspace"><img src="https://img.shields.io/github/last-commit/sprucelabsai-community/spruce-cli-workspace" /></a>
    <a href="https://github.com/sprucelabsai-community/spruce-cli-workspace"><img src="https://img.shields.io/circleci/build/github/sprucelabsai-community/spruce-cli-workspace" /></a>
    <a href="https://github.com/sprucelabsai-community/spruce-cli-workspace"><img src="https://img.shields.io/github/languages/top/sprucelabsai-community/spruce-cli-workspace" /></a>
    <a href="https://github.com/sprucelabsai-community/spruce-cli-workspace"><img src="https://img.shields.io/github/commit-activity/m/sprucelabsai-community/spruce-cli-workspace" /></a>
    <a href="https://www.npmjs.com/package/@sprucelabs/spruce-cli"><img src="https://img.shields.io/npm/dy/%40sprucelabs%2Fspruce-cli" /></a>
    <a href="https://github.com/sprucelabsai-community/spruce-cli-workspace"><img src="https://img.shields.io/github/issues/sprucelabsai-community/spruce-cli-workspace" /></a>
    <a href="https://www.npmjs.com/package/@sprucelabs/spruce-cli"><img src="https://img.shields.io/npm/v/%40sprucelabs%2Fspruce-cli" /></a>
</div>


## Features

1. **Rediculously Easy to Use**: 
    * Simple commands with helpful prompts.
    * No "starter projects" or "boilerplates" to manage.

1. **Beatiful Test Runner**: *"There is nothing quite like it."*
2. **Multiple Watch Modes**:
    * **Smart**: Auto-filters to tests that have changed and/or failed. After a successful run, it will run all tests.

    * **Standard**: Keeps current filter on changes. If no filter is set, it runs all tests on every change.
3. **Class Based Test Files**:
    * **Easy scope management**: No more managing multiple levels of scope. Just use `this` to access the test's state.

    * **Easily Extend Test Classes**: Create a parent test class to hold helpful assertions, setup methods, fixtures, etc.
2. **Decorator Based**: 
    * Use [`@test()`](/concepts/tests/) to define which Class methods are tests.
    * **Parameterized Tests**: Use the [`@test()`](/concepts/tests/) decorator with arguments to run the same test with different input.
4. **Tight VSCode Integration**:
    * **Formatting**: Beatuifully format your code on every Save.
    * **Test Explorer**: View and run tests from the sidebar.
    * **Debugging**: Debug tests with breakpoints.
6. **Build Watcher**: Automatically build your code on every save.
    * Tests are run against built code (not using `ts-node`), making them much faster.
7. **Upgrader**: Update all your dependencies in 1 go!
8. **Errors**:
    * **Error Codes**: Utilize the `SpruceError` to throw errors with `Codes`.
    * **Error Assertions**: Assert errors against error codes and error metadata.

## What is it?

The `SpruceCLI` is a command line tool that enables developers to "Build Great Software Fast." The testing elements of the `cli` are actually just a small part of it's overall capabilities.

For this documentation, we will focus on the testing and VSCode integration aspects of the `cli`.

### Testing

The testing framework is comprised of 3 main parts:

1. **Test Runner**: The test runner is built ontop of [Jest](https://jestjs.io). This is managed behind-the-scenes by the `cli`, so you don't have to deal with any of it's complexities.
2. **Test Reporter**: A totally custom built, beautiful test reporter that makes running tests enjoyable.
3. **Assertion Library**: A custom built assertion library that is designed to be easy to intuitive and reliable. No global objects, no magic, just simple assertions.

### VSCode Integration

Running commands manually is fine enough, but nothing beats having all the tooling you need "just work" right in your `IDE`.

There are 3 main parts to the VSCode integration:

1. **Linting**: `VSCode` will format your code on save. This is done using custom `eslint` and `prettier` configurations, following best practices.
2. **Building**: `VSCode` will automatically build your code on save. This is done using `tsc` and a custom `tsconfig.json` file.
3. **Testing**: The `Test Runner` is integrated right into the interface, making sure your tests are always visible.

## Definitions

| Concept | Description |
| --- | --- |
| Test File | Test files written in Typescript. Exports 1 default class. |
| Test Class | The class that holds your tests. Extends on `AbstractSpruceTest`. |
| `@test` Decorator | Used to define which methods are tests, importad as `import { test } from @sprucelabs/test-utils` |
| `assert` | A utility class that holds the basic assertions, imported as `import { assert } from @sprucelabs/test-utils`. |
| `errorAssert` | A utility class that enables you to assert against errors, imported as `import { errorAssert } from @sprucelabs/test-utils`. |
| Test Runner | The [Jest](https://jestjs.io) test runner. Actually runs the tests and streams results to the `Test Reporter`. |
| Behavior Test | A test that asserts against the inputs and outputs of a higher order function. It is not concerned with the implementation (the details of the work being done). Behavior tests are preferred because they don't break when you refactor your implementation. |
| Implementation Test | A test that asserts against the implementation details of a lower oder function. Or, one that spies on a higher order function. Implementation tests are risky because they have to be reworked when your refactor. |


## Installing

```bash
yarn global add @sprucelabs/spruce-cli
```

```bash
npm install -g @sprucelabs/spruce-cli
```

## Starting a New Module

When you are starting a node module from scratch, you can use `spruce` to set you up with a fully functioning `Typescript` project. This will not install the `Test` tools, but will leave you with a fully functioning Typescript node module with linting and building:


```bash
spruce create.module [destination]
```
> **Note:** If you do not supply a `destination`, it will default to the current directory.

> **Note:** After the command is done, follow the instructions printed in the summary. 

## Adding to an Existing Module

If you already have a Typescript module running, you can add Spruce pretty easily:

### Setting up vscode

```bash
cd path/to/your/module
spruce setup.vscode
```

## Your First Test
After you have created your new module or setup an existing one, you can generate your first test!

Once `vscode` is loaded up, you can run the following:

```bash
spruce create.test
```

> **Note**: You'll be asked if you want to select `Behavioral` or `Implementation` tests. If you are unsure, select `Behavioral`.

> **Note**: You may be asked to install the `Skill Feature.` If you started by running `spruce create.module`, select `Always Skip`. Installing this will turn your module into a `Skill` that runs on the `Spruce Platform`.

> **Node**: You will be asked to select a base test class. Select `AbstractSpruceTest` to start.

## Command Reference

Use `--help` on any command for detailed options (e.g., `spruce test --help`).

### Authentication

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce login` | `--phone`, `--pin` | Authenticate as a person. |
| `spruce logout` | | Logout as a person. |
| `spruce whoami` | | Check who you're logged in as. |
| `spruce login.skill` | | Re-authenticate a skill if you lost your env. |

### Skills

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.skill` | `[destination]`, `--name`, `--description` | Create a new skill for the Spruce Platform. |
| `spruce register.skill` | `--nameReadable`, `--nameKebab`, `--description` | Register your skill with Mercury. |
| `spruce unregister.skill` | | Unregister a skill from your account. |
| `spruce boot` | `--local` | Boot your skill and connect to Mercury. |
| `spruce install.skill` | `--organizationId` | Install your skill at an organization. |
| `spruce add.dependency` | `[namespace]` | Add another skill as a dependency. |
| `spruce manage.dependencies` | | Manage or remove skill dependencies. |
| `spruce deploy.heroku` | `--teamName`, `--shouldRunTests` | Deploy your skill to Heroku. |
| `spruce publish` | | Publish a skill to the world. |
| `spruce create.organization` | | Create an organization. |

### Events & Listeners

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.event` | `--nameReadable`, `--version`, `--isGlobal` | Create a new event for Mercury. |
| `spruce listen.event` | `--namespace`, `--eventName`, `--version` | Create a listener for an event. |
| `spruce sync.events` | | Pull down event contracts from Mercury. |
| `spruce sync.listeners` | | Sync event listeners. |
| `spruce pull.event.contracts` | | Pull event contracts to a single file. |

### Schemas

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.schema` | `--nameReadable`, `--description`, `--version` | Create a new schema builder. |
| `spruce sync.schemas` | | Sync schema types with your builders. |
| `spruce sync.fields` | | Sync schema fields. |

### Stores

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.store` | `--nameReadable`, `--nameReadablePlural` | Create a data store. |
| `spruce sync.stores` | | Sync stores. |

### Views

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.view` | `--viewType`, `--nameReadable`, `--isRoot` | Create a new Heartwood view. |
| `spruce create.avc` | | Create an App View Controller. |
| `spruce create.view.plugin` | | Create a view plugin. |
| `spruce create.theme` | | Create a theme for your skill. |
| `spruce sync.views` | | Sync view types and generated files. |
| `spruce watch.views` | | Watch for view changes in real time. |

### Testing

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.test` | `--type`, `--nameReadable` | Generate a new test file. |
| `spruce test` | `--pattern`, `--inspect`, `--watchMode` | Run your tests. |
| `spruce migrate.tests` | | Migrate static tests to instance-based. |
| `spruce setup.testing` | | Prepare skill for CI/CD testing. |
| `spruce setup.polish` | | Set up Polish for visual testing. |

### Errors

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.error` | `--nameReadable`, `--description` | Create a new error builder. |
| `spruce sync.errors` | | Sync error types with builders. |

### Permissions

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.permissions` | `--nameReadable`, `--description` | Create permission contracts. |
| `spruce sync.permissions` | | Sync permission contracts. |

### Conversations

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.conversation` | | Define a conversation topic. |
| `spruce test.conversation` | | Test your conversation topics. |

### AI & Agents

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce register.agent` | `--type`, `--name` | Register an AI agent. |
| `spruce setup.ai` | | Configure AI capabilities. |

### Logging

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.log.transport` | | Send logs to custom destinations. |

### Projects & Modules

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce create.module` | `[destination]` | Create a new TypeScript node module. |
| `spruce setup.vscode` | | Install VSCode extensions and settings. |
| `spruce upgrade` | `--shouldBuild`, `--upgradeMode` | Upgrade all dependencies. |
| `spruce update.dependencies` | | Clear and reinstall node_modules. |
| `spruce rebuild` | | Clear build and node_modules, start fresh. |
| `spruce install.feature` | | Install additional features. |

### Environment

| Command | Arguments | Description |
| --- | --- | --- |
| `spruce set.remote` | `[remote]` | Point to different Mercury environments. |
| `spruce enable.cache` | | Enable npm caching for faster installs. |
| `spruce disable.cache` | | Disable caching. |
| `spruce onboard` | | Start the onboarding process. |
| `spruce setup.sandbox` | | Set up a sandbox environment. |

## Working with Skills

### Creating a Skill

```bash
spruce create.skill my-skill
cd my-skill
```

You'll be prompted to configure your skill. After creation, follow the printed instructions to complete setup.

### Registering with Mercury

Before your skill can communicate with other skills and the platform, you need to register it:

```bash
spruce login
spruce register.skill
```

This creates a `.env` file with your skill's credentials. Keep this file secure and never commit it to version control.

### Booting Your Skill

```bash
spruce boot
```

This starts your skill and connects it to Mercury. Your event listeners will begin receiving events.

### Installing at an Organization

To make your skill available to an organization:

```bash
spruce install.skill
```

You'll be prompted to select which organization to install at.

### Adding Dependencies

If your skill needs to communicate with another skill:

```bash
spruce add.dependency other-skill-namespace
```

This pulls in the event contracts from the dependency so you can emit and listen to its events.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>