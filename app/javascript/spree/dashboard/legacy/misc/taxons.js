import Sortable from 'sortablejs'

document.addEventListener('spree:load', function () {
  window.productTemplate = Handlebars.compile($('#product_template').text())
  const taxonProducts = $('#taxon_products')
  const taxonId = $('#taxon_id')

  const el = document.getElementById('taxon_products')
  if (el) {
    Sortable.create(el, {
      handle: '.sort-handle',
      ghostClass: 'moving-this',
      animation: 550,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      swapThreshold: 0.9,
      forceFallback: true,
      onEnd: function (evt) {
        handleClassificationReposition(evt)
      }
    })
  }

  function handleClassificationReposition (evt) {
    const classificationId = evt.item.getAttribute('data-classification-id')
    const data = {
      classification: {
        position: parseInt(evt.newIndex, 10) + 1
      }
    }
    const requestData = {
      uri: SpreeDash.routes.classifications_api_v2 + '/' + classificationId,
      method: 'PATCH',
      dataBody: data
    }
    SpreeDash.fetchRequestUtil(requestData)
  }

  if (taxonId.length > 0) {
    taxonId.select2({
      placeholder: SpreeDash.translations.find_a_taxon,
      minimumInputLength: 3,
      multiple: false,
      ajax: {
        url: SpreeDash.routes.taxons_api_v2,
        datatype: 'json',
        headers: SpreeDash.apiV2Authentication(),
        data: function (params, page) {
          return {
            per_page: 50,
            page: page,
            filter: {
              name_cont: params.term
            }
          }
        },
        processResults: function (data, page) {
          const more = page < data.meta.total_pages

          const results = data.data.map(function (obj) {
            return {
              id: obj.id,
              text: obj.attributes.pretty_name
            }
          })

          return {
            results: results,
            pagination: {
              more: more
            }
          }
        }
      }
    }).on('select2:select', function (e) {
      $.ajax({
        url: SpreeDash.routes.classifications_api_v2,
        headers: SpreeDash.apiV2Authentication(),
        data: {
          filter: {
            taxon_id_eq: e.params.data.id
          },
          include: 'product.images',
          per_page: 150,
          sort: 'position'
        }
      }).done(function (json) {
        taxonProducts.empty()

        if (json.meta.total_count === 0) {
          return taxonProducts.html('<p class="text-center w-100 p-4">' + SpreeDash.translations.no_results + '</p>')
        } else {
          const results = []

          json.data.forEach(function (classification) {
            const productId = classification.relationships.product.data.id.toString()

            const product = json.included.find(function (included) {
              if (included.type === 'product' && included.id === productId) {
                return included
              }
            })

            if (product && classification) {
              let imageUrl = null

              if (product.relationships.images.data.length > 0) {
                const imageId = product.relationships.images.data[0].id

                const image = json.included.find(function (included) {
                  if (included.type === 'image' && included.id === imageId) {
                    return included
                  }
                })

                if (image && image.attributes && image.attributes.styles) {
                  imageUrl = image.attributes.styles[2].url
                }
              }

              results.push(taxonProducts.append(productTemplate({
                product: product,
                classification: classification,
                image: imageUrl
              })))
            }
          })

          return results
        }
      })
    })
  }

  taxonProducts.on('click', '.js-delete-product', function (e) {
    const product = $(this).parents('.product')
    const classificationId = product.data('classification-id')
    $.ajax({
      url: SpreeDash.routes.classifications_api_v2 + '/' + classificationId.toString(),
      headers: SpreeDash.apiV2Authentication(),
      type: 'DELETE'
    }).done(function () {
      product.fadeOut(400, function (e) {
        product.remove()
      })
    })
  })

  $('.variant_autocomplete').variantAutocomplete()
})
