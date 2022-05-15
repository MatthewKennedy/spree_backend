/* eslint-disable no-undef */

document.addEventListener("spree:load", function() {
  if ($("#new_state_link").length) {
    $("#country").on("change", function () {
      var newStateLinkHref = $("#new_state_link").prop("href")
      var selectedCountryId = $("#country option:selected").prop("value")
      var newLink = newStateLinkHref.replace(/countries\/(.+)\/states\/new/,
        "countries/" + selectedCountryId + "/states/new")
      $("#new_state_link").attr("href", newLink)
    })
  }
})
