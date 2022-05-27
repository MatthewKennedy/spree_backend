import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['submitBtn', 'disable', 'hide', 'emptyField']

  connect () {
    this.submitBtnTarget.hidden = true
  }

  validate () {
    // We need to remove required attributes from all inputs
    // so that we can submit the validate action on the form.
    const formEl = this.element.closest('form')
    const requiredEls = formEl.querySelectorAll('[required]')
    requiredEls.forEach(target => (target.removeAttribute('required')))

    // Empty any field with the emptyField target.
    this.emptyFieldTargets.forEach(target => (target.value = ''))

    // Empty any field with the emptyField target.
    this.hideTargets.forEach(target => (target.style.display = 'none'))

    // Disable any input with the disabled target.
    this.disableTargets.forEach(target => target.setAttribute('disabled', 'disabled'))
    this.submitBtnTarget.click()
  }
}
