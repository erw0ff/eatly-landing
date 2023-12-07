const path = require("path")
const config = require("config")

const sourceRoot = path.join(__dirname, "../../src")
const outputRoot = path.join(__dirname, "../../dist")

const settings = {
  source: sourceRoot,
  output: outputRoot,
  ...config.util.toObject(),
}

module.exports = {
  get(key) {
    return settings[key]
  },
}
