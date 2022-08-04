/* eslint-disable no-undef */

import { Application } from '@hotwired/stimulus'

// Stimulus - Spree Controllers
import BsInstanceController from './bs_instance_controller'
import CardFormattingController from './card_formatting_controller'
import CheckboxValidationController from './checkbox_validation_controller'
import ClipboardController from './clipboard_controller'
import DatePickerController from './datepicker_controller'
import FormStateController from './form_state_controller'
import FormValidationController from './form_validation_controller'
import InputDisableController from './input_disable_controller'
import InputFormattingController from './input_formatting_controller'
import LinkableTd from './linkable_td_controller'
import MenuController from './menu_controller'
import ModalController from './modal_controller'
import NumberIncrementController from './number_increment_controller'
import PasswordToggleController from './password_toggle_controller'
import RteController from './rte_controller'
import Sortable from './sortable_controller'
import SortableTreeController from './sortable_tree_controller'
import ToastController from './toast_controller'
import TsSearchController from './ts/search_controller'
import TsSelectController from './ts/select_controller'
import userSearchController from './ts/templates/user_controller'
import variantSearchController from './ts/templates/variant_controller'

// Stimulus - Setup
window.Stimulus = Application.start()

Stimulus.register('bs-instance', BsInstanceController)
Stimulus.register('card-formatting', CardFormattingController)
Stimulus.register('checkbox-validation', CheckboxValidationController)
Stimulus.register('clipboard', ClipboardController)
Stimulus.register('datepicker', DatePickerController)
Stimulus.register('form-state', FormStateController)
Stimulus.register('form-validation', FormValidationController)
Stimulus.register('input-disable', InputDisableController)
Stimulus.register('input-formatting', InputFormattingController)
Stimulus.register('linkable-td', LinkableTd)
Stimulus.register('menu', MenuController)
Stimulus.register('modal', ModalController)
Stimulus.register('number-increment', NumberIncrementController)
Stimulus.register('password-toggle', PasswordToggleController)
Stimulus.register('rte', RteController)
Stimulus.register('sortable', Sortable)
Stimulus.register('sortable-tree', SortableTreeController)
Stimulus.register('toast', ToastController)
Stimulus.register('ts--search', TsSearchController)
Stimulus.register('ts--select', TsSelectController)
Stimulus.register('ts--search-user', userSearchController)
Stimulus.register('ts--search-variant', variantSearchController)
