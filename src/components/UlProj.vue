<template>
  <ul class="list-group list-group-flush">
    <Proj v-for="(value, name, i) in projObj" :key="'ulpr'+name+i" :title="value.title" :projId="name" :spheId="spheId" />
    <li class="list-group-item text-center small new-proj">
      <a href="#">Создать проект</a>
    </li>
  </ul>
</template>

<script>
import Proj from "@/components/Proj.vue";
//import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "UlProj",
  components: {
    Proj
  },
  props: {
    spheId: String,
    title: String,
    projObj: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: none;
}
</style>
