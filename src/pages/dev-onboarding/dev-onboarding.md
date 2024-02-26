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

Welcome to the Developer Onboarding Guide for Spruce. This guide serves as your comprehensive roadmap, crafted to seamlessly introduce you to the intricacies of the Sprucebot platform. At its core, this guide utilizes an engaging, hands-on approach: you will develop a family-centric AI story generator, which acts as a practical tool for learning.

In this section, we've outlined six chapters to guide you step by step in building an app that crafts stories about you and your family members based on your family values. 

<div class="guide-sections">
    <a href="learn/" class="section-link">
        <span class="section-number">Section 1</span>
        <span class="section-title">Learn.</span>
    </a>
</div>

In this section of our guide, we provide a series of katas, or structured exercises, designed to enhance your skills in using Sprucebot. These katas offer hands-on experience, allowing you to enhance your proficiency with the sprucebot platform.

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
