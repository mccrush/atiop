<template>
  <div class="row">
    <vue-headful
      title="ATIOP Календарь планирования"
      description="ATIOP — сервис управления задачами"
    />

    <div class="col-12">
      <div class="row p-0 border-bottom">
        <div class="col-3 p-2">
          <button class="btn btn-sm btn-light rounded-sm float-left w-25">День</button>
          <input
            type="datetime-local"
            id="day"
            class="form-control form-control-sm rounded-sm w-75"
            v-model="day"
          />
          <!-- <select class="form-control form-control-sm rounded-sm w-50">
            <option value selected>Выбрать</option>
            <option value="status">Вторая</option>
            <option value="napravId">Третяя</option>
            <option value="napravId">Четвертая</option>
          </select>-->
        </div>
        <div class="col-2 p-2">
          <button class="btn btn-sm btn-light rounded-sm float-left w-50">Неделя</button>
          <select class="form-control form-control-sm rounded-sm w-50">
            <option value selected>Первая</option>
            <option value="status">Вторая</option>
            <option value="napravId">Третяя</option>
            <option value="napravId">Четвертая</option>
          </select>
        </div>
        <div class="col-3 p-2">
          <button class="btn btn-sm btn-light float-left w-50">Месяц</button>
          <select class="form-control form-control-sm w-50">
            <option value selected>Сентябрь</option>
            <option value="status">Октябрь</option>
            <option value="napravId">Ноябрь</option>
          </select>
        </div>
        <div class="col-2 p-2">
          <!-- Активный способ представления с жетой рамкой -->
          <button class="btn btn-sm btn-light border-warning float-left w-50">Год</button>
          <select class="form-control form-control-sm w-50">
            <option value selected>2017</option>
            <option value="status">2018</option>
            <option value="napravId">2019</option>
            <option value selected>2020</option>
            <option value="status">2021</option>
            <option value="napravId">2022</option>
          </select>
        </div>
      </div>
      <div class="row p-1">
        <div v-for="month in months" :key="'pl'+month.id" class="col-sm-6 col-md-3 col-lg-2 p-1">
          <div class="shadow-sm pl-0 pt-0 pr-0 pb-1">
            <div class="d-flex justify-content-between p-2 bg-light elem">
              <h6 class="m-0 p-0 text-secondary">{{month.title}}</h6>
              <span class="badge bg-secondary">{{month.id}}</span>
            </div>

            <ListProjects :projects="projects" :monthNumber="month.id" @edit-item="editItem" />
          </div>
        </div>
      </div>
      <Modal :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import vueHeadful from 'vue-headful'
import getMonths from '@/scripts/getMonths'
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
      monthNames: getMonths,
    }
  },
  mounted() {
    //Формирует начало года с текущего месяца
    let num = new Date().getMonth()
    for (let i = 0; i < 12; i++) {
      this.months.push(this.monthNames[num])
      num++
      if (num > 11) num = 0
    }
  },
  computed: {
    napravs() {
      return this.$store.getters.napravs
    },
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