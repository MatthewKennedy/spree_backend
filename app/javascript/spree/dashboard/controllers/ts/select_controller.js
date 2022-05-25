import { Controller } from '@hotwired/stimulus'
import TomSelect from 'tom-select'

// Connects to data-controller="ts--select"
export default class extends Controller {
  static values = {
    url: String,
    options: Array,
    plugins: Array
  }

  connect () {
    this.element.setAttribute('autocomplete', 'random')

    const config = {
      plugins: [],
      render: {
        option: this.render_option,
        item: this.render_option
      }
    }

    if (this.hasOptionsValue) {
      config.options = this.optionsValue
    }

    if (this.hasPluginsValue) {
      config.plugins = this.pluginsValue
    }

    if (this.element.options[0].value === '') {
      if (!config.plugins.includes('clear_button')) config.plugins.push('clear_button')
    }

    // eslint-disable-next-line no-new
    new TomSelect(this.element, config)
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
