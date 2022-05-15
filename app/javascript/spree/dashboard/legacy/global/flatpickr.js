import Flatpickr from "flatpickr"

document.addEventListener("spree:load", function() {
  Flatpickr.setDefaults({
    altInput: true,
    time_24hr: true,
    altInputClass: 'flatpickr-alt-input',
    locale: Spree.translations.flatpickr_locale
  })

  var dateFrom = Flatpickr('.datePickerFrom', {
    onChange: function(selectedDates) {
      dateTo.set('minDate', selectedDates[0])
    }
  })

  var dateTo = Flatpickr('.datePickerTo', {
    onChange: function(selectedDates) {
      dateFrom.set('maxDate', selectedDates[0])
    }
  })

  Flatpickr('.datepicker', {})
})

document.addEventListener("turbo:before-cache", function() {
  document.querySelectorAll('.datePickerFrom, .datePickerTo, .datepicker').forEach(function(element) {
    element._flatpickr.destroy()
  })
})
