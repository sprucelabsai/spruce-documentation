---
title: Long Running Operations
---

# Chapter 5B

## Introduction

This guide outlines the process of modifying a Sprucebot skill to handle long-running operations, specifically for a story generation feature. The focus is on transitioning from synchronous to asynchronous operations, and handling events and responses efficiently.

## Setting Up Your Environment

Before starting, ensure your development environment is ready:

1. **Docker Setup**: Initialize Docker with `spruce start.cache` for efficient NPM package caching.
2. **Skill Project Creation**: Use `spruce create.skill [yourSkillName]` to initiate a new skill project. Example: `spruce create.skill kata-1`. 
3. **Accessing the Skill**: Navigate to your skill folder and open it in Visual Studio Code:
   ```shell
   cd kata-1 && code .
   ```
4. **IDE Configuration**: Inside Visual Studio Code, run `spruce setup.vscode` in the terminal and follow the setup instructions for debugging and other configurations.

## Implementing Asynchronous Operations

The key challenge is modifying the story generation feature to handle operations that take longer than 30 seconds, specifically splitting the event into two: one to start generation and another to notify upon completion.

### Client-Side Listeners

1. **Introduction to Client-Side Listeners**: Previously, the client emitted events to the skill. Now, the skill will emit events to the client using a targeting system.

2. **Emitting Events from the Skill to the Client**: Implement event emission from the skill to the client to indicate the completion of story generation.

### Implementing Event-Driven Logic

1. **Emitting `didGenerateStory` Event**: Modify the story generator to emit a `didGenerateStory` event post-generation.
   - Implement an asynchronous method `async emitsDidGenerateAfterGenerating` in the test.
   - Update the story generator to emit the `didGenerateStory` event.

2. **Passing the Mercury Client**: Ensure the Mercury client is passed through the factory method to the instance, making it available for emitting events.

3. **Generating and Emitting Events**: Update the `generate` method to emit the `didGenerateStory` event with the required target and payload (story ID and person ID).

4. **Handling Event Responses**: Implement the event response mechanism, focusing on fire-and-forget events without awaiting a response.

### Front-End Adaptations

1. **Implementing Listeners**: Set up listeners on the front end to handle the `didGenerateStory` event.
2. **UI Adjustments**: Adapt the user interface to reflect the new asynchronous operation mode, ensuring smooth user interaction and feedback during the story generation process.

## Testing and Debugging

1. **Writing Tests**: Write tests to ensure that the new event-driven logic works correctly. This includes testing the emission of events, the reception by the client, and the UI response.
2. **Debugging and Refining**: Use debugging tools within your IDE to troubleshoot and refine the implementation. Pay special attention to event handling and async logic.
3. **Iterative Testing**: Continuously test and refine the implementation to handle edge cases and improve user experience.

## Finalizing and Previewing

1. **Final Adjustments**: Make any final adjustments to the code based on testing feedback.
2. **Device Testing**: Test the skill interface on an actual device to ensure the UI and navigation feel natural and responsive.

### Something Missing?

<div class="grid-buttons">
    <a class="btn" href="https://forms.gle/2ZMtwUxg1egV8sHT8">Request Documentation Enhancement</a>
</div>

## Now What?

<div class="grid-buttons">
    <a class="btn" href="{{ '/training/share-story/' | url }}">Sharing the Story</a>
</div>