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
    * Use `@test()` to define which Class methods are tests.
    * **Parameterized Tests**: Use the `@test()` decorator with arguments to run the same test with different input.
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

### Homebrew

```bash
brew tap sprucelabsai-community/spruce
brew install spruce
```

### Yarn or NPM

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

## Working with Skills

Coming soon!