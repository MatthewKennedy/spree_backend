document.addEventListener("spree:load", function() {
  $("[data-hook=adjustments_new_coupon_code] #add_coupon_code").click(function () {
    var couponCode = $("#coupon_code").val()
    if (couponCode.length === 0) {
      return
    }
    $.ajax({
      type: "PATCH",
      url: SpreeDashboard.routes.apply_coupon_code(order_number),
      data: {
        coupon_code: couponCode,
      },
      headers: SpreeDashboard.apiV2Authentication(),
    }).done(function () {
      window.location.reload()
    }).fail(function (message) {
      if (message.responseJSON["error"]) {
        SpreeDashboard.showFlash("error", message.responseJSON["error"])
      } else {
        SpreeDashboard.showFlash("error", "There was a problem adding this coupon code.")
      }
    })
  })
})
