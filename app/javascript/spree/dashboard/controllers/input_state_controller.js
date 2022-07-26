import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['submitButton', 'watch']

  connect () {
    this.watchTargets.forEach((input) => {
      input.setAttribute('data-action', 'change->input-state#inputWatcher')
    })

    this.inputWatcher()
  }

  disconnect () {
    this.watchTargets.forEach((input) => {
      input.removeAttribute('data-action', 'change->input-state#inputWatcher')
    })
  }

  inputWatcher () {
    const changeCount = []

    this.watchTargets.forEach((inputEl) => {
      if (inputEl.type === 'checkbox' || inputEl.type === 'radio') {
        if (inputEl.checked !== inputEl.defaultChecked) {
          changeCount.push(1)
        }
      } else {
        if (inputEl.value !== inputEl.defaultValue) {
          changeCount.push(1)
        }
      }
    })

    if (changeCount.length > 0) {
      this.performChange()
    } else {
      this.revertChange()
    }
  }

  performChange () {
    document.getElementById('formActionButtons').style.display = 'block'
    this.submitButtonTarget.disabled = false
  }

  revertChange () {
    document.getElementById('formActionButtons').style.display = 'none'
    this.submitButtonTarget.disabled = true
  }
}
