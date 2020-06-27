<template>
  <div class="row shadow-sm">
    <vue-headful title="ATIOP Справка" description="ATIOP — сервис управления задачами" />
    <div class="col-12 col-md-10 col-lg-8 col-xl-6 m-auto h-100">
      <h3 class="mt-4 text-center">ATIOP</h3>
      <p class="text-center text-muted small">
        Версия
        <a
          href="https://github.com/mccrush/atiop/releases/"
          target="_blank"
          title="Страница на Github"
        >0.3.0-beta</a>
        <br />По всем вопросам: mccrush2027@gmail.com
      </p>

      <div class="row">
        <div class="col-12 col-sm-3 col-md-3 mt-3 mb-4">
          <div class="list-group list-group-flush">
            <a href="#description" class="list-group-item list-group-item-action p-1 pl-2">Описание</a>

            <a href="#pages" class="list-group-item list-group-item-action p-1 pl-2">Страницы</a>

            <a href="#props" class="list-group-item list-group-item-action p-1 pl-2">Свойства</a>
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
import Props from '@/views/about/Props'

export default {
  components: {
    Description,
    Pages,
    Props,
    vueHeadful
  },
  mounted() {},
  computed: {
    component() {
      return this.$route.hash.split('#')[1] || 'description'
    }
  },
  methods: {
    // scrollTo(ref) {
    //   this.$refs[ref].scrollIntoView({ behavior: 'smooth' })
    // },
    // scrollTop() {
    //   window.scrollTo({ top: 0, behavior: 'smooth' })
    // }
  }
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

.totop {
  position: fixed;
  bottom: 8px;
  right: 32px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
