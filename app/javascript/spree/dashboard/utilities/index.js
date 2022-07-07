import './base'
import './api_routes'

import * as RequestUtility from './request_utility'

if (!window.SpreeDash.RequestUtility) {
  window.SpreeDash.RequestUtility = RequestUtility
}
