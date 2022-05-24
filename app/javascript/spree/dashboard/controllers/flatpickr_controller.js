import Flatpickr from 'stimulus-flatpickr'
import { Locales } from '../i18n/flatpickr'

export default class extends Flatpickr {
  locales = Locales

  connect () {
    this.config = {
      locale: SpreeDash.translations.flatpickr_locale,
      altInput: true,
      time_24hr: true,
      altInputClass: 'flatpickr-alt-input form-control rounded-start',
      showMonths: 1
    }
    super.connect()
  }

  change (selectedDates, dateStr, instance) {
    if (this.element.classList.contains('datePickerFrom')) {
      const toCal = document.getElementById(this.element.dataset.targetPairId)
      toCal._flatpickr.set('minDate', selectedDates[0])
    }

    if (this.element.classList.contains('datePickerTo')) {
      const fromCal = document.getElementById(this.element.dataset.targetPairId)
      fromCal._flatpickr.set('maxDate', selectedDates[0])
    }
  }
}
