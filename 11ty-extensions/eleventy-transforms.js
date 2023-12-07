const postHtml = require("posthtml")();
const htmlMin = require("html-minifier");
const { noopener } = require("posthtml-noopener");
const dom = require("fauxdom");
const he = require("he");
const hljs = require("highlight.js");
require("highlightjs-svelte")(hljs);

module.exports = function(eleventyConfig) {

  eleventyConfig.addTransform("addRelNoopener", async function(content) {
    const noopenerInst = noopener();

    if (this.page.outputPath.endsWith(".html")) {
      const result = await postHtml.use(noopenerInst).process(content);
      return result.html;
    }

    return content;
  });

  eleventyConfig.addTransform("htmlmin", async function(content) {
    if (this.page.outputPath.endsWith(".html")) {
      return htmlMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      });
    }

    return content;
  });

  eleventyConfig.addTransform("highlight", async function(content) {
    if (this.page.outputPath.endsWith(".html")) {
      const document = new dom(content);
      const preBlocks = document.querySelectorAll('pre:has(code)');
      preBlocks.forEach((pre) => {
        pre.className += ' hljs-container';
        const code = pre.querySelector('code');
        const maybeLanguage = code.className.match(/(?<=\blanguage-)[A-Za-z0-9_-]+/);
        const blockText = he.decode(code.textContent);
        if (maybeLanguage) {
          code.innerHTML = hljs.highlight(blockText, {language: maybeLanguage[0]}).value;
        } else {
          code.innerHTML = hljs.highlightAuto(blockText).value;
        }
        code.className += ' hljs';
      });
      return document.innerHTML;
    }
    return content;
  });
}