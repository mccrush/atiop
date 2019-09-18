<template>
  <li class="list-group-item" :id="spheId">
    <div class="btn-group btn-block" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteSphe" title="Удалить объект">D</button>
      <button class="btn btn-sm btn-light btn-block text-left sphe-item" type="button" data-toggle="collapse" :data-target="'#collapseProj'+spheId" aria-expanded="false" :aria-controls="'collapseProj'+spheId">{{title}}</button>
      <!-- <button type="button" class="btn btn-secondary">G</button> -->
      <!-- <button type="button" class="btn btn-sm btn-light" @click="deleteSphe" title="Удалить объект">+</button> -->
    </div>
    <div class="collapse" :id="'collapseProj'+spheId">
      <UlProj :spheId="spheId" :spheObj="child" />
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
    child: Object
  },
  methods: {
    deleteSphe(e) {
      e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "s",
        spheid: this.spheId,
        projid: ""
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sphe-item {
  border-bottom: 1px solid rgba(52, 58, 64, 0.07);
}
</style>