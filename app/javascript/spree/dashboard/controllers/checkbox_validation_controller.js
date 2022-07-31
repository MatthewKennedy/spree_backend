import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['checkbox']

  connect () {
    console.log(this.element)
  }

  validate () {
  }
}
