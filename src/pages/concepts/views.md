---
title: Views
---

![](/assets/img/concepts/views.svg){.sz80p} {.center}

# Overview
Skill Views are top-level Views that include various components such as Cards, Lists, Forms, etc. They are what you see when you visit spruce.bot. They are the equivalent of pages in classical web development. They are controlled by SkillViewControllers. Every skill can have one RootSkillViewController that is loaded by the skill's namespace (https://{{namespace}}.spruce.bot), and there is no limit to the number of Skill Views (and Views) a skill can have besides Root.

1. **Skill Views**: These are the top-level Views that users interact with when they visit a skill on spruce.bot. Skill Views can incorporate various components such as Cards, Lists, and Forms, providing a rich and dynamic user experience.

2. **RootSkillViewController**: Each skill in Sprucebot has one central controller, the RootSkillViewController, which acts as the entry point. This controller is responsible for managing the primary View of the skill, accessible via the skill's unique namespace URL.

3. **Components of Views**: Within each View, you can integrate various components to build a comprehensive interface. These components include:
    - **Cards**: Used for displaying information in a segmented format.
    - **Lists**: Ideal for presenting a collection of items or options.
    - **Forms**: Facilitate user input and interactions.

4. **Creating Views**: To create a new Skill View, developers use the `spruce create.view` command. This initiates the process of building a custom View tailored to the specific needs of the skill.

5. **Previewing and Live Reloading**: The `spruce watch.views` command allows for live reloading and real-time previews of Views. This feature is crucial for iterative development and immediate feedback on changes.

6. **Incremental Building**: As developers make modifications to the source, Sprucebot incrementally builds the Views, streamlining the development process and ensuring that changes are promptly reflected.

By utilizing these Views, developers can craft a customized, engaging, and intuitive interface for their skills on Sprucebot, enhancing the user experience and interaction.