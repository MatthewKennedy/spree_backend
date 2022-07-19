/* eslint-disable no-undef */

import { Application } from '@hotwired/stimulus'

import Sortable from 'stimulus-sortable'

// Stimulus - Spree Controllers
import SortableTreeController from './sortable_tree_controller'
import ClipboardController from './clipboard_controller'
import DatePickerController from './datepicker_controller'
import MenuController from './menu_controller'
import NumberIncrementController from './number_increment_controller'
import FormValidationController from './form_validation_controller'

import RteController from './rte_controller'

// Cleave
import CardFormattingController from './card_formatting_controller'
import InputFormattingController from './input_formatting_controller'

// Bootstrap
import ModalController from './modal_controller'
import ToastController from './toast_controller'
import BsInstanceController from './bs_instance_controller'

// Tom Select
import TsSearchController from './ts/search_controller'
import TsSelectController from './ts/select_controller'
import userSearchController from './ts/templates/user_controller'
import variantSearchController from './ts/templates/variant_controller'

// Stimulus - Setup
window.Stimulus = Application.start()

Stimulus.register('sortable', Sortable)
Stimulus.register('sortable-tree', SortableTreeController)
Stimulus.register('menu', MenuController)
Stimulus.register('clipboard', ClipboardController)
Stimulus.register('datepicker', DatePickerController)
Stimulus.register('number-increment', NumberIncrementController)
Stimulus.register('form-validation', FormValidationController)
Stimulus.register('bs-instance', BsInstanceController)
Stimulus.register('rte', RteController)
Stimulus.register('card-formatting', CardFormattingController)
Stimulus.register('input-formatting', InputFormattingController)
Stimulus.register('modal', ModalController)
Stimulus.register('toast', ToastController)
Stimulus.register('ts--search', TsSearchController)
Stimulus.register('ts--select', TsSelectController)
Stimulus.register('ts--search-user', userSearchController)
Stimulus.register('ts--search-variant', variantSearchController)
