<template>
  <div class="col-12">
    <div class="row p-1">
      <div v-for="(month, index) in months" :key="'pl'+index" class="col-2 p-1">
        <div class="shadow-sm p-1">
          <div class="d-flex justify-content-between p-1 bg-light rounded">
            <h6 class="m-0 p-0">{{month.name}}</h6>
            <span class="badge badge-dark">{{month.num}}</span>
          </div>

          <ListProjects :monthNumber="month.num" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListProjects from '@/components/plans/ListProjects'

export default {
  components: {
    ListProjects
  },
  //props: ['monthNumber'],
  data() {
    return {
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
        { name: 'Декабрь', num: '12' }
      ]
    }
  },
  mounted() {
    let num = new Date().getMonth()
    for (let i = 0; i < 12; i++) {
      this.months.push(this.monthNames[num])
      num++
      if (num > 11) num = 0
    }
  }
}
</script>