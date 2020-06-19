<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-6 col-md-4 col-xl-4 text-left">
      <form @submit.prevent="login" class="mt-5 p-3 shadow-sm">
        <label for="email">Email</label>
        <br />
        <input type="text" class="form-control" id="email" v-model="email" />
        <br />
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" />
        <br />
        <button class="btn btn-success btn-block" type="submit">Войти</button>
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
      password: ''
    }
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