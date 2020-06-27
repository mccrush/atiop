<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-6 col-md-4 col-xl-4 text-left">
      <form @submit.prevent="login" class="mt-5 mb-3 p-3 shadow-sm ml-auto mr-auto max-width">
        <h4 class="text-center mt-2 mb-4">{{mod === '#in' ? 'Авторизация' : 'Регистрация'}}</h4>
        <label for="email">Почта</label>
        <br />
        <input
          type="text"
          class="form-control"
          id="email"
          required
          v-model="email"
          :placeholder="mod === '#reg' ? 'example@mail.ru' : ''"
        />
        <br />
        <label for="password">Пароль</label>
        <div class="input-group">
          <input
            :type="passType ? 'password' : 'text'"
            class="form-control"
            id="password"
            required
            v-model="password"
            ref="pass"
            maxlength="20"
            :placeholder="mod === '#reg' ? 'От 6 до 20 символов' : ''"
          />

          <div class="input-group-append">
            <button
              class="btn btn-light p-0 pl-2 pr-2 border"
              type="button"
              @click="passType = !passType"
            >
              <img src="img/login/eye_24px.png" width="24" height="24" alt="Показать пароль" />
            </button>
          </div>
        </div>
        <br />
        <button
          class="btn btn-success btn-block"
          type="submit"
        >{{mod === '#in' ? 'Войти' : 'Заргегистрироваться'}}</button>

        <p class="text-center m-0 mt-2">
          <small class="text-center">
            или
            <br />
            <a
              v-if="mod === '#reg'"
              href="#in"
              title="Авторизоваться"
              @click="mod = '#in'"
            >авторизоваться</a>
            <a
              v-if="mod === '#in'"
              href="#reg"
              title="Зарегистрироваться"
              @click="mod = '#reg'"
            >зарегистрироваться</a>
          </small>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '@/main.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      mod: this.$route.hash || '#in',
      passType: true
    }
  },
  methods: {
    async login() {
      const formData = {
        email: this.email,
        password: this.password
      }

      if (this.mod === '#in') {
        try {
          await this.$store.dispatch('logIn', formData)

          this.$router.push('/')
        } catch (err) {
          if (err.code === 'auth/invalid-email') {
            this.$store.commit('addMessage', {
              text: 'Некорректный адрес почты!',
              type: 'bg-danger'
            })
          } else if (err.code === 'auth/invalid-password') {
            this.$store.commit('addMessage', {
              text: 'Некорректный пароль!',
              type: 'bg-danger'
            })
          } else if (err.code === 'auth/wrong-password') {
            this.$store.commit('addMessage', {
              text: 'Неверный пароль!',
              type: 'bg-danger'
            })
          } else if (err.code === 'auth/user-not-found') {
            this.$store.commit('addMessage', {
              text: 'Пользователь с такой почтой не найден',
              type: 'bg-danger'
            })
          } else {
            this.$store.commit('addMessage', {
              text: 'Ошибка: ' + err.code,
              type: 'bg-danger'
            })
          }
        }
      } else {
        try {
          await this.$store.dispatch('regist', formData)
          if (auth.currentUser) {
            this.$store.dispatch('getItems', 'napravs')
            this.$store.dispatch('getItems', 'projects')
            this.$store.dispatch('getItems', 'tasks')
          }
          this.$router.push('/')
        } catch (err) {
          if (err.code === 'auth/invalid-email') {
            this.$store.commit('addMessage', {
              text: 'Некорректный адрес почты!',
              type: 'bg-danger'
            })
          } else if (err.code === 'auth/email-already-exists') {
            this.$store.commit('addMessage', {
              text: 'Пользователь с такой почтой уже существует',
              type: 'bg-danger'
            })
          } else if (err.code === 'auth/weak-password') {
            this.$store.commit('addMessage', {
              text: 'Некорректный пароль',
              type: 'bg-danger'
            })
          } else {
            this.$store.commit('addMessage', {
              text: 'Ошибка: ' + err.code,
              type: 'bg-danger'
            })
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.max-width {
  max-width: 300px;
}
</style>