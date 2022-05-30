import StimulusTomSelect from './stimulus_tom_select'
import { get } from '../../utilities/request_utility'

// Connects to data-controller="ts--search"
export default class extends StimulusTomSelect {
  static values = {
    uri: String,
    val: String,
    txt: String,
    fields: Array,
    ransack: Array,
    include: String,
    debug: Boolean,

    options: Array,
    plugins: Array
  }

  initialize () {
    const value = this.valValue || 'id'
    const label = this.txtValue || 'name'
    const search = this.fieldsValue || ['name']

    this.config = {
      plugins: [],
      valueField: value,
      labelField: label,
      searchField: search,
      loadThrottle: 400,
      load: (q, callback) => this.search(q, callback)
    }
  }

  async search (q, callback) {
    const debugMode = this.debugValue || false

    const response = await get(this.buildRequestURL(q))

    if (response.ok) {
      const body = await response.json

      if (debugMode) console.log(body)

      const presentedData = this.formatResponseData(body)

      if (debugMode) console.log(presentedData)

      callback(presentedData)
    } else {
      console.log(response)
      callback()
    }
  }

  buildRequestURL (q) {
    const urlWithParams = new URL(SpreeDash.pathFor(this.uriValue))

    if (this.hasRansackValue) {
      this.ransackValue.forEach(target => {
        urlWithParams.searchParams.append(`[filter]${target}`, q)
      })
    }

    if (this.hasIncludeValue) {
      urlWithParams.searchParams.append('include', this.includeValue)
    }

    return urlWithParams
  }

  formatResponseData (body) {
    const data = body.data.map(row => {
      const da = row.attributes
      da.id = row.id

      return da
    })

    return data
  }
}
