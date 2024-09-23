# SpruceCLI

**World Class, Open Source, Testing Tools for Typescript and Visual Studio Code**. 

View Source on [GitHub](https://github.com/sprucelabsai-community/spruce-cli-workspace).

## Installing

### Hombrew

```bash
brew tap sprucelabs-community/spruce git@github.com:sprucelabsai-community/homebrew-spruce.git
brew install spruce
```

### Yarn or NPM

```bash
yarn global add @sprucelabs/spruce-cli
```

```bash
npm install -g @sprucelabs/spruce-cli
```

## New Module

### Starting a module from scratch

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

