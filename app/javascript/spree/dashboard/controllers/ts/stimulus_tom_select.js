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
    if (this.element.options > 0 && this.element.options[0].value === '') {
      if (!this.config.plugins.includes('clear_button')) this.config.plugins.push('clear_button')
    }

    this.ts = new TomSelect(this.element, {
      ...this.config
    })
  }

  disconnect () {
    this.ts.destroy()
  }

  render_option (data, escape) {
    if (data.sub) {
      return `
      <div>
        <div class="text">${escape(data.text)}</div>
        <div class="sub">${escape(data.sub)}</div>
      </div>`
    } else { return `<div>${escape(data.text)}</div>` }
  }
}

export default StimulusTomSelect
