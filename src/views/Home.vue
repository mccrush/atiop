<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <ListPlanDay msg="Welcome to Your Vue.js App" />
      <ListDay msg="Welcome to Your Vue.js App" />
      <ListNext />
      <ListWeek msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import ListPlanDay from "@/components/ListPlanDay.vue";
import ListDay from "@/components/ListDay.vue";
import ListNext from "@/components/ListNext.vue";
import ListWeek from "@/components/ListWeek.vue";

export default {
  name: "home",
  components: {
    Sidebar,
    ListPlanDay,
    ListDay,
    ListNext,
    ListWeek
  }
};
</script>
