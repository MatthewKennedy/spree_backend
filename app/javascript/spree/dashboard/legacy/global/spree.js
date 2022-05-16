import Uri from "jsuri"

function SpreeDashboard () {}

SpreeDashboard.ready = function (callback) {
  return document.addEventListener("spree:load", function() {
    return callback(jQuery)
  })
}

SpreeDashboard.mountedAt = function () {
  return window.SpreePaths.mounted_at
}

SpreeDashboard.adminPath = function () {
  return window.SpreePaths.admin
}

SpreeDashboard.pathFor = function (path) {
  var locationOrigin = (window.location.protocol + "//" + window.location.hostname) + (window.location.port ? ":" + window.location.port : "")

  return this.url("" + locationOrigin + (this.mountedAt()) + path, this.url_params).toString()
}

SpreeDashboard.localizedPathFor = function(path) {
  if (typeof (SPREE_LOCALE) !== "undefined" && typeof (SPREE_CURRENCY) !== "undefined") {
    var fullUrl = new URL(SpreeDashboard.pathFor(path))
    var params = fullUrl.searchParams
    var pathName = fullUrl.pathname

    params.set("currency", SPREE_CURRENCY)

    if (pathName.match(/api\/v/)) {
      params.set("locale", SPREE_LOCALE)
    } else {
      pathName = (this.mountedAt()) + SPREE_LOCALE + "/" + path
    }
    return fullUrl.origin + pathName + "?" + params.toString()
  }
  return SpreeDashboard.pathFor(path)
}

SpreeDashboard.adminPathFor = function (path) {
  return this.pathFor("" + (this.adminPath()) + path)
}

SpreeDashboard.url = function (uri, query) {
  if (uri.path === void 0) {
    uri = new Uri(uri)
  }
  if (query) {
    $.each(query, function (key, value) {
      return uri.addQueryParam(key, value)
    })
  }
  return uri
}

SpreeDashboard.ajax = function (urlOrSettings, settings) {
  var url
  if (typeof urlOrSettings === "string") {
    return $.ajax(SpreeDashboard.url(urlOrSettings).toString(), settings)
  } else {
    url = urlOrSettings["url"]
    delete urlOrSettings["url"]
    return $.ajax(SpreeDashboard.url(url).toString(), urlOrSettings)
  }
}

SpreeDashboard.routes = {}
SpreeDashboard.url_params = {}

if (!window.SpreeDashboard) {
  window.SpreeDashboard = SpreeDashboard
}
