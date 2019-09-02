<template>
  <li class="list-group-item" :id="spheId">
    <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+spheId" aria-expanded="false" :aria-controls="'collapseProj'+spheId">{{title}}</button>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>