const yaml = require("js-yaml");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Copy Static Files to /site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml"
  });

  // Copy Static Folder to /site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy Static Folder to /site
  eleventyConfig.addPassthroughCopy("./src/static/fonts");

  // Copy favicon to route of /site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.load(contents)
  );

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  return {
    dir: {
      input: "src",
      output: "site"
    }
  }
}