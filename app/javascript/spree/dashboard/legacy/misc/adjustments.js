document.addEventListener('spree:load', function () {
  $('[data-hook=adjustments_new_coupon_code] #add_coupon_code').click(
    function () {
      const couponCode = $('#coupon_code').val()
      if (couponCode.length === 0) {
        return
      }
      $.ajax({
        type: 'PATCH',
        url: SpreeDash.routes.apply_coupon_code(order_number),
        data: {
          coupon_code: couponCode
        },
        headers: SpreeDash.apiV2Authentication()
      })
        .done(function () {
          window.location.reload()
        })
        .fail(function (message) {
          if (message.responseJSON.error) {
            SpreeDash.showFlash('error', message.responseJSON.error)
          } else {
            SpreeDash.showFlash(
              'error',
              'There was a problem adding this coupon code.'
            )
          }
        })
    }
  )
})
