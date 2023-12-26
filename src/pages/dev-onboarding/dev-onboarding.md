---
title: Developer Onboarding
---
<style>
.guide-sections {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.section-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    background-color: #f0f0f0;
    color: #333;
    transition: background-color 0.3s, transform 0.3s;
}

.section-link:hover {
    background-color: #0EDDD3;
    transform: scale(1.05); /* Slightly increase the size */
}

.section-number {
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

This section of our Guide will teach you how you can use spruce to create a fully functional AI story generator App that uses your Family Values to create a story about you and your family members. This section is divided into the following 6 chapters:

<div class="guide-sections">
    <a href="learn/" class="section-link">
        <span class="section-number">Section 1</span>
        <span class="section-title">Learn</span>
    </a>
</div>

This section of our Guide will provide katas for you to follow and train yourself in using sprucebot.

<div class="guide-sections">
    <a href="train/" class="section-link">
        <span class="section-number">Section 2</span>
        <span class="section-title">Train</span>
    </a>
</div>

<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        // Select all chapter links
        const sectionLinks = document.querySelectorAll('.section-link');

        // Add a click event listener to each chapter link
        sectionLinks.forEach(link => {
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
