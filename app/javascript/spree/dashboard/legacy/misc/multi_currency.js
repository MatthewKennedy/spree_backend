/* eslint-disable no-undef */

document.addEventListener('spree:load', function () {
  $.expr[':'].Contains = function (a, i, m) {
    return (
      (a.textContent || a.innerText || '')
        .toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0
    )
  }

  function listFilter (list) {
    const input = $('#variant-price-search')

    $(input)
      .change(function () {
        const filter = $(this).val()
        if (filter) {
          $(list).find('.panel-title:not(:Contains(' + filter + '))').parent().hide()
          $(list).find('.panel-title:Contains(' + filter + ')').parent().show()
        } else {
          $(list)
            .find('.panel')
            .parent()
            .show()
        }
        return false
      })
      .keyup(function () {
        $(this).change()
      })
  }

  document.addEventListener('spree:load', function () {
    listFilter($('#variant-prices'))
  })
})
