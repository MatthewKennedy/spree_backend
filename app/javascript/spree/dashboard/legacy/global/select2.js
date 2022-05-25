import select2 from 'select2'

select2($)

// we need to delete select2 instances before document is saved to cache
// https://stackoverflow.com/questions/36497723/select2-with-ajax-gets-initialized-several-times-with-rails-turbolinks-events
document.addEventListener('turbo:before-cache', function () {
  $('select.select2').select2('destroy')
})

document.addEventListener('spree:load', function () {
  // Initiate a standard Select2 on any select element with the class .select2
  // Remember to add a place holder in the HTML as needed.
  $('select.select2').select2({})
})

$.fn.addSelect2Options = function (data) {
  const select = this

  function appendOption (select, data) {
    let option = null
    option = new Option(data.attributes.name, data.id, true, true)

    select.append(option).trigger('change')
  }

  if (Array.isArray(data)) {
    data.map(function (row) {
      return appendOption(select, row)
    })
  } else {
    appendOption(select, data)
  }
  select.trigger({
    type: 'select2:select',
    params: {
      data
    }
  })
}

$.fn.select2.defaults.set('width', 'style')
$.fn.select2.defaults.set('dropdownAutoWidth', false)
$.fn.select2.defaults.set('theme', 'bootstrap-5')

function formatSelect2Options (data) {
  const results = data.data.map(function (obj) {
    return {
      id: obj.id,
      text: obj.attributes.name
    }
  })

  return { results }
}

export { formatSelect2Options }
