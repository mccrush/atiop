<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-6 col-md-4 col-xl-4 text-left">
      <form @submit.prevent="login" class="mt-5 p-3 shadow-sm">
        <h4 class="text-center mb-3">{{mod === '#in' ? 'Авторизация' : 'Регистрация'}}</h4>
        <label for="email">Email</label>
        <br />
        <input type="text" class="form-control" id="email" v-model="email" />
        <br />
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" />
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
      mod: '#in'
    }
  },
  mounted() {
    console.log('this.$route.hash:', this.$route.hash)

    this.mod = this.$route.hash ? this.$route.hash : '#in'
  },
  methods: {
    login() {
      this.$store.dispatch('logIn', {
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
    }
  }
}
</script>