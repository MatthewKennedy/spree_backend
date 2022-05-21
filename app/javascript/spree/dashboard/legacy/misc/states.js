/* eslint-disable no-undef */

document.addEventListener('spree:load', function () {
  if ($('#new_state_link').length) {
    $('#country').on('change', function () {
      const newStateLinkHref = $('#new_state_link').prop('href')
      const selectedCountryId = $('#country option:selected').prop('value')
      const newLink = newStateLinkHref.replace(/countries\/(.+)\/states\/new/,
        'countries/' + selectedCountryId + '/states/new')
      $('#new_state_link').attr('href', newLink)
    })
  }
})
