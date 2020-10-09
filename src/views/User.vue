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
                  class="btn btn-sm btn-block btn-light border disabled"
                >
                  Изменить Email
                </button>
              </div>
              <div class="col-4">
                <button
                  @click="removeUser"
                  class="btn btn-sm btn-block btn-light border disabled"
                >
                  Обновить пароль
                </button>
              </div>
              <div class="col-4">
                <button
                  @click="removeUser"
                  class="btn btn-sm btn-block btn-outline-danger disabled"
                >
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </li>
        </ul>
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
  },
}
</script>