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

import FormValidationController from './form_validation_controller'

import TsSearchController from './ts/search_controller.js'
import TsSelectController from './ts/select_controller.js'

import userSearchController from './ts/templates/user_controller.js'

// Stimulus - Setup
window.Stimulus = Application.start()

Stimulus.register('upload-button', UploadButtonController)
Stimulus.register('spree', SpreeController)
Stimulus.register('sortable-tree', SortableTreeController)
Stimulus.register('webhooks_subscriber_events', WebhooksSubscriberEventsController)
Stimulus.register('password-toggle', PasswordToggleController)
Stimulus.register('clipboard', ClipboardController)
Stimulus.register('product-edit', ProductEditController)
Stimulus.register('datepicker', DatePickerController)
Stimulus.register('form-validation', FormValidationController)

Stimulus.register('ts--search', TsSearchController)
Stimulus.register('ts--select', TsSelectController)

Stimulus.register('ts--search-user', userSearchController)
