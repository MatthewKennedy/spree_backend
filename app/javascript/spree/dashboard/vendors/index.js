import './jquery'
import './bootstrap'
import './tinymce'

// Remove all use of Handlebars and replacing it with Hotwire Turbo
import Handlebars from './handlebars'
if (!window.Handlebars) {
  window.Handlebars = Handlebars
}
