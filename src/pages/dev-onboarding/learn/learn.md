---
title: Learn
---
<style>
.guide-chapters {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chapter-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    background-color: #f0f0f0;
    color: #333;
    transition: background-color 0.3s, transform 0.3s;
}

.chapter-link:hover {
    background-color: #0EDDD3;
    transform: scale(1.05); /* Slightly increase the size */
}

.chapter-number {
    font-weight: bold;
    margin-right: 10px;
}

.disabled {
    opacity: 0.5;
    cursor: default;
}

.disabled:hover {
    background-color: #f0f0f0;
    transform: none; /* No transformation for disabled links */
}
</style>

You've reached the "Learn" section, a step towards unleashing the full potential of your programming skills within the Spruce ecosystem.

## What You Will Learn

This section comprises seven meticulously crafted chapters, each focused on a distinct aspect of Spruce development. By the end of this section, you will not only have a comprehensive understanding of the Spruce framework but also hands-on experience in applying these concepts to real-world scenarios. Here’s a sneak peek into what each chapter offers:

1. **Build a Root Skill View:** Dive into the basics of creating the core interface for your applications.
2. **Manage Your Family Members:** Learn to efficiently handle user relationships and interactions within your applications.
3. **Manage Your Metadata:** Master the art of organizing and manipulating data to enhance application functionality.
4. **Create Multi-Card Forms:** Get acquainted with designing complex forms that capture a wide range of user inputs.
5. **Generate Personalized Stories:** Explore the creative side of Spruce by developing custom narrative experiences for your users.
6. **Long-Running Operations:** Tackle the challenges of managing operations that require extended execution times.
7. **Sharing the Story:** Discover how to amplify your application’s reach by enabling users to share their experiences.

## Project: 8-Bit Stories

To anchor your learning experience, we will be building a project together: **8-Bit Stories**. This project is designed to apply the concepts learned in a practical, engaging manner. 8-Bit Stories is a story generator that allows users to create personalized stories. Through this project, you will see firsthand how the Spruce framework's versatility and power can be harnessed to create applications that captivate and engage.

Let's Get Started!

The following chapter's break down how each building block is placed in creating a story generator using sprucebot:

<div class="guide-chapters">
    <a href="rootskillview/" class="chapter-link">
        <span class="chapter-number">Chapter 1</span>
        <span class="chapter-title">Building a RootSkillView</span>
    </a>
    <a href="metadata/" class="chapter-link">
        <span class="chapter-number">Chapter 2</span>
        <span class="chapter-title">Managing your Metadata</span>
    </a>
    <a href="members/" class="chapter-link">
        <span class="chapter-number">Chapter 3</span>
        <span class="chapter-title">Managing your Family Members</span>
    </a>
    <a href="multi-card-forms/" class="chapter-link">
        <span class="chapter-number">Chapter 4</span>
        <span class="chapter-title">Creating Multi-Card Forms</span>
    </a>
    <a href="personalized-stories/" class="chapter-link">
        <span class="chapter-number">Chapter 5A</span>
        <span class="chapter-title">Generating Personalized Stories with ChatGPT</span>
    </a>
    <a href="long-running-operations/" class="chapter-link">
        <span class="chapter-number">Chapter 5B</span>
        <span class="chapter-title">Long Running Operations</span>
    </a>
    <a href="share-story/" class="chapter-link">
        <span class="chapter-number">Chapter 6</span>
        <span class="chapter-title">Sharing the Story</span>
    </a>
</div>

<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        // Select all chapter links
        const chapterLinks = document.querySelectorAll('.chapter-link');

        // Add a click event listener to each chapter link
        chapterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Prevent default action if the link is disabled
                if (this.classList.contains('disabled')) {
                    e.preventDefault();
                }
            });
        });

        // Ensure all links open in the same tab
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            link.setAttribute('target', '_self');
        });
    });
</script>