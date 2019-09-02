<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-block btn-success" type="button">Person Plan</button>
      </li>
      <li class="list-group-item" v-for="(value, name, index) in this.$store.state.mapTask" :key="'sp'+index">
        <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+index" aria-expanded="false" :aria-controls="'collapseProj'+index">{{value.title}}</button>
        <div class="collapse" :id="'collapseProj'+index">
          <ListProj v-if="name !== 'title'" :spheId="name" :projObj="value" />
        </div>
      </li>
      <li class="list-group-item text-center small new-sphe">
        <a href="#" @click="createSphe">Создать сферу</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "UlSphe",
  components: {
    ListProj
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
