import StimulusTomSelect from './stimulus_tom_select'

// Connects to data-controller="ts--select"
export default class extends StimulusTomSelect {
  initialize () {
    this.config = {
      plugins: []
    }
  }
}
