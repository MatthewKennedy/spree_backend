import StimulusFormState from 'stimulus-form-state'

export default class extends StimulusFormState {
  performChange () {
    this.submitButtonTarget.disabled = false
    this.submitButtonTarget.style.display = 'inline'
  }

  revertChange () {
    this.submitButtonTarget.disabled = true
    this.submitButtonTarget.style.display = 'none'
  }
}
