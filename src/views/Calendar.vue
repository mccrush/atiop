<template>
  <div class="row">
    <vue-headful
      title="ATIOP Календарь планирования"
      description="ATIOP — сервис управления задачами"
    />
    <div class="col-12">
      <div class="row p-1">
        <div
          v-for="(month, index) in months"
          :key="'pl'+index"
          class="col-sm-6 col-md-3 col-lg-2 p-1"
        >
          <div class="shadow-sm pl-0 pt-0 pr-0 pb-1">
            <div class="d-flex justify-content-between p-2 bg-light elem">
              <h6 class="m-0 p-0">{{month.name}}</h6>
              <span class="badge bg-dark">{{month.num}}</span>
            </div>

            <ListProjects :projects="projects" :monthNumber="month.num" @edit-item="editItem" />
          </div>
        </div>
      </div>
      <Modal :item="item" />
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import vueHeadful from 'vue-headful'
import ListProjects from '@/components/plans/ListProjects'
import Modal from '@/components/Modal'

export default {
  components: {
    ListProjects,
    Modal,
    vueHeadful,
  },
  data() {
    return {
      item: null,
      months: [],
      monthNames: [
        { name: 'Январь', num: '01' },
        { name: 'Февраль', num: '02' },
        { name: 'Март', num: '03' },
        { name: 'Апрель', num: '04' },
        { name: 'Май', num: '05' },
        { name: 'Июнь', num: '06' },
        { name: 'Июль', num: '07' },
        { name: 'Август', num: '08' },
        { name: 'Сентябрь', num: '09' },
        { name: 'Октябрь', num: '10' },
        { name: 'Ноябрь', num: '11' },
        { name: 'Декабрь', num: '12' },
      ],
    }
  },
  mounted() {
    let num = new Date().getMonth()
    for (let i = 0; i < 12; i++) {
      this.months.push(this.monthNames[num])
      num++
      if (num > 11) num = 0
    }
  },
  computed: {
    projects() {
      return this.$store.getters.projects
    },
  },
  methods: {
    editItem({ id, type }) {
      this.item = this.projects.find((item) => item.id === id)
      let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
  },
}
</script>

<style>
.elem {
  user-select: none;
}
</style>