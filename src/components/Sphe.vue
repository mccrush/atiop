<template>
  <li class="list-group-item" :id="sphe.id">
    <div class="btn-group btn-block" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteItem(sphe)" title="Удалить объект">D</button>
      <button class="btn btn-sm btn-light btn-block text-left sphe-item" type="button" data-toggle="collapse" :data-target="'#collapseProj'+sphe.id" aria-expanded="false" :aria-controls="'collapseProj'+sphe.id">{{sphe.title}}</button>
    </div>
    <div class="collapse" :id="'collapseProj'+sphe.id">
      <UlProj :spheId="sphe.id" />
    </div>
  </li>
</template>

<script>
import UlProj from "@/components/UlProj.vue";

export default {
  name: "Sphe",
  components: {
    UlProj
  },
  props: {
    sphe: Object
  },
  methods: {
    deleteItem(item) {
      this.$store.commit("deleteElement", {
        item,
        type: "sphe",
        spheId: this.sphe.id
      });
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
.sphe-item {
  border-bottom: 1px solid rgba(52, 58, 64, 0.07);
}
</style>