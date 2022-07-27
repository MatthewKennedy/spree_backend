import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['submitButton', 'watch']

  connect () {
    this.inputWatcher()
  }

  watchTargetConnected (target) {
    target.setAttribute('data-action', 'change->input-state#inputWatcher')
  }

  watchTargetDisconnect (target) {
    target.removeAttribute('data-action', 'change->input-state#inputWatcher')
  }

  inputWatcher () {
    const changeCount = []

    this.watchTargets.forEach((inputEl) => {
      if (inputEl.type === 'checkbox' || inputEl.type === 'radio') {
        if (inputEl.checked !== inputEl.defaultChecked) changeCount.push(1)
      } else if (inputEl.type === 'select-one') {
        if (this.multiSelect(inputEl) === true) changeCount.push(1)
      } else if (inputEl.type === 'select-multiple') {
        if (this.multiSelect(inputEl) === true) changeCount.push(1)
      } else {
        if (inputEl.value !== inputEl.defaultValue) changeCount.push(1)
      }
    })

    if (changeCount.length > 0) {
      this.performChange()
    } else {
      this.revertChange()
    }
  }

  performChange () {
    document.getElementById('inputStateSubmitButton').style.display = 'inline'
    this.submitButtonTarget.disabled = false
  }

  revertChange () {
    document.getElementById('inputStateSubmitButton').style.display = 'none'
    this.submitButtonTarget.disabled = true
  }

  multiSelect (inputEl) {
    let hasChanged = false
    let defaultSelected = 0
    let i
    let optionsCount
    let option

    for (i = 0, optionsCount = inputEl.options.length; i < optionsCount; i++) {
      option = inputEl.options[i]

      hasChanged = hasChanged || (option.selected !== option.defaultSelected)
      if (option.defaultSelected) defaultSelected = i
    }

    if (hasChanged && !inputEl.multiple) hasChanged = (defaultSelected !== inputEl.selectedIndex)
    if (hasChanged) return true
  }
}
