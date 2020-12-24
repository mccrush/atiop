<template>
  <div class="row shadow-sm">
    <vue-headful
      title="ATIOP Справка"
      description="ATIOP — сервис управления задачами"
    />
    <div class="col-12 col-md-10 col-lg-8 col-xl-6 m-auto h-100">
      <h3 class="mt-4 text-center">ATIOP</h3>
      <p class="text-center text-muted small">
        Версия
        <a
          href="https://github.com/mccrush/atiop/releases/"
          target="_blank"
          title="Страница на Github"
          >0.5.3-alpha</a
        >, email: mccrush2027@gmail.com <br />
        <!-- <a
          href="https://www.patreon.com/mccrush"
          target="_blank"
          title="Поддержать проект на Patreon"
          >Patreon</a
        > -->
        <a
          href="https://www.patreon.com/mccrush"
          title="Поддержать проект на Patreon"
          target="_blank"
          class="btn btn-sm btn-outline-danger p-0 ps-2 pe-2 me-2"
          >Поддержать на Patreon</a
        >
        <a
          href="https://github.com/mccrush/atiop"
          title="Fork me on Github"
          target="_blank"
          class="btn btn-sm btn-outline-dark p-0 ps-2 pe-2"
          >Fork me on Github</a
        >
      </p>

      <div class="row">
        <div class="col-12 col-sm-3 col-md-3 mt-3 mb-4">
          <div class="list-group">
            <a
              href="#description"
              class="list-group-item list-group-item-action small p-1 ps-2"
              :class="{
                'bg-light': myHash === '#description' || myHash === '',
              }"
              >Описание</a
            >

            <a
              href="#pages"
              class="list-group-item list-group-item-action small p-1 ps-2"
              :class="{ 'bg-light': myHash === '#pages' }"
              >Страницы</a
            >

            <a
              href="#filter"
              class="list-group-item list-group-item-action small p-1 ps-2"
              :class="{ 'bg-light': myHash === '#filter' }"
              >Фильтр Задач</a
            >
            <a
              href="#status"
              class="list-group-item list-group-item-action small p-1 ps-2"
              :class="{ 'bg-light': myHash === '#status' }"
              >Статус Задач</a
            >
            <a
              href="#redact"
              class="list-group-item list-group-item-action small p-1 ps-2"
              :class="{ 'bg-light': myHash === '#redact' }"
              >Редактирование</a
            >

            <!-- <a
              href="#props"
              class="list-group-item list-group-item-action p-1 pl-2"
              >Свойства</a
            > -->
          </div>
        </div>
        <div class="col-12 col-sm-9 col-md-9 mt-3">
          <component :is="component" />
        </div>
      </div>

      <!-- <button
        class="totop btn btn-light text-center text-muted shadow-sm mb-4 p-0 pl-3 pr-3 pb-1"
        @click.prevent="scrollTop"
      >
        <span>&wedge;</span>
      </button>-->
    </div>
  </div>
</template>

<script>
import vueHeadful from 'vue-headful'
import Description from '@/views/about/Description'
import Pages from '@/views/about/Pages'
import Filter from '@/views/about/Filter'
import Status from '@/views/about/Status'
import Redact from '@/views/about/Redact'

export default {
  components: {
    vueHeadful,
    Description,
    Pages,
    Filter,
    Status,
    Redact,
  },
  date() {
    return {
      actPage: false,
    }
  },
  mounted() {
    //console.log('hash:', this.$route.hash)
  },
  computed: {
    component() {
      return this.$route.hash.split('#')[1] || 'description'
    },
    myHash() {
      return this.$route.hash
    },
  },
  methods: {},
}
</script>

<style scoped>
/* li {
  padding: 0;
} */

li > a {
  text-decoration: none;
  color: #212529;
}
</style>
