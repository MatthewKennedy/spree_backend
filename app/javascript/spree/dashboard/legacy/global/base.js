import Uri from 'jsuri'

const SpreeDash = {}
if (!window.SpreeDash) {
  window.SpreeDash = SpreeDash
}

SpreeDash.mountedAt = function () {
  return window.SpreePaths.mounted_at
}

SpreeDash.adminPath = function () {
  return window.SpreePaths.admin
}

SpreeDash.pathFor = function (path) {
  const locationOrigin =
    window.location.protocol +
    '//' +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '')

  return this.url(
    '' + locationOrigin + this.mountedAt() + path,
    this.url_params
  ).toString()
}

SpreeDash.localizedPathFor = function (path) {
  if (
    typeof SPREE_LOCALE !== 'undefined' &&
    typeof SPREE_CURRENCY !== 'undefined'
  ) {
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

SpreeDash.adminPathFor = function (path) {
  return this.pathFor('' + this.adminPath() + path)
}

SpreeDash.url = function (uri, query) {
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

SpreeDash.ajax = function (urlOrSettings, settings) {
  let url
  if (typeof urlOrSettings === 'string') {
    return $.ajax(SpreeDash.url(urlOrSettings).toString(), settings)
  } else {
    url = urlOrSettings.url
    delete urlOrSettings.url
    return $.ajax(SpreeDash.url(url).toString(), urlOrSettings)
  }
}

SpreeDash.routes = {}
SpreeDash.url_params = {}
