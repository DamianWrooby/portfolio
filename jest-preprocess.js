const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-react"],
};

const babelJest = require("babel-jest");
module.exports = (babelJest.default || babelJest).createTransformer(babelOptions);
