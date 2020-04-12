<template>
  <div class="row">
    <Proj />
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import List from "@/components/Proj";
import List from "@/components/List";

export default {
  name: "Home",
  components: {
    Proj,
    List
  }
};
</script>
