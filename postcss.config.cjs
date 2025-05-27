module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // ✅ required for v4
    require('autoprefixer'),
  ],
};
