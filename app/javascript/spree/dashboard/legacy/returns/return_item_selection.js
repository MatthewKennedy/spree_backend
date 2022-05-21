document.addEventListener('spree:load', function () {
  const formFields = $("[data-hook='admin_customer_return_form_fields'], [data-hook='admin_return_authorization_form_fields']")

  function checkAddItemBox () {
    $(this).closest('tr').find('input.add-item').attr('checked', 'checked')
    updateSuggestedAmount()
  }

  function updateSuggestedAmount () {
    let totalPretaxRefund = 0
    const checkedItems = formFields.find('input.add-item:checked')
    $.each(checkedItems, function (i, checkbox) {
      const returnItemRow = $(checkbox).parents('tr')
      const returnQuantity = parseInt(returnItemRow.find('.refund-quantity-input').val(), 10)
      const purchasedQuantity = parseInt(returnItemRow.find('.purchased-quantity').text(), 10)
      const amount = (returnQuantity / purchasedQuantity) * parseFloat(returnItemRow.find('.charged-amount').data('chargedAmount'))
      returnItemRow.find('.refund-amount-input').val(amount.toFixed(2))
      totalPretaxRefund += amount
    })

    const displayTotal = isNaN(totalPretaxRefund) ? '' : totalPretaxRefund.toFixed(2)
    formFields.find('span#total_pre_tax_refund').html(displayTotal)
  }

  if (formFields.length > 0) {
    updateSuggestedAmount()

    formFields.find('input#select-all').on('change', function (ev) {
      const checkBoxes = $(ev.currentTarget).parents('table:first').find('input.add-item')
      checkBoxes.prop('checked', this.checked)
      updateSuggestedAmount()
    })

    formFields.find('input.add-item').on('change', updateSuggestedAmount)
    formFields.find('.refund-amount-input').on('keyup', updateSuggestedAmount)
    formFields.find('.refund-quantity-input').on('keyup mouseup', updateSuggestedAmount)

    formFields.find('input, select').not('.add-item').on('change', checkAddItemBox)
  }
})
