/* eslint-disable no-undef */

import { Controller } from '@hotwired/stimulus'

// BOOTSTRAP INSTANCE CONTROLLER
// Can be used through Stimulus Actions and Events to hide(), show(), dispose() etc. Bootstrap instances
// of Modal, offCanvas, toolTip etc.

// USAGE
// Ensure that the Stimulus controller is mounted on the element that the Bootstrap instance is bound to.

// EXAPMLE
// data-controller="bs-instance"
// data-action="resize@window->bs-instance#manipulate"
// data-bs-instance-target-value='Offcanvas'
// data-bs-instance-function-value='hide"

export default class extends Controller {
  static values = {
    target: String,
    function: String
  }

  manipulate () {
    const obj = bootstrap[this.targetValue].getInstance(this.element)
    if (obj == null) return
    obj[this.functionValue]()
  }
}
