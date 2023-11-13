import ClassBasic from './ClassBasic'

// Уровеней доступа 3
// 3 исполнитель, 2 менеджер, 1 суперюзер (админ)

export default class user extends ClassBasic {
  type = 'user'
  name = ''
  email = ''
  access = 3
  doljnost = ''
  stages = []
}