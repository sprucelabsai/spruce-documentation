---
title: Start from Scratch
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
    <iframe width="560" height="315" src="https://www.youtube.com/embed/SiUckNpPLag?si=SCepKnOJDJKmLbC-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Overview
In this guide, we'll create a checklist document application using the Spruce framework, focusing on document management and manipulation. We'll implement features for managing checklist items, including selection, addition, deletion, and rearrangement.

## Configure Your Spruce Project
To begin, set up your Spruce project:

1. **Initialize your Spruce project**: Use Spruce CLI to start a new project.
   ```bash
   spruce create.skill your-project-name
   ```

2. **Select a development team**: If necessary, configure your development settings in the project settings.

## Create the Data Model
Our app will have a simple model for checklist items. Define `ChecklistItem` and `Checklist` classes, making them conform to the necessary serialization standards of Spruce.

```typescript
// Add TypeScript code here
```

## Export the App’s Document Type
Define a custom document type for your checklist. You'll need to configure this in your Spruce project settings, typically in a configuration file or as part of your skill's setup.

```typescript
// Add TypeScript code here
```

## Define the App’s Scene
In Spruce, the concept of a "scene" might differ, but you'll be setting up a main view or component that serves as the entry point for your document-based interactions.

```typescript
// Add TypeScript code here
```

## Implement Document Handling
Adopt practices for handling document data within Spruce. This involves reading, writing, and possibly streaming document data.

1. **Reading Document Data**: Implement functionality to read or import documents.
   ```typescript
   // Add TypeScript code here
   ```

2. **Writing Document Data**: Create methods to save or export documents.
   ```typescript
   // Add TypeScript code here
   ```

## Register Undo and Redo Actions
While Spruce might not have a direct equivalent to SwiftUI's `UndoManager`, you can implement similar functionality by creating an undo/redo stack or using existing libraries.

1. **Create Undo/Redo Stack**: Maintain a history of actions to allow undoing and redoing.
   ```typescript
   // Add TypeScript code here
   ```

2. **Integrate Undo/Redo with UI**: Link this functionality with your user interface components.
   ```typescript
   // Add TypeScript code here
   ```

## Conclusion
This guide provides a starting point for building a document-based app with Spruce. Replace the placeholder comments with appropriate Spruce/TypeScript code as you develop each part of your application. Keep in mind that Spruce, being a TypeScript-based framework, will have different approaches and patterns compared to SwiftUI, so adapt the concepts accordingly.