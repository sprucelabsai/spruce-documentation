---
title: Getting Started
---
<style>
  #language-selector {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  #language-selector button {
    background-color: #1a1a1a;
    color: #fff;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 6px 12px; /* Further reduced padding */
    margin: 0 6px; /* Further reduced margin */
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8em; /* Further reduced font size */
  }

  #language-selector button:hover, #language-selector button:focus {
    background-color: #0d6efd;
    border-color: #0d6efd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  #language-selector button:active {
    transform: translateY(1px);
    box-shadow: none;
  }
</style>

  <div id="language-selector">
    <button data-language="ruby">Ruby</button>
    <button data-language="python">Python</button>
    <button data-language="ios">IOS</button>
    <button data-language="android">Android</button>
    <button data-language="laravel">Laravel</button>
    <button data-language="react">React</button>
    <button data-language="flask">Flask</button>
    <button data-language="django">Django</button>
    <button data-language="spring">Spring</button>
    <button data-language="groovy">Groovy</button>
  </div>

  <div id="content-ruby" class="language-content" style="display:none;">

  ## Ruby

  </div>
  <div id="content-python" class="language-content" style="display:none;">
    
   ## Python
    
  </div>
  <div id="content-ios" class="language-content" style="display:none;">
    
   ## IOS
    
  </div>
  <div id="content-android" class="language-content" style="display:none;">
    
   ## Android
    
  </div>
  <div id="content-laravel" class="language-content" style="display:none;">
    
   ## Laravel
    
  </div>
  <div id="content-react" class="language-content" style="display:none;">
    
   ## React
    
  </div>
  <div id="content-flask" class="language-content" style="display:none;">
    
   ## Flask
    
  </div>
  <div id="content-django" class="language-content" style="display:none;">
    
   ## Django
    
  </div>
  <div id="content-spring" class="language-content" style="display:none;">
    
   ## Spring
    
  </div>
  <div id="content-groovy" class="language-content" style="display:none;">
    
   ## Groovy
    
  </div>
</section>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('#language-selector button').forEach(button => {
        button.addEventListener('click', function () {
          document.querySelectorAll('.language-content').forEach(content => {
            content.style.display = 'none'; // Hide all content
          });
          const language = this.getAttribute('data-language');
          document
            .querySelector(`#content-${language}`)
            .style
            .display = 'block'; // Show selected language content
        });
      });
    });
  </script>