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
        return query.length > 2
      },
      load: (q, callback) => this.search(q, callback),
      onChange: (value) => this.doNext(value)
    }
  }

  render_option (data, escape) {
    if (data.first_name || data.last_name) {
      return `<div>
                <div>
                  <span class="text-muted">Name:</span> ${data.first_name ? escape(data.first_name) : ''} ${data.last_name ? escape(data.last_name) : ''}
                </div>
                <div>
                  <small><span class="text-muted">Email:</span> ${escape(data.email)} </small>
                </div>
                <div>
                  ${data.bill_address ? `<div><small><span class="text-muted">Bill To:</span> ${escape(data.bill_address.address1)}, ${escape(data.bill_address.country.iso)}</small> </div>` : ''}
                  ${data.ship_address ? `<div><small><span class="text-muted">Ship To:</span> ${escape(data.ship_address.address1)}, ${escape(data.ship_address.country.iso)}</small> </div>` : ''}
                </div>
              </div>`
    } else {
      return `<div>
                <div>
                  <span class="text-muted">Email:</span> ${escape(data.email)}
                </div>
                <div>
                  ${data.bill_address ? `<div><small><span class="text-muted">Bill To:</span> ${escape(data.bill_address.address1)}, ${escape(data.bill_address.country.iso_name)}</small> </div>` : ''}
                  ${data.ship_address ? `<div><small><span class="text-muted">Ship To:</span> ${escape(data.ship_address.address1)}, ${escape(data.ship_address.country.iso_name)}</small> </div>` : ''}
                </div>
              </div>`
    }
  }

  render_item (data, escape) {
    return `<div>
              ${data.email}
            </div>`
  }

  doNext (value) {
    console.log(value)
  }
}
