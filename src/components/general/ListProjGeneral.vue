<template>
  <div class="col-12">
    <ul v-if="displayProj.length" class="list-group list-group-horizontal">
      <li
        v-for="item in sortDisplayProjects"
        :key="item.id"
        class="list-group-item justify-content-between align-items-center border-0 p-0 ml-1 mr-1 cursor-pointer"
      >
        <h6
          class="text-center bg-light rounded p-2 d-flex flex-row align-items-start my-no-select"
          :style="{
            background: item.color
              ? item.color + '!important'
              : '#f8f9fa!important',
          }"
          @dblclick.prevent="
            $emit('edit-item', { id: item.id, type: item.type })
          "
        >
          <div class="w-100 pl-4 mr-1">
            {{ item.title }}
          </div>
          <router-link
            :to="'/project/' + item.id"
            tag="button"
            title="В проект"
            class="btn btn-sm btn-light border p-0 pl-2 pr-2 m-0"
            >In</router-link
          >
        </h6>
        <div class="">
          <TaskStat :napravId="napravId" :projectId="item.id" />
        </div>
      </li>
    </ul>
    <!-- <p v-else class="li">
      <small>Список пуст</small>
    </p>-->
  </div>
</template>

<script>
import TaskStat from '@/components/general/TaskStat'

export default {
  components: {
    TaskStat,
  },
  props: ['projects', 'napravId', 'color'],
  computed: {
    displayProj() {
      return this.projects.filter((item) => item.napravId === this.napravId)
    },
    sortDisplayProjects() {
      return this.displayProj.sort((a, b) => {
        return a.position - b.position
      })
    },
  },
}
</script>

<style scoped>
h6 {
  width: 192px;
}

.btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}
</style>