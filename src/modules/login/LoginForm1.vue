<template>
  <div
    class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 border bg-white rounded shadow-sm mt-5 m-auto p-3"
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
      v-model.trim="email"
      :placeholder="mod === '#reg' ? 'example@mail.ru' : ''"
      @keyup.enter="login"
    />
    <br />
    <label for="password">Пароль</label>
    <div class="input-group">
      <input
        :type="passType ? 'password' : 'text'"
        class="form-control"
        id="password"
        required
        v-model.trim="password"
        ref="pass"
        maxlength="20"
        :placeholder="mod === '#reg' ? 'От 6 до 20 символов' : ''"
        @keyup.enter="login"
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
    <p class="text-center m-0 mt-3">
      <span v-if="mod === '#in'"
        >или <a href="#" @click="mod = '#reg'">зарегистрироваться</a></span
      >
      <span v-if="mod === '#reg'"
        >или <a href="#" @click="mod = '#in'">войти</a></span
      >
    </p>
  </div>
</template>

<script>
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
          } else if (err.code === 'auth/missing-password') {
            this.$store.commit('addMessage', 'lmp')
          } else if (err.code === 'auth/user-not-found') {
            this.$store.commit('addMessage', 'lun')
          } else {
            console.log('Login login() in:', err.code)
            this.$store.commit('addMessage', 'len')
          }
        }
      } else {
        try {
          await this.$store.dispatch('registerUser', formData)
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