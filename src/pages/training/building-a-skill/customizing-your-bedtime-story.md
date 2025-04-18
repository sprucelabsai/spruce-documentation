# Chapter 5: Customizing Your Bedtime Story

## Overview

Coming soon...

## Training 

<div class="video-container">
    <iframe width="100%" height="500" src="https://www.youtube.com/embed/k9zAD_TEY_k?feature=shared" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Pre-requisites

## Concepts Covered in This Chapter

## Tools Used in This Chapter

## Commands Used in This Chapter

### **Assertions**
1. **`assert.is.truthy`**  
   - Ensures that a given value is truthy (not null or undefined).
2. **`assert.is.true`**  
   - Validates that a condition is true.
3. **`assert.is.equal`**  
   - Checks if two values are equal.
4. **`assert.is.deep.equal`**  
   - Verifies that complex or nested objects are deeply equal.
5. **`assert.throws`**  
   - Confirms that an error is thrown during a specific operation.
6. **`form assert.card.renders.form`**  
   - Checks if a form is correctly rendered inside a card.
7. **`form assert.renders.field`**  
   - Verifies that a specific field is rendered in a form.
8. **`form assert.field.renders.as`**  
   - Confirms the type of UI element rendered for a field (e.g., select, text area).
9. **`form assert.field.renders.options`**  
   - Validates the rendering of expected choices/options for a select field.

### **Routing**
1. **`router.redirect`**  
   - Redirects the user to a different SkillView or route.
2. **`this.router`**  
   - Accesses routing methods and helpers within the current view.

### **Event Handling**
1. **`eventFaker.fake`**  
   - Fakes events such as `did.generate.story`, `list.family.members`, or `current.challenge`.
2. **`eventFaker.on`**  
   - Sets up event listeners for testing purposes.
3. **`client.emit`**  
   - Sends a specific event to the backend for processing.
4. **`client.emit.and.flatten.responses`**  
   - Emits an event and flattens the response for simpler handling.

### **View Controller Lifecycle**
1. **`public async load`**  
   - Lifecycle method used to initialize view controllers and pass in route parameters.

### **View Controller and Form Management**
1. **`formVC.get.values`**  
   - Retrieves values from the form.
2. **`formVC.render`**  
   - Renders a form dynamically based on a schema.
3. **`this.load()`**  
   - Triggers the load lifecycle manually.
4. **`this.views.setController`**  
   - Sets a specific view controller for a view.
5. **`controller.Factory`**  
   - Instantiates a new view controller.
6. **`get.form.VC`**  
   - Returns the internal form view controller.
7. **`get.card.VC`**  
   - Retrieves the card view controller from within another component.

### **Schemas and Forms**
1. **`build.schema`**  
   - Defines a schema with ID, type, and required fields.
2. **`build.form`**  
   - Uses a schema to generate a complete form definition.
3. **`form schema.sections.fields`**  
   - Declares the layout and rendering options of form fields.

### **Testing Utilities**
1. **`test.static.async`**  
   - Declares async test cases that can be reused across tests.
2. **`spy.class.extends`**  
   - Used to create test doubles by extending base controllers.
3. **`get.view.controller`**  
   - Retrieves a stub or real controller for test inspection.
4. **`get.should.render.submit.controls`**  
   - Checks whether form-level submit buttons are visible or hidden.

### **Other Utilities**
1. **`generate.id`**  
   - Generates a random unique ID for use in mock data or schemas.
2. **`extract.schema.to.module.scope`**  
   - Refactors schema definitions for reuse across the module.
3. **`render.as.select`**  
   - Renders a field as a multi-select dropdown.
4. **`is.array.true`**  
   - Declares a field as supporting multiple selections.
5. **`form.card.view.controller`**  
   - Wraps both form and card into a reusable controller.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/training/building-a-skill/open-ai-setup/' | url }}">Open AI Set Up</a>
</div>