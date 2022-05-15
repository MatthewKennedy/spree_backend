Spree.routes.edit_product = function (productId) {
  return Spree.adminPathFor('products/' + productId + '/edit')
}
Spree.routes.apply_coupon_code = function (orderId) {
  return Spree.pathFor('api/v2/platform/orders/' + orderId + '/apply_coupon_code')
}

// API v2
Spree.routes.countries_api_v2 = Spree.pathFor('api/v2/platform/countries')
Spree.routes.classifications_api_v2 = Spree.pathFor('api/v2/platform/classifications')
Spree.routes.line_items_api_v2 = Spree.pathFor('api/v2/platform/line_items')
Spree.routes.menus_api_v2 = Spree.pathFor('api/v2/platform/menus')
Spree.routes.menus_items_api_v2 = Spree.pathFor('api/v2/platform/menu_items')
Spree.routes.option_types_api_v2 = Spree.pathFor('api/v2/platform/option_types')
Spree.routes.option_values_api_v2 = Spree.pathFor('api/v2/platform/option_values')
Spree.routes.orders_api_v2 = Spree.pathFor('api/v2/platform/orders')
Spree.routes.pages_api_v2 = Spree.pathFor('api/v2/platform/cms_pages')
Spree.routes.payments_api_v2 = Spree.pathFor('/api/v2/platform/payments')
Spree.routes.products_api_v2 = Spree.pathFor('/api/v2/platform/products')
Spree.routes.sections_api_v2 = Spree.pathFor('/api/v2/platform/cms_sections')
Spree.routes.shipments_api_v2 = Spree.pathFor('/api/v2/platform/shipments')
Spree.routes.stock_items_api_v2 = Spree.pathFor('/api/v2/platform/stock_items')
Spree.routes.stock_locations_api_v2 = Spree.pathFor('/api/v2/platform/stock_locations')
Spree.routes.taxons_api_v2 = Spree.pathFor('/api/v2/platform/taxons')
Spree.routes.users_api_v2 = Spree.pathFor('api/v2/platform/users')
Spree.routes.variants_api_v2 = Spree.pathFor('api/v2/platform/variants')

Spree.apiV2Authentication = function() {
  if (typeof(OAUTH_TOKEN) !== 'undefined') {
    return {
      'Authorization': 'Bearer ' + OAUTH_TOKEN
    }
  }
}
