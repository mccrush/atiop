export const clearPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length >= 11) {
    let newNumber = phoneNumber.replaceAll(' ', '')
    newNumber = newNumber.replaceAll('-', '')
    newNumber = newNumber.replaceAll('+', '')

    if (newNumber[0] === '7') {
      newNumber = newNumber.replace('7', '8')
    }
    return newNumber
  }
  return ''
}