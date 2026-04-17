export const calculateDiscountedPrice = (price, discountRate) => {
  if (!price) return null
  price = Number(price)

  const rate = discountRate
  if (!rate) return null

  // reverse-calc original price
  return Math.round(price - (price * (rate / 100)))
}   