//
// Import JavaScript packages that are required globally.
import { Application } from "@hotwired/stimulus"

//
// Stimulus - Setup
const application = Application.start()
application.debug = false
window.Stimulus = application

// Stimulus - Spree Controllers
import UploadButtonController from "./upload_button_controller"
application.register("upload-button", UploadButtonController)

import SpreeController from "./spree_controller"
application.register("spree", SpreeController)

import SortableTreeController from "./sortable_tree_controller"
application.register("sortable-tree", SortableTreeController)

import WebhooksSubscriberEventsController from "./webhooks_subscriber_events_controller"
application.register("webhooks_subscriber_events", WebhooksSubscriberEventsController)

import PasswordToggleController from "./password_toggle_controller"
application.register("password-toggle", PasswordToggleController)

import ClipboardController from "./clipboard_controller"
application.register("clipboard", ClipboardController)

import ProductEditController from "./product_edit_controller"
application.register("product-edit", ProductEditController)

export { application }
