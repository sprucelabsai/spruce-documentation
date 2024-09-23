# SpruceCLI

**World Class, Open Source Testing Framework for Typescript and Visual Studio Code**. 

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

1. Beatifully test runner
2. Smart watch mode - Tests broken test over until passing, then tests all files.
2. Simple decorator based (`@test()`) test declaration
3. Class based test files 
    1. Easy scope management
    1. Class test extensions for common setups and fixtures
4. Test file generation
5. Parent test class selection

## Installing

### Hombrew

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

When you are starting a node module from scratch, you can use `spruce` to get you started. This will not install the `Test` tools, but will leave you with a fully functioning Typescript based node module. 

```bash

This will get you started with a new node module. 

```bash
spruce create.module [destination]
```
> **Note:** If you do not supply a `destination`, it will default to the current directory.

> **Note:** After the command is done, follow the instructions printed in the summary.

## Existing module

### Setting up vscode

```bash
cd path/to/your/module
spruce setup.vscode
```

### Adding tests

To add World Class testing to an existing module, you just have to create a test inside your module. The `sprucecli` will do the rest.

```bash
cd path/to/your/module
spruce create.test
```

