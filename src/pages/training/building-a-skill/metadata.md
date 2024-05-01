---
title: Managing your Family's Metadata
---
# Chapter 3
In this Chapter, you'll learn how to manage your metadata.

## Render Basic Form

First things first, let's create a form to collect metadata. Imagine this form as the gateway through which users will input their data. But, since we're using the TDD methodology, let's write a test to assert that a form is being rendered before we create a form.

1. Assert that a form is being rendered:

   ```ts
   (add form assert code here)
   ```

Once the test runs, it'll fail and the next step is to create the form.

2. Create a form:

```ts   
(add form code here)
```

After creating a form, you need to create a test to assert the fields within your form.

3. Assert that the form renders fields:

   ```ts
   (add field assert code here)
   ```
NOTE: This test is using `getFormVC` as a function but it has not yet been declared as a method. So, before you move on, select `getFormVC` and choose 'Declare Method' and make it available as a function:

```ts
(code to declare getFormVC as a function)

```

Next, to make model.sections iterable, edit your form as follows:

```ts
(code for mode.sections)
```

Once this is done, you can move on the next step, creating your first Schema.

## Use Schemas to Define Forms

With our form ready, let's define how our data should look and behave using schemas.

1. Define a Schema:

Think of a schema as a rule book for your data. Let's define what fields we need and the type of data each field should hold:

   ```ts
   (add schema definition code here)
   ```
Next, pass view models within `sections`:

```ts
(add code to pass view models)
```
Once you have passed the view models, it's time to preview the form!

2. Start ```watch.views``` in the spruce cli:

```bash
watch.views
```
Viewing your form for the first time, you'll notice a lot of issues. Your next step is to fix all these issues step-by-step and get your form ready.

3. Fix typings:

 ```ts
add code
 ```

4. Linking Schema to Form:

Now, integrate this schema with your form. This ensures that the data entered matches your expectations.

   ```ts
   (add integration code here)
   ```

5. Evolving the Schema:

You need to ensure your shcema is updated as your data changes. Let's write code to update the schema as required.

   ```ts
      (add schema update code here)
   ```

## Emit and Listen to Events

Your form and schema are set. Let’s now focus on making them communicate with the backend.

1. Setting Up Event Emitters:

When a user submits the form, an event will be emitted. This is your way of sending data from the frontend to the backend.

   ```ts
   (add event emitter code here)
   ```

2. Processing Events with Listeners:

The backend needs to listen to these events and know what to do with them.
  
   ```ts
   (add event listener code here)
   ```

## Building Permissions Contracts

You must ensure only the right people have access to the right data.

1. Defining User Roles:

Let’s define different user roles and what each role can or cannot do.
   
   ```ts
   (add roles definition code here)
   ```

2. Implementing Permission Checks:

With roles defined, we now write code to check if a user has the necessary permissions to perform an action.

   ```ts
   (add permission check code here)
   ```

## Using Data Stores

Finally, we need to store our data so that it's not lost when the app closes.

1. Choosing a Data Store:

Based on our needs, let’s choose a suitable place to store our data. This could be a database or any other form of persistent storage.

   ```ts
   (add rationale here)
   ```

2. Saving Data:

Now, write the code to save data into our chosen data store.
 
   
   ```ts
   (add data saving code here)
   ```

3. Retrieving Data:

Equally important is how we get this data back when we need it.

   ```ts
   (add data retrieval code here)
   ```

## Wrapping Up
You have now successfully created a system to manager your metadata!