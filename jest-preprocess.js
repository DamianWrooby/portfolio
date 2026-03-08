const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-react"],
  plugins: ["@babel/plugin-syntax-jsx"],
};

const babelJest = require("babel-jest");
module.exports = (babelJest.default || babelJest).createTransformer(babelOptions);
