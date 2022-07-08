/* eslint-disable no-undef */

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  offCanvasHide () {
    const obj = bootstrap.Offcanvas.getInstance(this.element)
    obj.hide()
  }

  modalHide () {
    const obj = bootstrap.Modal.getInstance(this.element)
    obj.hide()
  }

  modalDispose () {
    const obj = bootstrap.Modal.getInstance(this.element)
    obj.dispose()
  }
}
