<template>
  <li class="list-group-item" :id="spheId">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" @click="deleteSphe">Del</button>
      <button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+spheId" aria-expanded="false" :aria-controls="'collapseProj'+spheId">{{title}}</button>
      <button type="button" class="btn btn-secondary">G</button>
    </div>
    <div class="collapse" :id="'collapseProj'+spheId">
      <UlProj :spheId="spheId" :spheObj="spheObj" />
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
    spheId: String,
    title: String,
    spheObj: Object
  },
  methods: {
    deleteSphe() {
      delete this.$store.state.mapTask[this.spheId];
      console.log("Sphe: Новыый главный объект:", this.$store.state.mapTask);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>