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
          <div class="row">
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                placeholder="Имя"
                v-model="name"
              />
            </div>
            <div class="col-6 ps-0">
              <input
                type="text"
                class="form-control"
                placeholder="Телефон или почта"
                v-model="mail"
              />
            </div>
            <div class="col-12">
              <textarea
                v-model="text"
                rows="5"
                class="form-control w-100 mt-2"
              ></textarea>
            </div>
            <div class="col-6 pt-2">
              <button class="btn btn-light border w-100">Очистить</button>
            </div>
            <div class="col-6 pt-2 ps-0">
              <button class="btn btn-primary w-100" @click="sendMessage">
                Send message
              </button>
            </div>
          </div>

          <hr class="m-2" />
          Ответ сервера:
          {{
            answer == 'Success' ? 'Письмо успешно отправлено' : 'Где-то ошибка'
          }}
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
      name: 'Superman',
      mail: 'trest@mail.ru',
      text: 'Some amazing text',
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
      const url = 'https://yolior.ru/mail/res_add.php'
      // const dataFromForm = new FormData()
      // dataFromForm.append('name', this.name)
      // dataFromForm.append('mail', this.mail)
      // dataFromForm.append('text', this.text)

      const dataFromForm = {
        name: this.name,
        mail: this.mail,
        text: this.text,
      }
      // console.log(
      //   'JSON.stringify(dataFromForm) = ',
      //   JSON.stringify(dataFromForm)
      // )
      try {
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            //'Content-Type': 'application/json'
            //'Content-Type': 'multipart/form-data', // Нет данных
            //'Content-Type': 'form/multipart',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json;charset=utf-8',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(dataFromForm), // body data type must match "Content-Type" header
        })

        //const content = await response.text()
        this.answer = await response.text()
        console.log('Получен ответ сервера: ', this.answer)
      } catch (err) {
        console.log('Ошибка в catch: ', err)
      }
    },
  },
}
</script>