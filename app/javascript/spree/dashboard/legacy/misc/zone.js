document.addEventListener('spree:load', function () {
  const countryBased = $('#country_based')
  const stateBased = $('#state_based')
  countryBased.click(showCountry)
  stateBased.click(showState)
  if (countryBased.is(':checked')) {
    showCountry()
  } else if (stateBased.is(':checked')) {
    showState()
  } else {
    showState()
    stateBased.click()
  }
})

function showCountry () {
  $('#state_members :input').each(function () {
    $(this).prop('disabled', true)
  })
  $('#state_members').hide()
  $('#zone_members :input').each(function () {
    $(this).prop('disabled', true)
  })
  $('#zone_members').hide()
  $('#country_members :input').each(function () {
    $(this).prop('disabled', false)
  })
  $('#country_members').show()
}

function showState () {
  $('#country_members :input').each(function () {
    $(this).prop('disabled', true)
  })
  $('#country_members').hide()
  $('#zone_members :input').each(function () {
    $(this).prop('disabled', true)
  })
  $('#zone_members').hide()
  $('#state_members :input').each(function () {
    $(this).prop('disabled', false)
  })
  $('#state_members').show()
}
