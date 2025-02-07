# Chapter 3: Your Family Values

## Overview

Welcome back! In this chapter, we’re building on everything we’ve learned so far. First, we’ll recap where we left off—rendering dialogs, creating forms, and handling basic events. Then, we’ll step things up with routing by setting up a redirect and rendering a new SkillView for family values. We’ll dive into working with schemas again and create an event to save your family values.

What’s new? This time, instead of emitting another event in the listener, we’ll persist data using data stores. These are simple database abstraction layers for basic CRUD operations. We’ll test our functionality using an in-memory database for speed. Finally, we’ll retrieve saved values and pre-fill the form when revisited. Let’s get started!

## Training 

<div class="video-container">
    <iframe width="100%" height="500" src="https://www.youtube.com/embed/5kWUCqbBV9U?si=qdmnyk_vFDvWdlDA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


## Pre-requisites

1. Completion of Chapter 2, [`feedback and events`](/training/building-a-skill/feedback-and-events), including:
   - Rendering dialogs and forms.
   - Creating and handling custom events (`submit feedback`).
   - Understanding schemas and permission contracts.

## Concepts Covered in This Chapter

1. [`Routing`](/concepts/routing/) - Redirecting users between SkillViews with proper lifecycle handling.
2. [`Forms`](/concepts/forms/) - Rendering forms dynamically and pre-filling fields with saved data.
3. [`Schemas`](/concepts/schemas/) - Reusing and refining schemas for data validation and structure.
4. [`Events`](/concepts/events/) - Creating custom events, emitting them, and persisting data.
5. [`Stores`](/concepts/stores/) - Stores are a database agnostic way to persist data in your skill. They have a simple intreface that handles CRUD operations.
6. [`Tests`](/concepts/tests/) - Ensuring functionality with TDD, including testing redirects, forms, and events.
7. [`Permissions`](/concepts/permissions/) - Applying permission contracts to secure operations.
8. [`Errors`](/concepts/errors/) - Gracefully managing errors with alerts and debug tools.
   
## Tools Used in This Chapter

1. [`spruce-cli`](/getting-started/install-cli/) - The Spruce Command Line Interface (CLI) is a tool that enables you create, build, and test your skills.
2. [`vscode`](https://code.visualstudio.com/) - A free code editor that works on Windows, macOS, and Linux.
3. [Development Theatre](/getting-started/development-theatre/) - The runtime that executes your skills.
   
## Commands Used in This Chapter

### **Assertions**
1. **`VC assert.action.redirects`**  
   - Verifies that an action triggers a redirect to the expected destination.
2. **`VC assert.redirect`**  
   - Asserts that a redirection occurs to a specific SkillView or view controller.
3. **`VC assert.renders.card`**  
   - Confirms that a card is rendered within the SkillView.
4. **`VC assert.renders.alert`**  
   - Checks if an alert box is rendered during an event or error.
5. **`form assert.renders.field`**  
   - Ensures that a specific form field is rendered.
6. **`form assert.field.renders.as`**  
   - Verifies the type of rendering for a field (e.g., text area or input).
7. **`assert.is.true`**  
   - Validates that a condition is true.
8. **`assert.is.equal`**  
   - Checks if two values are equal.
9. **`assert.is.deep.equal`**  
   - Verifies that two objects, including nested structures, are deeply equal.

### **Routing**
1. **`router.redirect`**  
   - Handles redirection to another view controller or SkillView.
2. **`this.router`**  
   - Provides routing functionalities within the current view.

### **Event Handling**
1. **`event Faker.on`**  
   - Sets up a listener for testing emitted events.
2. **`event Faker.make.throw`**  
   - Simulates error-throwing events during testing.
3. **`client.emit`**  
   - Emits an event with data to the backend for processing.
4. **`client.emit.and.flatten.responses`**  
   - Emits an event and simplifies nested responses for easier handling.
5. **`form interactor.submit`**  
   - Simulates form submission during a test scenario.
6. **`form interactor.cancel`**  
   - Triggers a cancel action for forms during testing.

### **View Controller Lifecycle**
1. **`public async load`**  
   - Main lifecycle method for initializing and configuring the SkillView.
2. **`will.focus`**  
   - Executes just before the view gains focus.
3. **`did.blur`**  
   - Triggered when the view loses focus for cleanup tasks.
4. **`get.is.login.required`**  
   - Determines if user login is mandatory for the view.

### **View Controller and Form Management**
1. **`form VC.get.values`**  
   - Retrieves values entered into a form.
2. **`form VC.set.values`**  
   - Sets predefined values into a form for display.
3. **`form VC.render`**  
   - Renders a form dynamically based on schema and fields.
4. **`controller.Factory`**  
   - Creates a new controller instance.
5. **`this.load`**  
   - Implements the `load` lifecycle method for SkillViews.

### **Schemas and Forms**
1. **`build.schema`**  
   - Constructs schema definitions with fields and validation rules.
2. **`build.form`**  
   - Creates forms using a predefined schema.
3. **`sync.schemas`**  
   - Updates schema definitions across the project.

### **Testing Utilities**
1. **`assert.is.true`**  
   - Confirms that a condition is true.
2. **`assert.is.deep.equal`**  
   - Verifies equality between complex objects, including nested properties.
3. **`test.protected.static`**  
   - Defines reusable, protected test cases for consistency.

### **Other Utilities**
1. **`sync.events`**  
   - Synchronizes event configurations across the application.
2. **`sync.views`**  
   - Updates and rebuilds SkillViews during development.
3. **`this.connect.to.API`**  
   - Establishes a connection to the API for emitting and handling events.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/training/building-a-skill/your-family-members/' | url }}">Your Family Members</a>
</div>