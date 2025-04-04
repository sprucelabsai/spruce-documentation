# Chapter 2: Feedback

## Overview

Alright! Now, we get to build more sophisticated functionality! But, before we dive in, we’ll review where we left off. Then, we’ll render a dialog, create a form, and handle our first events. Along the way, we’ll refactor for cleaner code, explore schemas, and implement permissions.

## Training
<div class="video-container">
    <iframe width="100%" height="500" src="https://www.youtube.com/embed/EyzktvlHMIs?si=lH8e1efAp5q8PsmD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Pre-requisites
1. Understanding of the previous chapter, [`building a dashboard`](/training/building-a-skill/dashboard) and adding a card with images and buttons.
   
## Concepts Covered in This Chapter
1. [`Mercury`](/concepts/mercury/) - Event-handling and communication via Mercury.
2. [`Tests`](/concepts/tests/) - TDD by the 3 laws!
3. [`Views`](/concepts/views/) - The visual representation of your skill provided by the Heartwood Skill.
4. [`Events`](/concepts/events/) - Custom event creation and handling.
5. [`Schemas`](/concepts/schemas/) - Data validation and normalization through schemas.
6. [`Permissions`](/concepts/permissions/) - Controlling access with permission contracts.
7. [`Listeners`](/concepts/listeners/) - Listening for backend events and responding appropriately.
8. [`Errors`](/concepts/errors/) - Handling and displaying errors effectively.

## Tools Used in This Chapter
1. [`spruce-cli`](/getting-started/install-cli/) - The Spruce Command Line Interface (CLI) is a tool that enables you create, build, and test your skills.
2. [`vscode`](https://code.visualstudio.com/) - A free code editor that works on Windows, macOS, and Linux.
3. [Development Theatre](/getting-started/development-theatre/) - The runtime that executes your skills.
   
## Commands Used in This Chapter

### **Assertions**
1. **`vcAssert.rendersDialogue`**
   - **Description**: Asserts that a dialogue box is rendered on the view controller.

2. **`formAssert.formRendersField`**
   - **Description**: Asserts that a specific field is rendered in the form.

3. **`assert.isFalse`**
   - **Description**: Verifies that a specific condition or value is false.

4. **`formassert.fieldRendersAs`**
   - **Description**: Ensures that a form field is rendered as a specific type, e.g., a text area.

5. **`assert.isEqual`**
   - **Description**: Checks that two values are equal.

6. **`assert.renders.alert`**
   - **Description**: Confirms that an alert is displayed on the view.

4. **`form.cardRrenderedForm`**
   - **Description**: Asserts that a card renders a form.

5. **`form assert.field.renders`**
   - **Description**: Verifies that a specific form field is rendered.


### **Events**
1. **`eventFaker.on`**
   - **Description**: Sets up a listener for a specified event to verify its behavior in tests.

2. **`eventFaker.makeEventThrow`**
   - **Description**: Simulates an event throwing an error for testing purposes.

3. **`client.emit`**
   - **Description**: Emits an event to a backend API.

4. **`client.emitAndFlattenResponses`**
   - **Description**: Emits an event and simplifies the response structure, commonly used when responses contain nested data.

### **Forms**
1. **`formVC.getValue`**
   - **Description**: Retrieves the value of a specific field from the form.

3. **`formVc.setVvalue`**
   - **Description**: Sets a value for a specific field in the form.

### **Views**
1. **`controller.Factory`**
   - **Description**: Creates a new instance of a controller for use in the application.

2. **`this.controller.card`**
   - **Description**: Initializes a card view controller encapsulating the necessary view components.

3. **`this.render.in.dialogue`**
   - **Description**: Renders a dialogue box with specific options and content.

4. **`build.form`**
   - **Description**: Builds a form object with fields, sections, and schema definitions.

### **Listeners and Permissions**
1. **`this.connect.to.API`**
   - **Description**: Establishes a connection to the API for emitting or listening to events.

2. **`buildPermissionReference`**
   - **Description**: Creates a reference for a permission contract, specifying roles and permissions.

3. **`permissions.sync`**
   - **Description**: Synchronizes the permissions configuration to ensure it reflects the latest changes.

### **Terminal and CLI Commands**

1. **`spruce watch.views`**
   - **Description**: Watches for changes in views and rebuilds them automatically during development.

2. **`spruce create.view`**
   - **Description**: Generates a new view controller file using the CLI.

3. **`spruce sync.events`**
   - **Description**: Synchronizes the events configuration, ensuring event types and handlers are up-to-date.

4. **`spruce sync.permissions`**
   - **Description**: Updates permission contracts and related configurations.

### **Schemas**
1. **`spruce create.schema`**
   - **Description**: Constructs a schema definition, including fields, types, and validation rules.

### **Test Doubles**
1. **`SpyFeedbackCard`**
   - **Description**: Defines a protected method used as a test case in the test framework.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/training/building-a-skill/your-family-values/' | url }}">Your Family Values</a>
</div>