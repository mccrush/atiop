export const searchClientMethod = (array, searchValue) => {
  return array.filter(
    item =>
      item.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchValue.toLowerCase())
  )
}