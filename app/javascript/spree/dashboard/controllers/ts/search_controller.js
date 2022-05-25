import StimulusTomSelect from './stimulus_tom_select'
import { get } from '../../utilities/request_utility'

// Connects to data-controller="ts--search"
export default class extends StimulusTomSelect {
  initialize () {
    const value = this.valValue || 'id'
    const label = this.labValue || 'name'
    const search = this.arrayValue || 'name'

    this.config = {
      valueField: value,
      labelField: label,
      searchField: search,
      loadThrottle: 400,
      load: (q, callback) => this.search(q, callback)
    }
  }

  async search (q, callback) {
    const response = await get(this.uriValue, {
      query: { q }
    })

    if (response.ok) {
      const body = await response.json

      const data = body.data.map(row => {
        const data = row.attributes
        data.id = row.id

        return data
      })

      callback(data)
    } else {
      console.log(response)
      callback()
    }
  }
}
