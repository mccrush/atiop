<template>
  <div class="container-fluid">
    <div class="row">
      <!-- <Sidebar />
      <Board />-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from "@/main.js";
import Sidebar from "@/components/Sidebar.vue";
import Board from "@/components/Board.vue";

export default {
  name: "home",
  components: {
    Sidebar,
    Board
  },
  mounted() {
    var user = auth.currentUser;

    if (user) {
      console.log("App: Пользователь авторизован");
      this.$store.state.userId = user.uid;
      console.log("App: userId", this.$store.state.userId);
      this.$store.commit("getTask", user.uid);
      // User is signed in.
    } else {
      // No user is signed in.
      console.log("App: Пользователь Не авторизован");
      this.$router.push("/login");
    }
  }
};
</script>
