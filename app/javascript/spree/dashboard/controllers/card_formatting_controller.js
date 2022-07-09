import Cleave from 'cleave.js'
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['cardNumber', 'cardExp', 'cardCode', 'cardType']
  static values = {
    datePattern: { type: Array, default: ['m', 'Y'] }
  }

  connect () {
    let cardCodeCleave

    const cardNumber = this.cardNumberTarget
    const cardType = this.cardTypeTarget
    const cardCode = this.cardCodeTarget
    const cardExp = this.cardExpTarget

    const updateCardCodeCleave = function (length) {
      if (cardCodeCleave) cardCodeCleave.destroy()

      cardCodeCleave = new Cleave(cardCode, {
        numericOnly: true,
        blocks: [length]
      })
    }

    updateCardCodeCleave(3)

    this.cardNumberCleave = new Cleave(cardNumber, {
      creditCard: true,
      onCreditCardTypeChanged: function (type) {
        cardType.value = type

        if (type === 'amex') {
          updateCardCodeCleave(4)
        } else {
          updateCardCodeCleave(3)
        }
      }
    })

    this.cardExpCleave = new Cleave(cardExp, {
      date: true,
      datePattern: this.datePatternValue
    })
  }

  disconnect () {
    this.cardExpCleave.destroy()
    this.cardNumberCleave.destroy()
  }
}
