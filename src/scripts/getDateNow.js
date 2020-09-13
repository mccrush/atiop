export default
  new Date().getFullYear() +
  '-' +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : '0' + (new Date().getMonth() + 1)) +
  '-' +
  (new Date().getDate() > 9
    ? new Date().getDate()
    : '0' + (new Date().getDate())) +
  'T' +
  (new Date().getHours() > 9
    ? new Date().getHours()
    : '0' + new Date().getHours()) +
  ':' +
  (new Date().getMinutes() > 9
    ? new Date().getMinutes()
    : '0' + new Date().getMinutes())
