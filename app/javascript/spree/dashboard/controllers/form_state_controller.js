import StimulusFormState from 'stimulus-form-state'

export default class extends StimulusFormState {
  enableChangeControles () {
    this.saveButtonTarget.disabled = false
    this.saveButtonTarget.style.display = 'inline'
  }

  disableChangeControles () {
    this.saveButtonTarget.disabled = true
    this.saveButtonTarget.style.display = 'none'
  }
}
