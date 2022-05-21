import Sortable from 'sortablejs'

document.addEventListener('spree:load', function () {
  const parentEl = document.getElementsByClassName('sortable')[0]
  if (parentEl) {
    var element = parentEl.querySelector('tbody')
  }

  if (element) {
    Sortable.create(element, {
      handle: '.move-handle',
      animation: 550,
      ghostClass: 'bg-light',
      dragClass: 'sortable-drag-v',
      easing: 'cubic-bezier(1, 0, 0, 1)',
      swapThreshold: 0.9,
      forceFallback: true,
      onEnd: function (evt) {
        const itemEl = evt.item
        const positions = { authenticity_token: SpreeDash.AUTH_TOKEN }
        $.each($('tr', element), function (position, obj) {
          const reg = /spree_(\w+_?)+_(.*)/
          const parts = reg.exec($(obj).prop('id'))
          if (parts) {
            positions['positions[' + parts[2] + ']'] = position + 1
          }
        })
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: $(itemEl).closest('table.sortable').data('sortable-link'),
          data: positions
        })
      }
    })
  }
})
