---
title: Managing your Family Members
---
# Chapter 2
In this Chapter, you'll learn how to Manage your Family Members.

## Manage Family Members Skill View
1. **Initial Test for the Manage Family Members Skill View**
Create a failing test for the "Manage Family Members" skill view.
   ```typescript
   // Example code for failing test
   ```

2. **SkillViewController Creation**
Run `create.view` and generate a **Skill View Controller** named "Members".

3. **Redirection Test**
Create a failing test to test that clicking Family members redirects to the "Members" skill view.
   ```typescript
   clickingMembersRedirectstoMembersSkillView();
   ```

4. **Add OnClick Event**
Make the test pass by adding an `OnClick` event in `root.svc.ts`.
   ```typescript
   // Code example for OnClick
   ```

5. **Code Optimization**
Remove any redundancies and simplify the code.
   ```typescript
   // Code example for simplification
   ```

6. **Run `watch.views` to test your skill view.**

### Create a Card for the Manage Family Members Skill View
1. **Card Test Creation**
 Start with a test for a card in the skill view.
   ```
   // Code example for card test
   protected static viewRendersCard;
   ```

2. **Card Implementation**
Pass the test by adding a card in `members.svc.ts`.
   ```typescript
   // Code example for card implementation
   ```

3. **Code Cleanup**
Ensure the code is streamlined and easy to understand.

4. **List Rendering Test**
Add a test to verify that the card renders a list.
   ```
   // Code for testing list rendering
   ```

5. **List Creation**
Implement the list in `members.svc.ts`.

### Create a Family Member Form
The next step is to create a Family Member Form that allows you to add family memebers.

1. **Form Test**
Start by writing a test for the form card view controller.
   ```typescript
   // Code for form test
   ```

2. **Form View Controller**
Create a family member form card view controller.
   ```
   // Code for form view controller
   ```

3. **Form Functionality Test**
Develop a test for the form's functionality.
   ```typescript
   formAssertcardRendersForm;
   ```

4. **Schema Definition**
Define a schema for a family member.
   ```
   // Code for schema definition
   ```

5. **Form Implementation**
Create the form inside `FamilyMemberFormCard.svc.ts`.
   ```typescript
   // Code for form implementation
   ```

6. **Run `watch.views` to ensure the form is functioning as expected**

### Add a Listener
Implement a listener for the `eightbitstories.addfamilymembers` event.

1. **Listener Test**
Write a test for the "Add Family Members" listener.
   ```
   // Code for listener test
   ```

2. **Listener Creation**
Execute `create.listener`.

3. **Listener Implementation**
Implement the listener in `addfamilymembers.svc.ts`.
   ```typescript
   // Code for listener implementation
   ```

4. **Record Creation Test**
Write a test to ensure adding a family member creates a record.
   ```
   // Code for record creation test
   ```

5. **Store Configuration**
 Set up and configure a store for family members.
   ```
   // Code for store configuration
   ```
6. **Run `watch.views` to test**

### Refactoring 
Before moving on, start refactoring the code to improve efficiency and readability.

### Create List Family Members Event
This section focuses on implementing an event to list family members.

1. **Event Test Creation**
 Start by writing a test to test the event correctly lists family members.
   ```typescript
   // Code example for testing list event
   ```

2. **Event Implementation**
 Implement the event.
   ```typescript
   // Code example for event implementation
   ```

3. **Data Retrieval Test**
 Create a test to check if the event correctly retrieves family member data.
   ```typescript
   // Code example for data retrieval test
   ```

4. **Data Retrieval Implementation**
 Implement the logic to retrieve family member data.
   ```typescript
   // Code example for data retrieval
   ```

5. **Event Optimization**
 Refine and optimize the event code.
   ```typescript
   // Code example for optimization
   ```

6. **Run `watch.views` to test**

### Make the List Load and Populate
Ensure the family member list is dynamically loading and populating correctly.

1. **Loading Test**
 Write a test to verify that the list loads correctly on the user interface.
   ```typescript
   // Code example for loading test
   ```

2. **Loading Implementation**
 Implement the loading functionality in the appropriate service file.
   ```typescript
   // Code example for loading implementation
   ```

3. **Population Test**
 Develop a test to ensure the list populates with correct family member data.
   ```typescript
   // Code example for population test
   ```

4. **Population Implementation**
 Code the logic to populate the list with family member data.
   ```typescript
   // Code example for population implementation
   ```

5. **UI Integration**
 Integrate the loading and population functionality with the user interface.
   ```typescript
   // Code example for UI integration
   ```

6. **Run `watch.views` to test**
 Test the complete functionality in the user interface to ensure accuracy and efficiency.

### Delete Family Members
Implement functionality for deleting family members from the list.

1. **Deletion Test**
 Start by writing a test for the delete functionality.
   ```typescript
   // Code example for deletion test
   ```

2. **Deletion Implementation**
 Implement the delete function in the relevant service file.
   ```typescript
   // Code example for deletion implementation
   ```

3. **Confirmation Dialog Test**
 Create a test for the confirmation dialog before deletion.
   ```typescript
   // Code example for confirmation dialog test
   ```

4. **Confirmation Dialog Implementation**
 Code the logic for a confirmation dialog to appear before deletion.
   ```typescript
   // Code example for confirmation dialog
   ```

5. **Update UI Test**
 Write a test to ensure the UI updates correctly after deletion.
   ```typescript
   // Code example for UI update test
   ```

6. **Update UI Implementation**
 Implement the logic to update the UI post-deletion.
   ```typescript
   // Code example for UI update
   ```

7. **Run `watch.views` to test**

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>