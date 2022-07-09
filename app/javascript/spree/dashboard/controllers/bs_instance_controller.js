/* eslint-disable no-undef */

import { Controller } from '@hotwired/stimulus'

// BOOTSTRAP INSTANCE CONTROLLER
// Can be used through Stimulus Action and Events to hide() or dispose() of Bootstrap instances
// such as Modals, Off Canvas Menus, Tool Tips...

// This is useful to dispose of Off Canvas Menus when the screen is resized, but is not limited to
// any specific Stimulus Action or Event.

// USAGE
// Ensure that the controller is mounted on the element that the instance is bound to.

// EXAPMLE
// data-controller="bs-instance" data-action="resize@window->bs-instance#offCanvasHide"

export default class extends Controller {
  // Carousel
  carouselDispose () {
    const obj = bootstrap.Carousel.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }

  // Collapse
  collapseHide () {
    const obj = bootstrap.Collapse.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  collapseDispose () {
    const obj = bootstrap.Collapse.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }

  // Dropdown
  dropdownHide () {
    const obj = bootstrap.Dropdown.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  dropdownDispose () {
    const obj = bootstrap.Dropdown.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }

  // Modal
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

  // Off Canvas
  offCanvasHide () {
    const obj = bootstrap.Offcanvas.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  // Popover
  popOverHide () {
    const obj = bootstrap.Popover.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  popOverDispose () {
    const obj = bootstrap.Popover.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }

  // Scroll Spy
  scrollSpyDispose () {
    const obj = bootstrap.ScrollSpy.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }

  // Toast
  toastHide () {
    const obj = bootstrap.Toast.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  toastDispose () {
    const obj = bootstrap.Toast.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }

  // Tooltip
  tooltipHide () {
    const obj = bootstrap.Tooltip.getInstance(this.element)
    if (obj == null) return
    obj.hide()
  }

  tooltipDispose () {
    const obj = bootstrap.Tooltip.getInstance(this.element)
    if (obj == null) return
    obj.dispose()
  }
}
