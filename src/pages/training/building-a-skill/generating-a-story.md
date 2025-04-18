# Chapter 6b: Generating a Bedtime Story with ChatGPT

## Overview

Coming soon...

## Training

<div class="video-container">
    <iframe width="100%" height="500" src="https://www.youtube.com/embed/Jy2bCkcKGjg?si=FhAdYWuXBMnzDFKK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
   - Confirms deep equality between objects, including nested structures.
4. **`assert.is.truthy`**  
   - Ensures that a value is not null, undefined, or false.
5. **`assert.throws`**  
   - Verifies that a function throws an error.
6. **`assert.does.throw.async`**  
   - Asserts that an async method throws an expected error.
7. **`assert.error.code`**  
   - Validates that a thrown error has the correct error code.
8. **`assert.did.not.call.chat.completions.create`**  
   - Ensures OpenAI's `chat.completions.create` method was not called.
9. **`assert.create.completion.called`**  
   - Confirms `chat.completions.create` was called.
10. **`assert.chat.completion.call.model`**  
    - Validates the model name in a ChatGPT request.
11. **`assert.first.completion.message.equals`**  
    - Checks if the first message sent to ChatGPT matches expectations.
12. **`assert.second.message.equals`**  
    - Checks if the second message sent to ChatGPT was properly structured.
13. **`assert.is.equal.actual.body`**  
    - Confirms that the actual body matches the expected body after creation.
14. **`assert.is.truthy.story`**  
    - Confirms that a story record was created and is not null or undefined.

### **Event Handling & Mocking**
1. **`eventFaker.fake.getStory`**  
   - Fakes the `get.story` event in tests.
2. **`generate.id`**  
   - Generates unique values for mocking input or API keys.
3. **`spy.OpenAI`**  
   - Spy class for intercepting OpenAI calls.
4. **`mock.OpenAI`**  
   - Mock implementation of OpenAI client.
5. **`spy.OpenAI.instance`**  
   - Singleton instance for asserting mock client behavior.
6. **`mock.story.generator.errorMessage`**  
   - Used to trigger and test error conditions from within mocks.

### **ChatGPT/OpenAI Integration**
1. **`OpenAI.chat.completions.create`**  
   - Sends chat messages to OpenAI and gets a completion.
2. **`chat.completions.create`**  
   - Alias used across assertions and mocks for OpenAI interaction.
3. **`model: "gpt-4-0125-preview"`**  
   - Chat model used in the tests.
4. **`messages: [{ role, content }]`**  
   - Structure of prompts sent to OpenAI's chat completions API.
5. **`create.options.model`**  
   - Part of assert chain confirming the model name used.
6. **`create.options.messages`**  
   - Asserts that the prompt messages were formed correctly.

### **Story Generator Methods**
1. **`story.generator.builder`**  
   - Factory method that sets up a generator with mock dependencies.
2. **`story.generator.generate.story`**  
   - Main function for story generation.
3. **`story.generator.generate.second.message`**  
   - Builds the second prompt message for ChatGPT.
4. **`this.chat.GPT.response.text`**  
   - Stores the fake chat response for reuse in test assertions.
5. **`await.this.generate.story.with.all.members`**  
   - Utility to generate a story with complete inputs.
6. **`this.get.first.family.member`**  
   - Helper method to fetch seed data in tests.
7. **`await.this.stories.create.one`**  
   - Creates a new story record in the store.
8. **`await.stories.find.one`**  
   - Finds and retrieves a story by ID from the store.

### **Testing Utilities**
1. **`test.protected.static.async`**  
   - Defines reusable async test cases.
2. **`before.each`**  
   - Prepares a fresh context for each test run.
3. **`before.all`**  
   - Runs setup logic once before all test cases.
4. **`await.this.load()`**  
   - Initializes SkillView or test context manually.
5. **`testRouter.setShouldThrowWhenRedirectingToBadSkillViewController(false)`**  
   - Disables redirect validation during external redirect tests.
6. **`assert.does.throw.async(this.bootSkill)`**  
   - Ensures that booting the skill fails as expected if misconfigured.

### **Schema & Error Handling**
1. **`schema.error.code.invalid.parameters`**  
   - Error thrown for unexpected or malformed input.
2. **`schema.error.code.missing.parameters`**  
   - Error thrown when required parameters are not provided.
3. **`throw.invalid.family.member.ids`**  
   - Throws when one or more family member IDs are invalid.
4. **`throw.invalid.family.id`**  
   - Throws when the specified family ID doesn't exist.
5. **`throw.missing.openAI.key`**  
   - Throws when OpenAI key is missing in environment variables.
6. **`schema.fields.story.body.source`**  
   - Field declarations used in schema creation.
7. **`sync.schemas()`**  
   - Applies updated schemas to the store system.

### **Form & Skill Context Management**
1. **`generate.prompt({ family, familyMembers, storyElements, currentChallenge })`**  
   - Passes structured options to generate prompt content.
2. **`spy.story.generator.implements.type`**  
   - Used to typecast and verify properties on the generator.
3. **`extends.abstract.8bit.test`**  
   - Class extension for standardized test configuration.
4. **`merge.skill.context.types`**  
   - Used to patch typing for extended Skill context in TypeScript.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/training/building-a-skill/share-story/' | url }}">Sharing Your Story</a>
</div>