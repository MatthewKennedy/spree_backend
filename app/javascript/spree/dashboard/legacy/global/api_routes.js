SpreeDashboard.routes.edit_product = function (productId) {
  return SpreeDashboard.adminPathFor("products/" + productId + "/edit")
}
SpreeDashboard.routes.apply_coupon_code = function (orderId) {
  return SpreeDashboard.pathFor("api/v2/platform/orders/" + orderId + "/apply_coupon_code")
}

// API v2
SpreeDashboard.routes.countries_api_v2 = SpreeDashboard.pathFor("api/v2/platform/countries")
SpreeDashboard.routes.classifications_api_v2 = SpreeDashboard.pathFor("api/v2/platform/classifications")
SpreeDashboard.routes.line_items_api_v2 = SpreeDashboard.pathFor("api/v2/platform/line_items")
SpreeDashboard.routes.menus_api_v2 = SpreeDashboard.pathFor("api/v2/platform/menus")
SpreeDashboard.routes.menus_items_api_v2 = SpreeDashboard.pathFor("api/v2/platform/menu_items")
SpreeDashboard.routes.option_types_api_v2 = SpreeDashboard.pathFor("api/v2/platform/option_types")
SpreeDashboard.routes.option_values_api_v2 = SpreeDashboard.pathFor("api/v2/platform/option_values")
SpreeDashboard.routes.orders_api_v2 = SpreeDashboard.pathFor("api/v2/platform/orders")
SpreeDashboard.routes.pages_api_v2 = SpreeDashboard.pathFor("api/v2/platform/cms_pages")
SpreeDashboard.routes.payments_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/payments")
SpreeDashboard.routes.products_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/products")
SpreeDashboard.routes.sections_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/cms_sections")
SpreeDashboard.routes.shipments_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/shipments")
SpreeDashboard.routes.stock_items_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/stock_items")
SpreeDashboard.routes.stock_locations_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/stock_locations")
SpreeDashboard.routes.taxons_api_v2 = SpreeDashboard.pathFor("/api/v2/platform/taxons")
SpreeDashboard.routes.users_api_v2 = SpreeDashboard.pathFor("api/v2/platform/users")
SpreeDashboard.routes.variants_api_v2 = SpreeDashboard.pathFor("api/v2/platform/variants")

SpreeDashboard.apiV2Authentication = function() {
  if (typeof(SpreeDashboard.OAUTH_TOKEN) !== "undefined") {
    return {
      "Authorization": "Bearer " + SpreeDashboard.OAUTH_TOKEN
    }
  }
}
