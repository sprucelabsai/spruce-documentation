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
