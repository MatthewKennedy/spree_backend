import Uri from 'jsuri'

const SpreeDash = {}

if (!window.SpreeDash) { window.SpreeDash = SpreeDash }

SpreeDash.mountedAt = function () { return window.SpreePaths.mounted_at }
SpreeDash.adminPath = function () { return window.SpreePaths.admin }

SpreeDash.pathFor = function (path) {
  const locationOrigin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  return this.url('' + locationOrigin + this.mountedAt() + path, this.url_params).toString()
}

SpreeDash.localizedPathFor = function (path) {
  if (typeof SPREE_LOCALE !== 'undefined' && typeof SPREE_CURRENCY !== 'undefined') {
    const fullUrl = new URL(SpreeDash.pathFor(path))
    const params = fullUrl.searchParams
    let pathName = fullUrl.pathname

    params.set('currency', SPREE_CURRENCY)

    if (pathName.match(/api\/v/)) {
      params.set('locale', SPREE_LOCALE)
    } else {
      pathName = this.mountedAt() + SPREE_LOCALE + '/' + path
    }
    return fullUrl.origin + pathName + '?' + params.toString()
  }
  return SpreeDash.pathFor(path)
}

SpreeDash.url = function (uri, query) {
  if (uri.path === undefined) { uri = new Uri(uri) }
  if (query) { Object.keys(query).forEach(key => { return uri.addQueryParam(key, query[key]) }) }
  return uri
}

SpreeDash.routes = {}
SpreeDash.url_params = { }

// API v2 Authentication
SpreeDash.apiV2Authentication = function () {
  if (typeof SpreeDash.OAUTH_TOKEN !== 'undefined') { return { Authorization: `Bearer ${SpreeDash.OAUTH_TOKEN}` } }
}
