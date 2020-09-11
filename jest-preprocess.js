const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-react"],
  plugins: ["@babel/plugin-syntax-jsx"],
};

module.exports = require("babel-jest").createTransformer(babelOptions);
