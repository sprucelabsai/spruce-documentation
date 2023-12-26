---
title: Concepts
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

This section of explains all the sprucebot concepts

<div class="guide-sections">
    <a href="errors/" class="section-link">
        <span class="section-number">Section 1</span>
        <span class="section-title">Errors</span>
    </a>
    <a href="listeners/" class="section-link">
        <span class="section-number">Section 2</span>
        <span class="section-title">Listeners</span>
    </a>
    <a href="schemas/" class="section-link">
        <span class="section-number">Section 3</span>
        <span class="section-title">Schemas</span>
    </a>
    <a href="stores/" class="section-link">
        <span class="section-number">Section 4</span>
        <span class="section-title">Stores</span>
    </a>
    <a href="events/" class="section-link">
        <span class="section-number">Section 5</span>
        <span class="section-title">Events</span>
    </a>
    <a href="tests/" class="section-link">
        <span class="section-number">Section 6</span>
        <span class="section-title">Tests</span>
    </a>
    <a href="views/" class="section-link">
        <span class="section-number">Section 7</span>
        <span class="section-title">Views</span>
    </a>
    <a href="mercury/" class="section-link">
        <span class="section-number">Section 8</span>
        <span class="section-title">Mercury</span>
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