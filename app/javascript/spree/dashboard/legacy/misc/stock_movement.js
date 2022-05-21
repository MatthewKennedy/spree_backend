/* eslint-disable no-undef */

import JSONAPIDeserializer from 'jsonapi-serializer'

document.addEventListener('spree:load', function () {
  const el = $('#stock_movement_stock_item_id')
  let jsonApiVariants = {}
  el.select2({
    placeholder: 'Find a stock item', // translate
    minimumInputLength: 3,
    quietMillis: 200,
    ajax: {
      url: SpreeDash.routes.stock_items_api_v2,
      data: function (params, page) {
        return {
          filter: {
            variant_product_name_cont: params.term,
            stock_location_id_eq: el.data('stock-location-id')
          },
          include: 'variant',
          image_transformation: {
            size: '100x100'
          },
          fields: {
            variant: 'name,sku,options_text,images'
          },
          per_page: 50,
          page: page
        }
      },
      headers: SpreeDash.apiV2Authentication(),
      success: function (data) {
        new JSONAPIDeserializer({ keyForAttribute: 'snake_case' }).deserialize(data, function (_err, variants) {
          jsonApiVariants = variants
        })
      },
      processResults: function (json) {
        const res = jsonApiVariants.map(function (stockItem) {
          return {
            id: stockItem.id,
            text: stockItem.variant.name,
            variant: stockItem.variant
          }
        })

        return {
          results: res
        }
      },
      results: function (data, page) {
        const more = (page * 50) < data.count
        return {
          results: data.stock_items,
          more: more
        }
      }
    },
    templateResult: function (stockItem) {
      if (stockItem.loading) {
        return stockItem.text
      }

      const variant = stockItem.variant
      if (variant.images[0] !== undefined && variant.images[0].transformed_url !== undefined) {
        variant.image = variant.images[0].transformed_url
      }
      return $(variantTemplate({
        variant: variant
      }))
    },
    templateSelection: function (stockItem) {
      const variant = stockItem.variant
      if (variant === undefined) {
        return stockItem.text
      } else if (!!variant.options_text && variant.options_text !== '') {
        return variant.name + '(' + variant.options_text + ')'
      } else {
        return variant.name
      }
    }
  })
})
