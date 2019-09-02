<template>
  <li class="list-group-item" :id="spheId">
    <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+spheId" aria-expanded="false" :aria-controls="'collapseProj'+spheId">{{title}}</button>
    <div class="collapse" :id="'collapseProj'+spheId">
      <ul class="list-group list-group-flush">
        <Proj v-for="(value, name) in spheObj" :key="'pr'+name" :projId="name" :title="value.title" :spheId="spheId" />
        <li class="list-group-item text-center small new-proj">
          <a href="#">Создать проект</a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import Proj from "@/components/Proj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "Sphe",
  components: {
    Proj
  },
  props: {
    spheId: String,
    title: String,
    spheObj: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>