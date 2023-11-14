/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./_site/**/*.html",
      "./**/*.njk", // This is added assuming you use Tailwind in your Nunjucks templates too.
      // Add more paths as required.
    ],
    options: {
      safelist: [], // Add specific classes you always want to keep, regardless if they're used in your templates or not.
    },
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  variants: {},
  corePlugins: {
    position: true,
  },
}
