# Chapter 7: Share Your Story

## Overview

Coming soon...

## Training

<div class="video-container">
    <iframe width="100%" height="500" src="https://www.youtube.com/embed/dbAcXWvKEwk?si=QuMv17EXlwrR54LA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Pre-requisites

## Concepts Covered in This Chapter

## Tools Used in This Chapter

## Commands Used in This Chapter

### **Assertions**
1. **`assert.is.true`**  
   - Validates that a condition is true.
2. **`assert.is.equal`**  
   - Checks if two values are equal.
3. **`assert.is.deep.equal`**  
   - Verifies that complex or nested objects are deeply equal.
4. **`assert.does.throw.async`**  
   - Asserts that an asynchronous operation throws an error.
5. **`assert.error.code`**  
   - Verifies that a thrown error contains the expected code.
6. **`assert.card.renders.button`**  
   - Confirms that a specific button is rendered within a card.
7. **`assert.action.redirects`**  
   - Verifies that an action (e.g., button click) triggers a redirect.
8. **`assert.is.truthy`**  
   - Ensures that a given value is truthy (not null or undefined).

### **Event Handling**
1. **`eventFaker.fake.getStory`**  
   - Fakes the `get.story` event for test purposes.
2. **`eventFaker.on`**  
   - Sets up a listener for testing emitted events.
3. **`eventFaker.make.throw`**  
   - Simulates error-throwing events during testing.
4. **`client.emit`**  
   - Emits a specified event to the backend.
5. **`client.emit.and.flatten.responses`**  
   - Emits an event and flattens the response for easier access.

### **View Controller Lifecycle**
1. **`public async load`**  
   - Main lifecycle method used to initialize the SkillView with options and routers.
2. **`this.router.redirect`**  
   - Redirects to a specified view.
3. **`get.is.login.required`**  
   - Returns whether the user must be logged in to view the SkillView.

### **View Controller and Form Management**
1. **`formVC.get.values`**  
   - Retrieves values from a form.
2. **`formVC.render`**  
   - Renders a form based on a schema.
3. **`this.load`**  
   - Used to invoke the load method manually during tests.
4. **`this.router`**  
   - Accesses the router for view navigation.

### **SkillView Setup and Configuration**
1. **`this.views.setController`**  
   - Overrides the controller used by a view for testing purposes.
2. **`controller.Factory`**  
   - Creates a new view controller instance.
3. **`this.views.render`**  
   - Renders the current view controller and returns the model.
4. **`spyView.getCardVC`**  
   - Returns the internal card view controller for assertions in tests.

### **Schemas and Events**
1. **`build.schema`**  
   - Used to define fields and structure for events or forms.
2. **`sync.events`**  
   - Syncs event configuration across the project.
3. **`sync.permissions`**  
   - Syncs permission definitions and fixes typing errors in tests.
4. **`sync.errors`**  
   - Updates and rebuilds error types across the app.
5. **`generate.id`**  
   - Generates unique identifiers for fake data or test payloads.

### **Error Handling**
1. **`SpruceError`**  
   - Used to throw platform-specific custom errors.
2. **`FamilyMemberNotFound / StoryNotFound`**  
   - Examples of custom error codes used in tests.

### **Test Utilities**
1. **`test.protected.static.async`**  
   - Defines reusable protected test cases with async logic.
2. **`await this.load()`**  
   - Manually triggers the load method with parameters in a test.
3. **`testRouter.setShouldThrowWhenRedirectingToBadSkillViewController(false)`**  
   - Disables redirect validation when testing external skill redirects.

### **Sharing and Routing**
1. **`buildRouteToCreateInvite`**  
   - Generates a redirect path to the invite skill with parameters.
2. **`@sprucelabs/spruce-invite-utils`**  
   - External utility library used to help construct valid invite URLs.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/training/building-a-skill/onboarding/' | url }}">Onboarding</a>
</div>