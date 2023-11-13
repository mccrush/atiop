export const getTottalSum = (array, field) => {
  const initValue = 0
  const totalSum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue[field],
    initValue
  )
  return totalSum
}