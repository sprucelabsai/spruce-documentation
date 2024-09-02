# Visual Studio Code Keyboard Shortcuts

## How to install shortcuts

1. Open Visual Studio Code
2. Press `Cmd+k` then `Cmd+s` to open the keyboard shortcuts (or go to `Code` > `Settings` > `Keyboard Shortcuts`)
3. Click on the `Open Keyboard Shortcuts (JSON)` button in the upper right corner (it looks like a file icon)
4. Paste the shortcuts you want to use into the file

## The Basics

Below are the 2 keyboard shortcuts that you will definitely want to use when working in Spruce. They are to quickly run `spruce` commands as well as `yarn` shell commands. They are used aggressively throughout the Training section.

```json
...
{
    "key": "ctrl+space",
    "command": "workbench.action.tasks.runTask",
    "args": "spruce"
},
{
    "key": "ctrl+alt+space",
    "command": "workbench.action.tasks.runTask",
    "args": "shell"
},
...
```

## All Tay's Shortcuts

If you want to use all the shortcuts Tay uses during the training, you can copy/paste in his intire `keybindings.json` file.

```json
[
    {
        "key": "cmd+r",
        "command": "workbench.action.debug.restart",
        "when": "inDebugMode"
    },
    {
        "key": "cmd+u",
        "command": "workbench.action.debug.start",
        "when": "debuggersAvailable && !inDebugMode"
    },
    {
        "key": "shift+cmd+t",
        "command": "workbench.action.tasks.runTask",
        "args": "test.file"
    },
    {
        "key": "ctrl+space",
        "command": "workbench.action.tasks.runTask",
        "args": "spruce"
    },
    {
        "key": "ctrl+alt+space",
        "command": "workbench.action.tasks.runTask",
        "args": "shell"
    },
    {
        "key": "shift+cmd+w",
        "command": "-workbench.action.closeWindow"
    },
    {
        "key": "shift+cmd+w",
        "command": "workbench.action.closeEditorsInGroup"
    },
    {
        "key": "ctrl+alt+cmd+enter",
        "command": "git.sync"
    },
    {
        "key": "ctrl+shift+alt+cmd+enter",
        "command": "git.push"
    },
    {
        "key": "alt+f8",
        "command": "-editor.action.marker.next",
        "when": "editorFocus"
    },
    {
        "key": "cmd+k p",
        "command": "editor.action.marker.nextInFiles",
        "when": "editorFocus"
    },
    {
        "key": "f8",
        "command": "-editor.action.marker.nextInFiles",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+p p",
        "command": "editor.action.marker.prevInFiles",
        "when": "editorFocus"
    },
    {
        "key": "shift+f8",
        "command": "-editor.action.marker.prevInFiles",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+shift+d",
        "command": "editor.action.addSelectionToPreviousFindMatch"
    },
    {
        "key": "cmd+k d",
        "command": "-workbench.files.action.compareWithSaved"
    },
    {
        "key": "cmd+k d",
        "command": "editor.action.revealDefinition",
        "when": "editorHasDefinitionProvider && editorTextFocus"
    },
    {
        "key": "f12",
        "command": "-editor.action.revealDefinition",
        "when": "editorHasDefinitionProvider && editorTextFocus"
    },
    {
        "key": "cmd+k shift+d",
        "command": "editor.action.revealDefinitionAside",
        "when": "editorHasDefinitionProvider && editorTextFocus && !isInEmbeddedEditor"
    },
    {
        "key": "cmd+k f12",
        "command": "-editor.action.revealDefinitionAside",
        "when": "editorHasDefinitionProvider && editorTextFocus && !isInEmbeddedEditor"
    },
    {
        "key": "cmd+k p",
        "command": "-workbench.action.files.copyPathOfActiveFile"
    },
    {
        "key": "cmd+k shift+p",
        "command": "editor.action.marker.prev",
        "when": "editorFocus"
    },
    {
        "key": "shift+alt+f8",
        "command": "-editor.action.marker.prev",
        "when": "editorFocus"
    },
    {
        "key": "cmd+k g",
        "command": "git.openChange",
        "when": "editorFocus"
    },
    {
        "key": "cmd+k c",
        "command": "workbench.files.action.compareWithClipboard",
        "when": "editorFocus"
    },
    {
        "key": "cmd+k c",
        "command": "-workbench.files.action.compareWithClipboard"
    }
]
```

### Something Missing?

<div class="grid-buttons">
    <a href="https://forms.gle/2ZMtwUxg1egV8sHT8" class="btn">Documentation Enhancement Request Form</a>
</div>