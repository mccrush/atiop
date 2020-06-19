<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-8 col-md-6 col-xl-4 text-left">
      <label for="email">Email</label>
      <br />
      <input type="text" class="form-control" id="email" v-model="email" />
      <br />
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" />
      <br />
      <button class="btn btn-success btn-block" @click="login">Войти</button>
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
      this.$store.dispatch('logIn')
      this.$router.push('/admin')
    }
  }
}
</script>