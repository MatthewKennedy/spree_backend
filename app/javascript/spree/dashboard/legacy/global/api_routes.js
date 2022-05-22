SpreeDash.routes.edit_product = function (productId) {
  return SpreeDash.adminPathFor('products/' + productId + '/edit')
}
SpreeDash.routes.apply_coupon_code = function (orderId) {
  return SpreeDash.pathFor(
    'api/v2/platform/orders/' + orderId + '/apply_coupon_code'
  )
}

// API v2
SpreeDash.routes.countries_api_v2 = SpreeDash.pathFor(
  'api/v2/platform/countries'
)
SpreeDash.routes.classifications_api_v2 = SpreeDash.pathFor(
  'api/v2/platform/classifications'
)
SpreeDash.routes.line_items_api_v2 = SpreeDash.pathFor(
  'api/v2/platform/line_items'
)
SpreeDash.routes.menus_api_v2 = SpreeDash.pathFor('api/v2/platform/menus')
SpreeDash.routes.menus_items_api_v2 = SpreeDash.pathFor(
  'api/v2/platform/menu_items'
)
SpreeDash.routes.option_types_api_v2 = SpreeDash.pathFor(
  'api/v2/platform/option_types'
)
SpreeDash.routes.option_values_api_v2 = SpreeDash.pathFor(
  'api/v2/platform/option_values'
)
SpreeDash.routes.orders_api_v2 = SpreeDash.pathFor('api/v2/platform/orders')
SpreeDash.routes.pages_api_v2 = SpreeDash.pathFor('api/v2/platform/cms_pages')
SpreeDash.routes.payments_api_v2 = SpreeDash.pathFor(
  '/api/v2/platform/payments'
)
SpreeDash.routes.products_api_v2 = SpreeDash.pathFor(
  '/api/v2/platform/products'
)
SpreeDash.routes.sections_api_v2 = SpreeDash.pathFor(
  '/api/v2/platform/cms_sections'
)
SpreeDash.routes.shipments_api_v2 = SpreeDash.pathFor(
  '/api/v2/platform/shipments'
)
SpreeDash.routes.stock_items_api_v2 = SpreeDash.pathFor(
  '/api/v2/platform/stock_items'
)
SpreeDash.routes.stock_locations_api_v2 = SpreeDash.pathFor(
  '/api/v2/platform/stock_locations'
)
SpreeDash.routes.taxons_api_v2 = SpreeDash.pathFor('/api/v2/platform/taxons')
SpreeDash.routes.users_api_v2 = SpreeDash.pathFor('api/v2/platform/users')
SpreeDash.routes.variants_api_v2 = SpreeDash.pathFor('api/v2/platform/variants')

SpreeDash.apiV2Authentication = function () {
  if (typeof SpreeDash.OAUTH_TOKEN !== 'undefined') {
    return {
      Authorization: 'Bearer ' + SpreeDash.OAUTH_TOKEN
    }
  }
}
