import uglify from 'uglify-js'
import { DEFAULTS } from './const'

import Plugin = PluginHelper.Plugin
import PluginOptions = PluginHelper.Options
import Options = PluginUglifyjs.Options

export default class PluginUglifyjs implements Plugin {
  constructor (public options: Options) {
    this.options = Object.assign({}, DEFAULTS, this.options)
  }

  async apply (pluginOptions: PluginOptions): Promise<string> {
    let { filter, config } = this.options
    let { filename, content, output } = pluginOptions

    if (!filter.test(filename)) {
      return Promise.resolve(content)
    }
    else {
      output('压缩', filename)

      let result = uglify.minify(content, config)

      return Promise.resolve(result.code)
    }
  }
}