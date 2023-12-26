---
title: Building a Root Skill View
tocData:
  - text: Chapter 1
    href: chapter-1
    children:
      - text: Set Up Testing Environment and IDE
        href: set-up-testing-environment-and-ide
        children:
          - text: Start Docker for NPM Caching
            href: start-docker-for-npm-caching
          - text: Create New Skill
            href: create-new-skill
          - text: Access Your New Skill
            href: access-your-new-skill
          - text: Turn on WatchMode
            href: turn-on-watchmode
      - text: Write your First Failing Test
        href: write-your-first-failing-test
        children:
          - text: Drafting the First Test
            href: drafting-the-first-test
      - text: Create a Root Skill View
        href: create-a-root-skill-view
        children:
          - text: Add Logic to Your Root Skill Interface
            href: add-logic-to-your-root-skill-interface
          - text: Test the Root Skill Interface
            href: test-the-root-skill-interface
          - text: Set Up Dynamic Routing
            href: set-up-dynamic-routing
      - text: Preview on a Device
        href: preview-on-a-device
---

<style>
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    padding-top: 25px;
    height: 0;
    margin-bottom: 20px; /* Adjust as needed */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Soft shadow for depth */
    border-radius: 10px; /* Rounded corners */
    overflow: hidden; /* Ensures the corner radius is applied */
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>


<div class="video-container">
    <iframe src="https://youtu.be/SiUckNpPLag?si=kqjULfkNZGF3iBME" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Chapter 1
In this Chapter, you'll build your first Root Skill View

## Set Up Testing Environment and IDE

### Start Docker for NPM Caching
Run the command `spruce start.cache`

This initializes Docker to use aggressive caching for NPM packages, which improves the speed of dependency retrieval.

### Create New Skill
Create a new skill environment by typing `spruce create.skill (yourSkillName)`. For example, our test skill is called **"kata-1"**:

```bash
spruce create.skill kata-1
```

You'll need to provide a name and description for your skill.

**Note**: Skill names can’t start with a number.

Next, the system will install various dependencies.

### Access Your New Skill
To open your skill in Visual Studio Code, type `cd (yourSkillName) && code .`. For instance:
```bash
cd kata-1 && code .
```
Inside Visual Studio Code, go to the terminal and run:
```bash
spruce setup.vscode
```

The terminal will guide you through finalizing the setup for debugging, building, testing, linting, and configuring watchers for starting Visual Studio Code.

When done, use the command palette to find **Manage Automatic Tasks** and select **Allow Automatic Tasks**.

Reopen the command palette and choose **Reload Window**.

This will start tasks that enable testing. The tests will run, spot any missing dependencies, and install them as needed.

### Turn on WatchMode
In your external terminal, type:

```bash
spruce test --watchMode smart
```
This command continuously runs tests you're developing, and upon success, it starts the remaining tests. It’s recommended to keep this on during development.

## Write Your First Failing Test
With WatchMode on, go back to Visual Studio Code and the command palette, and run `create.test`.
You'll choose between two types of testing:
  1. Behavioural: To check the changes you make in the environment.
  2. Implementation: To check the inner workings.

We’ll focus on Behavioural tests due to the significant changes we're implementing, especially when integrating with other services.

Select Behavioural tests, and you’ll be asked to specify what you’re testing, using camel case.

```bash
# Enter the actual commands for the IDE setup here
```

### Drafting the First Test
Write a new behavioral test called "RootSkillView".
Base the test on the "abstract spruce fixture test".

```typescript
 # Enter the actual code snippet for creating a new test here
```

## Create a Root Skill View

After setting up the IDE and starting testing, the next step is to build the skill interfaces, starting with the root skill view.

***To Create the Root Skill View:**

Use the command `spruce create.view` to begin making your root skill interface.

```bash
spruce create.view
```

When asked, choose `Skill View Controller` for your controller type.

For the controller name, type `root`.

The command-line will handle file generation and setup for your root skill interface.

```ts
display the code structure here
```

### Add Logic to Your Root Skill Interface

In your `RootSkillViewController`, add basic UI elements like cards, buttons, and images.

```ts
enter code snippet for UI elements here
```

Describe the elements and how they interact, such as what happens when buttons are clicked.

```ts
enter code snippet for UI interactions and error handling here
```

```typescript
// Example of button implementation
handleButtonClick() {
  // Response logic for button click
}
```

Include error management and plan for when users deviate from the expected interaction path.

### Test the Root Skill Interface

Write a test to make sure the root skill interface is rendered correctly.

Use the `assert` library to check for the existence and proper display of all UI components.

```typescript
code
```

Run your tests using `spruce test` in watch mode to continuously monitor for changes and mistakes.

### Set Up Dynamic Routing

Define routes in your skill interface to allow for smooth transitions between different views.

```ts
enter snippet for route definition and testing here
```

Create functions to manage the routes, like `redirectToMetaView` or `returnToRootView`.

```typescript
// Example of a redirect function
```

Design tests to ensure your routing works correctly, particularly in handling user actions.

## Preview on a Device



Test the skill interface on an actual device to ensure the UI and navigation feel natural and responsive.

If possible, use emulation tools in your development environment to simulate different devices.

Adjust the UI based on device preview feedback.