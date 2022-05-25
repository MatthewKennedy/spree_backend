import { Controller } from 'stimulus'
import TomSelect from 'tom-select'

export default class extends Controller {
  static values = { url: String }

  connect () {
    this.initTomSelect()
  }

  disconnect () {
    if (this.select) {
      this.select.destroy()
    }
  }

  initTomSelect () {
    if (this.element) {
      const url = `${this.urlValue}.json`

      this.select = new TomSelect(this.element, {
        plugins: ['remove_button'],
        valueField: 'id',
        labelField: 'name',
        maxItems: 1,
        selectOnTab: true,
        placeholder: 'Select user',
        closeAfterSelect: true,
        hidePlaceholder: false,
        preload: true,
        create: false,
        openOnFocus: true,
        highlight: true,
        sortField: {
          field: 'name',
          direction: 'asc'
        },
        searchField: 'name',
        load: (search, callback) => {
          fetch(url)
            .then(response => response.json())
            .then(json => {
              callback(json)
            }).catch(() => {
              callback()
            })
        },
        render: {
          option: function (data, escape) {
            return '<div>' +
              '<span class="block">' + escape(data.name) + '</span>' +
              '<span class="text-gray-400">' + escape(data.email) + '</span>' +
              '</div>'
          }
        }
      })
    }
  }
}
