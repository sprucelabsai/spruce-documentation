const now = String(Date.now());
const pluginTOC = require('eleventy-plugin-toc');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
};

const mdAnchorOpts = {
  permalink: true,
  permalinkClass: 'anchor-link',
  permalinkSymbol: '#',
  level: [1, 2, 3, 4]
};

module.exports = function (eleventyConfig) {
  // Markdown with anchor support
  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions)
      .use(markdownItAnchor, mdAnchorOpts)
  );

  // Table of contents plugin
  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./assets/css/index.css');
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' });

  eleventyConfig.addShortcode('version', function () {
    return now;
  });

  eleventyConfig.addFilter('filter', function (collection, key, value) {
    return collection.filter(item => item.data[key] === value);
  });

  eleventyConfig.addNunjucksFilter('getNavigation', function (collection) {
    const navigation = {};

    collection.forEach(item => {
      const section = item.data.section;
      const subsection = item.data.subsection;

      if (!navigation[section]) {
        navigation[section] = {};
      }

      if (subsection) {
        if (!navigation[section][subsection]) {
          navigation[section][subsection] = [];
        }
        navigation[section][subsection].push(item.data);
      } else {
        navigation[section] = item.data;
      }
    });

    return navigation;
  });
};
