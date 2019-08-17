<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar />
      <Board />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import Board from "@/components/Board.vue";

export default {
  name: "home",
  components: {
    Sidebar,
    Board
  }
};
</script>
