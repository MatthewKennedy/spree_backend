import { Controller } from '@hotwired/stimulus'
import TomSelect from 'tom-select'

class StimulusTomSelect extends Controller {
  static values = {
    uri: String,
    val: String,
    lab: String,
    array: Array,
    response_kind: String,
    options: Array,
    plugins: Array
  }

  initialize () {
    this.config = {}
  }

  connect () {
    this.element.setAttribute('autocomplete', 'random')

    if (this.hasOptionsValue) this.config.options = this.optionsValue
    if (this.hasPluginsValue) this.config.plugins = this.pluginsValue

    this.ts = new TomSelect(this.element, {
      ...this.config
    })
  }

  disconnect () {
    this.ts.destroy()
  }
}

export default StimulusTomSelect
