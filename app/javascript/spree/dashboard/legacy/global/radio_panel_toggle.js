/**
  radioControlsVisibilityOfElement:
  Apply to individual radio button that makes another element visible when checked
**/
document.addEventListener('spree:load', function () {
  $.fn.radioControlsVisibilityOfElement = function (dependentElementSelector) {
    if (!this.get(0)) {
      return
    }

    const showValue = this.get(0).value
    const radioGroup = $("input[name='" + this.get(0).name + "']")
    radioGroup.each(function () {
      $(this).click(function () {
        $(dependentElementSelector).visible(
          this.checked && this.value === showValue
        )
      })
      if (this.checked) {
        this.click()
      }
    })
  }
})
