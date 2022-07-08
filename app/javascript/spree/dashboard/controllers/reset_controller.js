/* eslint-disable no-undef */

import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  offCanvasHide () {
    const obj = bootstrap.Offcanvas.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  modalHide () {
    const obj = bootstrap.Modal.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  modalDispose () {
    const obj = bootstrap.Modal.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }
}
