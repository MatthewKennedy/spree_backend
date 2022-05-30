import { Controller } from '@hotwired/stimulus'
import TomSelect from 'tom-select'

class StimulusTomSelect extends Controller {
  static values = {
    options: Array,
    plugins: Array
  }

  initialize () {
    this.config = {
      plugins: []
    }
  }

  connect () {
    this.element.setAttribute('autocomplete', 'random')

    if (this.hasOptionsValue) this.config.options = this.optionsValue
    if (this.hasPluginsValue) this.config.plugins = this.pluginsValue

    // eslint-disable-next-line eqeqeq
    if (this.element.options.length && this.element.options[0].value == '') {
      if (!this.config.plugins.includes('clear_button')) this.config.plugins.push('clear_button')
    }

    if (this.element.attributes.multiple) {
      if (!this.config.plugins.includes('remove_button')) this.config.plugins.push('remove_button')
    }

    this.ts = new TomSelect(this.element, {
      ...this.config
    })
  }

  disconnect () {
    this.ts.destroy()
  }
}

export default StimulusTomSelect