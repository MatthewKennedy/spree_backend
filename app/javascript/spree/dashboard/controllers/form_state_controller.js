import StimulusFormState from 'stimulus-form-state'

export default class extends StimulusFormState {
  performChange () {
    document.getElementById('inputStateSubmitButton').style.display = 'inline'
    super.performChange()
  }

  revertChange () {
    document.getElementById('inputStateSubmitButton').style.display = 'none'
    super.revertChange()
  }
}
