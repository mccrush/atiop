<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-6 col-md-4 col-xl-4 text-left">
      <div
        class="mt-5 mb-3 p-3 bg-white rounded shadow-sm ms-auto me-auto max-width"
      >
        <h4 class="text-center mt-2 mb-4">
          {{ mod === '#in' ? 'Авторизация' : 'Регистрация' }}
        </h4>
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
          <button
            class="btn btn-light p-0 ps-2 pe-2 border"
            type="button"
            @click="passType = !passType"
          >
            <img
              v-if="passType"
              src="/img/icons_tool/eye-slash.svg"
              width="24"
              height="24"
              alt="Показать пароль"
              class="opacity-06"
            />
            <img
              v-else
              src="/img/icons_tool/eye.svg"
              width="24"
              height="24"
              alt="Показать пароль"
              class="opacity-06"
            />
          </button>
        </div>
        <br />
        <button class="btn btn-success w-100" type="submit" @click="login">
          {{ mod === '#in' ? 'Войти' : 'Заргегистрироваться' }}
        </button>

        <!-- <p class="text-center m-0 mt-2">
          <small class="text-center">
            или
            <br />
            <a
              v-if="mod === '#reg'"
              href="#in"
              title="Авторизоваться"
              @click="mod = '#in'"
              >авторизоваться</a
            >
            <a
              v-if="mod === '#in'"
              href="#reg"
              title="Зарегистрироваться"
              @click="mod = '#reg'"
              >зарегистрироваться</a
            >
          </small>
        </p> -->
      </div>
      <!-- <div
        class="max-width border border-warning rounded shadow-sm text-center lh-1 mt-4 m-auto p-2 pt-3"
      >
        <h6>Примите участие в бета-тестировании приложения</h6>
        <p>
          <small>
            Напишите на почту mccrush2027@gmail.com,<br />и мы вышлем вам логин
            и пароль</small
          >
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
//import { auth } from '@/firebase.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      mod: '#in',
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
        } catch (err) {
          if (err.code === 'auth/invalid-email') {
            this.$store.commit('addMessage', 'lee')
          } else if (err.code === 'auth/invalid-password') {
            this.$store.commit('addMessage', 'lpi')
          } else if (err.code === 'auth/wrong-password') {
            this.$store.commit('addMessage', 'lpw')
          } else if (err.code === 'auth/user-not-found') {
            this.$store.commit('addMessage', 'lun')
          } else {
            console.log('Login login() in:', err.code)
            this.$store.commit('addMessage', 'len')
          }
        }
      } else {
        try {
          await this.$store.dispatch('regist', formData)
        } catch (err) {
          if (err.code === 'auth/invalid-email') {
            this.$store.commit('addMessage', 'lee')
          } else if (err.code === 'auth/email-already-exists') {
            this.$store.commit('addMessage', 'lue')
          } else if (err.code === 'auth/weak-password') {
            this.$store.commit('addMessage', 'lpi')
          } else {
            console.log('Login login() reg:', err.code)
            this.$store.commit('addMessage', 'len')
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

.opacity-06 {
  opacity: 0.6;
}
</style>