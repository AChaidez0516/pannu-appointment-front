import creditCardType from 'credit-card-type'

export const checkCreditCard = (cardNumber) => {
  /**
   * A code-friendly presentation of the card brand (useful to class names in CSS).
   * Please refer to Card Type "Constants" below for the list of possible values.
   * - visa
   * - mastercard
   * - american-express
   * - diners-club
   * - discover
   * - jcb
   * - unionpay
   * - maestro
   * - mir
   * - elo
   * - hiper
   * - hipercard
   * */
  let visaCards = creditCardType(cardNumber)
  return visaCards.length > 0
}