// * npm i -D webpack-watch-files-plugin jsdom
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {
  default: WatchExternalFilesPlugin,
} = require("webpack-watch-files-plugin")
const { JSDOM } = require("jsdom")
const env = require("../env/environment")
const path = require("path")
const fs = require("fs")

class MultipleHtmlPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const { folder } = this.options

    compiler.hooks.compilation.tap(MultipleHtmlPlugin.name, (compilation) => {
      HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        MultipleHtmlPlugin.name,
        (data, cb) => {
          const dom$ = new JSDOM(data.html)
          const templates$ = dom$.window.document.querySelectorAll("template")

          templates$.forEach((tpl$) => {
            const fileName = tpl$.getAttribute("src")
            const pathName = path.resolve(
              env.get("source"),
              folder,
              fileName,
              `${fileName}.html`
            )
            const html = fs.readFileSync(pathName, {
              encoding: "utf-8",
            })

            tpl$.insertAdjacentHTML("afterend", this.minimize(html))
            tpl$.remove()
          })

          data.html = dom$.serialize()
          cb(null, data)
        }
      )
    })
  }

  minimize(html) {
    return html.replace(/\n/g, "").replace(/\s+/g, " ")
  }
}

module.exports = class {
  constructor(options) {
    const templatesFolder = path.join(env.get("source"), "**/*.html")

    return [
      new WatchExternalFilesPlugin({
        files: [templatesFolder],
      }),
      new MultipleHtmlPlugin(options),
    ]
  }
}
