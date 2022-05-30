import TsSearchController from '../search_controller.js'

export default class extends TsSearchController {
  initialize () {
    const valueField = this.valValue || 'id'
    const labelField = this.txtValue || 'email'
    const searchField = this.fieldsValue || ['email', 'first_name', 'last_name']
    const loadThrottle = this.loadThrottleValue || 400

    this.config = {
      plugins: [],
      valueField,
      labelField,
      searchField,
      loadThrottle,
      load: (q, callback) => this.search(q, callback),
      render: {
        option: this.render_option,
        item: this.render_item
      }
    }
  }

  render_option (data, escape) {
    return `<div>${data.email}</div>`
  }

  render_item (data, escape) {
    return `<div>${data.email}</div>`
  }
}
