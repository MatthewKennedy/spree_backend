document.addEventListener("spree:load", function() {
  // handle edit click
  $("a.edit-line-item").click(toggleLineItemEdit)
  // handle cancel click
  $("a.cancel-line-item").click(toggleLineItemEdit)
  // handle save click
  $("a.save-line-item").click(function () {
    var save = $(this)
    var lineItemId = save.data("line-item-id")
    var quantity = parseInt(save.parents("tr").find("input.line_item_quantity").val())
    toggleItemEdit()
    adjustLineItem(lineItemId, quantity)
  })
  // handle delete click
  $("a.delete-line-item").click(function () {
    if (confirm(SpreeDashboard.translations.are_you_sure_delete)) {
      var del = $(this)
      var lineItemId = del.data("line-item-id")
      toggleItemEdit()
      deleteLineItem(lineItemId)
    }
  })
})

function toggleLineItemEdit () {
  var link = $(this)
  var parent = link.parent()
  var tr = link.parents("tr")
  parent.find("a.edit-line-item").toggle()
  parent.find("a.cancel-line-item").toggle()
  parent.find("a.save-line-item").toggle()
  parent.find("a.delete-line-item").toggle()
  tr.find("td.line-item-qty-show").toggle()
  tr.find("td.line-item-qty-edit").toggle()
}

function lineItemURL (lineItemId) {
  return SpreeDashboard.routes.line_items_api_v2 + "/" + lineItemId
}

function adjustLineItem (lineItemId, quantity) {
  $.ajax({
    type: "PATCH",
    url: SpreeDashboard.url(lineItemURL(lineItemId)),
    data: {
      line_item: {
        quantity: quantity
      }
    },
    headers: SpreeDashboard.apiV2Authentication(),
  }).done(function () {
    window.SpreeDashboard.advanceOrder()
  })
}

function deleteLineItem (lineItemId) {
  $.ajax({
    type: "DELETE",
    url: SpreeDashboard.url(lineItemURL(lineItemId)),
    headers: SpreeDashboard.apiV2Authentication(),
  }).done(function () {
    $("#line-item-" + lineItemId).remove()
    if ($(".line-items tr.line-item").length === 0) {
      $(".line-items").remove()
    }
    window.SpreeDashboard.advanceOrder()
  })
}
