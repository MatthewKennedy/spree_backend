import tinymce from 'tinymce'

// Theme
import 'tinymce/icons/default'
import 'tinymce/themes/silver'

// Plugins
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/image'
import 'tinymce/plugins/code'

document.addEventListener('spree:load', function () {
  tinymce.remove() // Required for spree:load

  tinymce.init({
    selector: '.spree-rte',
    plugins: ['image', 'code', 'link', 'table'],
    menubar: false,
    toolbar:
      'undo redo | styleselect | bold italic link forecolor backcolor | alignleft aligncenter alignright alignjustify | table | bullist numlist outdent indent | code '
  })

  tinymce.init({
    selector: '.spree-rte-simple',
    menubar: false,
    plugins: ['image', 'link', 'table'],
    toolbar:
      'undo redo | styleselect | bold italic link forecolor backcolor | alignleft aligncenter alignright alignjustify | table | bullist numlist outdent indent'
  })
})
