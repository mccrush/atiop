export const getPhoneFormat = phone => {
  let newPhone = ''
  newPhone = phone.substr(0, 1)
  newPhone += ' ' + phone.substr(1, 3)
  newPhone += ' ' + phone.substr(4, 3)
  newPhone += ' ' + phone.substr(7)
  return newPhone
}