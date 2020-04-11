<template>
  <div class="row">
    <div class="col-3 border-right">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>
    <Proj />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Proj from "@/views/Proj";

export default {
  name: "Home",
  components: {
    Proj
  }
};
</script>
