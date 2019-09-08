<template>
  <li class="list-group-item" :id="id">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" @click="deleteSphe">Del</button>
      <button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+id" aria-expanded="false" :aria-controls="'collapseProj'+id">{{title}}</button>
      <button type="button" class="btn btn-secondary">G</button>
    </div>
    <div class="collapse" :id="'collapseProj'+id">
      <!-- <UlProj :spheId="spheId" :spheObj="spheObj" /> -->
    </div>
  </li>
</template>

<script>
import UlProj from "@/components/UlProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "Sphe",
  components: {
    UlProj
  },
  props: {
    id: String,
    title: String,
    child: Object
  },
  methods: {
    deleteSphe(e) {
      e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", this.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>