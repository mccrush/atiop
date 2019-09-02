<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-block btn-success" type="button">Person Plan</button>
      </li>
      <Sphe v-for="(value, name) in this.$store.state.mapTask" :key="'sp'+name" :title="value.title" :spheId="name" :spheObj="value" />
      <li class="list-group-item text-center small new-sphe">
        <a href="#" @click="createSphe">Создать сферу</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Sphe from "@/components/Sphe.vue";
//import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "UlSphe",
  components: {
    Sphe
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
