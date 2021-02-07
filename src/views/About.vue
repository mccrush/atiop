<template>
  <div class="row main justify-content-center">
    <div class="col-12 col-md-10 col-xl-8 col-xxl-6">
      <div class="row">
        <div class="col-12 pt-5">
          <h1 class="mb-0">
            <img
              class="mb-3"
              src="/img/about/logo_8_w.svg"
              alt="Структура организации задач"
              height="74"
            />
            ATIOP
          </h1>
          <p class="desc">сервис управления задачами</p>
        </div>
        <div class="col-8 mt-5 pe-4 border-end border-white">
          <p>
            Основой принципа организации задач, является структура: направление
            — проект — задачи
          </p>
          <img
            class="img-struc"
            src="/img/about/struc_1.svg"
            alt="Структура организации задач"
            width="100%"
          />
        </div>
        <div v-if="!user" class="col-4 mt-5 ps-4">
          <router-link to="login#in" class="btn btn-lg btn-light w-100"
            ><small>Войти</small></router-link
          >
          <p class="text-center mt-3">или</p>
          <router-link to="login#reg" class="btn btn-lg btn-light w-100"
            ><small>Зарегистрироваться</small></router-link
          >
          <hr class="mb-2" />
          <span class="small">Версия {{ version }}</span>
        </div>
        <div v-else class="col-4 mt-5 ps-4">
          <router-link to="/projects" class="btn btn-lg btn-light w-100"
            ><small>Открыть приложение</small></router-link
          >
          <hr class="mb-2" />
          <span class="small">Версия {{ version }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from '@/firebase.js'

export default {
  data() {
    return {
      user: auth.currentUser,
      version: '0.8.3',
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap');

.main {
  /* height: calc(100vh - 60px); */
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  font-weight: 300;
  background-color: #ffc107;
  background-image: linear-gradient(160deg, #ffc107 0%, #ffac07 100%);
}

h1 {
  text-align: center;
  font-size: 6rem;
  font-weight: 500;
  /* line-height: 1; */
}

p {
  margin-bottom: 16px;
  font-size: 1.2rem;
}

.desc {
  margin-top: -16px;
  font-size: 1.6rem;
  text-align: center;
}
</style>