const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const sass = require('@zeit/next-sass');

module.exports = withPlugins([
  [sass],
  [optimizedImages]
]);