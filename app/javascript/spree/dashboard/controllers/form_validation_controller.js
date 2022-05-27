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

    this.emptyFieldTargets.forEach(target => (target.value = ''))
    this.hideTargets.forEach(target => (target.style.display = 'none'))
    this.disableTargets.forEach(target => target.setAttribute('disabled', ''))
    this.submitBtnTarget.click()
  }
}
