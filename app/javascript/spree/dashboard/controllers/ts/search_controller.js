import StimulusTomSelect from './stimulus_tom_select'
import { get } from '../../utilities/request_utility'

// Connects to data-controller="ts--search"
export default class extends StimulusTomSelect {
  static values = {
    uri: String,
    val: String,
    lab: String,
    array: Array,
    ransack: Array,
    include: String,
    debug: String,
    response_kind: String,
    options: Array,
    plugins: Array
  }

  initialize () {
    const value = this.valValue || 'id'
    const label = this.labValue || 'name'
    const search = this.arrayValue || 'name'

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
    const response = await get(this.buildRequestURL(q))

    if (response.ok) {
      const body = await response.json
      if (this.debugValue) console.log(body)

      const data = body.data.map(row => {
        const data = row.attributes
        data.id = row.id

        return data
      })
      if (this.debugValue) console.log(data)

      callback(data)
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
}
