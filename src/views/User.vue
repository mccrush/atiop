<template>
  <div>
    <vue-headful
      title="ATIOP Пользователь"
      description="ATIOP — сервис управления задачами"
    />
    <div class="row p-0 border-bottom">
      <div class="col-2 col-xxl-2 p-2">
        <button class="btn btn-sm btn-light btn-block" disabled>---</button>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-xl-4">
        <ul class="list-group mt-2">
          <li
            class="list-group-item d-flex justify-content-between align-items-cente"
          >
            Email
            <strong>{{ user.email }}</strong>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-cente"
          >
            Дата регистрации
            <strong>{{
              new Date(user.metadata.creationTime).toLocaleDateString()
            }}</strong>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col-4">
                <button
                  @click="removeUser"
                  class="btn btn-sm btn-light border disabled w-100"
                >
                  Изменить Email
                </button>
              </div>
              <div class="col-4">
                <button
                  @click="removeUser"
                  class="btn btn-sm btn-light border disabled w-100"
                >
                  Обновить пароль
                </button>
              </div>
              <div class="col-4">
                <button
                  @click="removeUser"
                  class="btn btn-sm btn-outline-danger disabled w-100"
                >
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-xl-4">
        <div class="card mt-3 p-2">
          <button class="btn btn-light" @click="sendMessage">
            Send message
          </button>
          <hr class="m-2" />
          Ответ сервера: {{ answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase.js'
import vueHeadful from 'vue-headful'

export default {
  components: {
    vueHeadful,
  },
  data() {
    return {
      user: auth.currentUser,
      answer: '',
    }
  },
  methods: {
    removeUser() {
      if (
        confirm(
          'При удалении аккаунта, также будут удалены и все задачи. Действительно удалить аккаунт?'
        )
      ) {
        console.log('Аккаунт удален. Шутка)')
      }
    },
    async sendMessage() {
      const url = 'http://yolior.ru/res_add.php'
      const data = {
        name: 'Иванович',
        mail: 'ivanko@mail.ru',
        text: 'Крутой текст даже без даже',
      }
      try {
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'no-cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: data, // body data type must match "Content-Type" header
        })

        const content = await response.text()
        console.log('Получен ответ сервера: ', content)
      } catch (err) {
        console.log('Ошибка в catch: ', err)
      }
    },
  },
}
</script>