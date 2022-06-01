import TsSearchController from '../search_controller.js'

export default class extends TsSearchController {
  initialize () {
    const valueField = 'id'
    const labelField = 'email'
    const searchField = ['email', 'first_name', 'last_name']
    const loadThrottle = this.loadThrottleValue || 400

    this.config = {
      plugins: [],
      valueField,
      labelField,
      searchField,
      loadThrottle,
      render: {
        option: this.render_option,
        item: this.render_item
      },
      shouldLoad: function (query) {
        return query.length > 4
      },
      load: (q, callback) => this.search(q, callback),
      onChange: (value) => this.doNext(value)
    }
  }

  render_option (data, escape) {
    if (data.first_name && data.last_name) {
      return `
          <div>
            <div>${escape(data.first_name)} ${escape(data.last_name)}</div>
            <small class="text-muted">Email: ${escape(data.email)}</small>
          </div>`
    } else { return `<div>Email: ${escape(data.email)}</div>` }
  }

  render_item (data, escape) {
    return `<div>${data.email}</div>`
  }

  doNext (value) {
    console.log(value)
  }
}
