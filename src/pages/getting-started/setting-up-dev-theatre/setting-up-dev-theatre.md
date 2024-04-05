---
title: Install Development Theatre
---
<style>
#information ul, .posts {
    list-style: none;
    padding: 0;
    margin: 0;
}

.group:after {
    content: "";
    display: table;
    clear: both;
}

#information .row .col-1, #information .row .col-2 {
    box-sizing: border-box;
    float: left;
    width: calc(50% - 10px);
    padding: 10px;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.3s;
    margin-right: 20px;
    margin-bottom: 20px;
    height: 150px;
}

#information .row .col-2 {
    margin-right: 0;
}

#information .row .col-1:hover, #information .row .col-2:hover {
    background-color: #0EDDD3;
    transform: scale(1.05);
}
</style>

<div id="information">
    <ul>
        <li>
            <div class="group row">
                <div class="copyable">
                    <figure class="highlight">
                        <pre><code class="language-bash" data-lang="bash">$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code></pre>
                    </figure>
                </div>
                <div class="col-1">
                    <p>Paste that in a macOS Terminal or Linux shell prompt.</p>
                </div>
                <div class="col-2">
                    <p>Paste that in a macOS Terminal or Linux shell prompt <a href="https://docs.brew.sh/Installation" style="color: #333; text-decoration: underline;">installation options</a>.</p>
                </div>
            </div>
            <div class="group row">
                <div class="col-1">
                    <p>Paste that in a macOS Terminal or Linux shell prompt <code>.pkg</code> installer.</p>
                </div>
                <div class="col-2">
                    <p>Download it from <a href="https://github.com/Homebrew/brew/releases/latest" style="color: #333; text-decoration: underline;"></a>.</p>
                </div>
            </div>
        </li>
    </ul>
</div>