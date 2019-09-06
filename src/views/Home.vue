<template>
  <div class="container-fluid">
    <div class="row">
      <UlSphe v-if="Object.keys(this.$store.state.mapTask).length > 0" />
      <UlList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from "@/main.js";
import UlSphe from "@/components/UlSphe.vue";
import UlList from "@/components/UlList.vue";

export default {
  name: "home",
  components: {
    UlSphe,
    UlList
  },
  data() {
    return {
      //uid: ''
    };
  },
  mounted() {
    // let len = Object.keys(this.$store.state.mapTask).length;
    // console.log("Home: coun key in obj=", len);
    const user = auth.currentUser;

    if (user) {
      //this.$store.state.mapTask;
      console.log("Home: Пользователь авторизован");
      this.$store.state.userId = user.uid;
      console.log("Home: userId", this.$store.state.userId);
      this.$store.commit("getTask", user.uid);
      // User is signed in.
    } else {
      // No user is signed in.
      console.log("Home: Пользователь Не авторизован");
      this.$router.push("/login");
    }
  }
};
</script>
