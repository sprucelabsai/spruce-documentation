# Stores 

Coming Sooon...

<details>
<summary><strong>Kata Prep</strong></summary>

## Pre-requisites
1. Make sure your `Development Theatre` is running.

## Step 1: Create your `skill`

### Create a new directory for your kata

```bash
cd ~/path/to/your/spruce/projects
mkdir katas
```

### Create a new skill

```bash
cd katas
spruce create.skill views-kata
```

### Name your `skill`

> *Note*: Your `skill` name should be unique, so if you did this kata before, you may want to name it something different.

* Name: `Views Kata`
* Description: `A kata to practice creating views!`

### Open your `skill` in VS Code

> *Note*: You can follow the instructions printed in the `cli` or use the command below.

```bash
cd views-kata && code .
```

Then, open the terminal in VS Code and run:

```bash
spruce setup.vscode
```
Hit `Enter` to accept all setup options.

Then complete the following:

1. Open the Command Palette by using `cmd+shift+p` and search type: "Manage"
2. Select "Tasks: Manage Automatic Tasks"
3. Then select "Allow Automatic Tasks"
4. Open the Command Palette again type "reload" and select "Reload Window"

The Test Runner should open and begin installing additional requirements.

When it's done, you should see a message that says `Ready and waiting...`


## Step 2: Create your first test

### Create the test file

1. Hit `ctrl+space` (if you have the shortcuts setup) and hit enter. 
    - If you don't have the shortcuts setup, you can type `spruce create.test` in your terminal and hit `Enter`.
2. Select "Behavioral"
3. For "What are you testing?", type "Root skill view"
4. For "Camel case name", hit Enter (it should say "rootSkillView")
5. For "Which abstract test class do you want to extend?" select "AbstractSpruceFixtureTest"
6. Close the terminal window and get back to the Test Runner.
    - There should be one failing test.
    - The test will explain that before you can do any tests, you need to run `spruce set.remote`
7. Hit `ctrl+space` and type `set.remote` and hit `Enter`.
    - You will be prompted for more dependencies to install. Hit `Enter` to accept them all.
8. For your remote, select "Local"
    - Allow the rest of the dependencies to install
    - If prompted for remote again, select "Local" again
9. Close the terminal window and get back to the Test Runner.
    - The test should now be failing beacuse `false` does not equal `true`.
10. Click on the failing test in the Test Runner and click "Open" to open the test file.

### Prep the test file

1. Clear out the contents of the first test
1. Delete the second test
2. Delete `class RootSkillView {}` at the bottom of the test file

Your test should now be passing.

</details>

# Stores Kata

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>