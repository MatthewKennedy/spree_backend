document.addEventListener('spree:load', function () {
  /**
    OBSERVE FIELD:
  **/
  $('.observe_field').on('change', function () {
    const target = $(this).data('update')
    $(target).hide()
    $.ajax({
      dataType: 'html',
      url: $(this).data('base-url') + encodeURIComponent($(this).val()),
      type: 'GET'
    }).done(function (data) {
      $(target).html(data)
      $(target).show()
    })
  })

  /**
    ADD FIELDS
  **/
  let uniqueId = 1
  $('.spree_add_fields').click(function () {
    const target = $(this).data('target')
    const newTableRow = $(target + ' tr:visible:last').clone()
    const newId = new Date().getTime() + uniqueId++
    newTableRow.find('input, select').each(function () {
      const el = $(this)
      el.val('')
      el.prop('id', el.prop('id').replace(/\d+/, newId))
      el.prop('name', el.prop('name').replace(/\d+/, newId))
    })

    // When cloning a new row, set the href of all icons to be an empty "#"
    // This is so that clicking on them does not perform the actions for the
    // duplicated row
    newTableRow.find('a').each(function () {
      const el = $(this)
      el.prop('href', '#')
    })
    $(target).prepend(newTableRow)
  })

  /**
    DELETE RESOURCE
  **/
  $('body').on('click', '.delete-resource', function () {
    const el = $(this)
    if (confirm(el.data('confirm'))) {
      $.ajax({
        type: 'POST',
        url: $(this).prop('href'),
        data: {
          _method: 'delete',
          authenticity_token: SpreeDash.AUTH_TOKEN
        },
        dataType: 'script',
        complete: function () {
          el.blur()
        }
      })
        .done(function () {
          const $flashElement = $(
            '#FlashAlertsContainer span[data-alert-type="success"]'
          )
          if ($flashElement.length) {
            el.parents('tr').fadeOut('hide', function () {
              $(this).remove()
            })
            el.closest('.removable-dom-element').fadeOut('hide', function () {
              $(this).remove()
            })
            const livePreview = document.getElementById('pageLivePreview')
            if (livePreview) {
              livePreview.contentWindow.location.reload()
            }
          }
        })
        .fail(function (response) {
          SpreeDash.showFlash('error', response.responseText)
        })
    } else {
      el.blur()
    }
    return false
  })

  /**
    REMOVE FIELDS
  **/
  $('body').on('click', 'a.spree_remove_fields', function () {
    const el = $(this)
    el.prev('input[type=hidden]').val('1')
    el.closest('.fields').hide()
    if (el.prop('href').substr(-1) === '#') {
      el.parents('tr').fadeOut('hide')
    } else if (el.prop('href')) {
      $.ajax({
        type: 'POST',
        url: el.prop('href'),
        data: {
          _method: 'delete',
          authenticity_token: SpreeDash.AUTH_TOKEN
        }
      })
        .done(function () {
          el.parents('tr').fadeOut('hide', function () {
            $(this).remove()
          })
        })
        .fail(function (response) {
          SpreeDash.showFlash('error', response.responseText)
        })
    }
    return false
  })

  /**
    SELECT PROPERTIES FROM PROTOTYPE
  **/
  $('body').on('click', '.select_properties_from_prototype', function () {
    $('#busy_indicator').show()
    const clickedLink = $(this)
    $.ajax({
      dataType: 'script',
      url: clickedLink.prop('href'),
      type: 'GET'
    }).done(function () {
      clickedLink
        .parent('td')
        .parent('tr')
        .hide()
      $('#busy_indicator').hide()
    })
    return false
  })

  /**
    UTILITY
  **/
  window.SpreeDash.advanceOrder = function () {
    $.ajax({
      type: 'PATCH',
      async: false,
      headers: SpreeDash.apiV2Authentication(),
      url: SpreeDash.url(
        SpreeDash.routes.orders_api_v2 + '/' + order_number + '/advance'
      )
    }).done(function () {
      window.location.reload()
    })
  }
})
