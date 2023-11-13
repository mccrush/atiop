// Автоматический расчет срока отгрузки
// +28 дней к дате заказа
// Возвращает новую дату в формате 2023-08-18T12:18

import { getFormateInputDate } from './getFormateInputDate'

export const getDueDate = (dateCreate) => {
  let date = new Date(dateCreate)
  date.setDate(date.getDate() + 28);
  const dueDate = getFormateInputDate(date)
  return dueDate
}