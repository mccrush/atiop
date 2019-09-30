<template>
  <li class="list-group-item" :id="sphe.id">
    <div class="btn-group btn-block" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteItem" title="Удалить объект">D</button>
      <button class="btn btn-sm btn-light btn-block text-left sphe-item" type="button" data-toggle="collapse" :data-target="'#collapseProj'+sphe.id" aria-expanded="false" :aria-controls="'collapseProj'+sphe.id">{{sphe.title}}</button>
    </div>
    <!-- <div class="collapse" :id="'collapseProj'+sphe.id">
      <UlProj :spheId="sphe.id" :projArr="sphe.proj" />
    </div>-->
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
    // spheId: String,
    // title: String,
    // child: Object
  },
  methods: {
    deleteItem(e) {
      //e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteSphe", {
        type: "s",
        id: this.sphe.id
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