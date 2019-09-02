<template>
  <li class="list-group-item" :id="spheId">
    <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+index" aria-expanded="false" :aria-controls="'collapseProj'+index">{{title}}</button>
    <div class="collapse" :id="'collapseProj'+index">
      <ListProj v-if="name !== 'title'" :spheId="name" :projObj="value" />
    </div>
  </li>
</template>

<script>
//import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "Sphe",
  components: {},
  props: {
    spheId: String,
    title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>