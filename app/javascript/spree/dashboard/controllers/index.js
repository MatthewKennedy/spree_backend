/* eslint-disable no-undef */

import { Application } from '@hotwired/stimulus'

// Stimulus - Spree Controllers
import UploadButtonController from './upload_button_controller'
import SpreeController from './spree_controller'
import SortableTreeController from './sortable_tree_controller'
import WebhooksSubscriberEventsController from './webhooks_subscriber_events_controller'
import PasswordToggleController from './password_toggle_controller'
import ClipboardController from './clipboard_controller'
import ProductEditController from './product_edit_controller'
import DatePickerController from './datepicker_controller'

// Stimulus - Setup
window.Stimulus = Application.start()

Stimulus.register('upload-button', UploadButtonController)
Stimulus.register('spree', SpreeController)
Stimulus.register('sortable-tree', SortableTreeController)
Stimulus.register(
  'webhooks_subscriber_events',
  WebhooksSubscriberEventsController
)
Stimulus.register('password-toggle', PasswordToggleController)
Stimulus.register('clipboard', ClipboardController)
Stimulus.register('product-edit', ProductEditController)
Stimulus.register('datepicker', DatePickerController)
