import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect () {
    this.modal = new bootstrap.Modal(this.element, {
      keyboard: false
    })
    this.modal.show()
  }

  disconnect () {
    this.modal.hide()
  }

  submitEnd (event) {
    if (event.detail.success) { this.modal.hide() }
  }
}
