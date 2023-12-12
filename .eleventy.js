require("json5/lib/register");

const { EleventyRenderPlugin } = require("@11ty/eleventy");
const externalLinks = require("@aloskutov/eleventy-plugin-external-links");

const registerExtensions = require("./11ty-extensions");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "./src/assets/": "assets" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/font-awesome/css": "assets/font-awesome/css" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/font-awesome/fonts": "assets/font-awesome/fonts" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/highlight.js/styles/atom-one-light.min.css": "styles/highlight.js-atom-one-light.min.css" });

  eleventyConfig.addPassthroughCopy({ "./client-side-compiled/**/*": "scripts" });
  eleventyConfig.addPassthroughCopy({ "./styles-compiled/**/*": "styles" });
  eleventyConfig.addPassthroughCopy({ "./src/copy-to-root/*": "." });


  eleventyConfig.addPassthroughCopy({ "./node_modules/lunr/lunr.min.js": "scripts/libs/lunr.min.js" });

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(false);

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(externalLinks, { overwrite: false });

  eleventyConfig.setServerOptions({
    showAllHosts: true
  });

  eleventyConfig.setWatchThrottleWaitTime(100);

  registerExtensions(eleventyConfig);

  return {
    pathPrefix: "/spruce-documentation/",
    dir: {
      input: "src/pages",
    }
  }
};