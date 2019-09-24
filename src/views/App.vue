<template>
  <div class="container-fluid">
    <div class="row">
      <UlSphe />
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
    return {};
  },
  mounted() {
    if (this.$store.state.userId) {
      this.$store.commit("getMainObject");
    } else {
      this.$router.push("/about");
      //console.log("Home: Пользователь не авторизован");
    }
  },
  created() {
    auth.onAuthStateChanged(function(user) {
      console.log("Home: Выполнился метод auth.onAuthStateChanged");
      if (user) {
        console.log("Home: Пользователь вошел в аккаунт");
      } else {
        console.log("Home: Пользователь вышел из аккаунта");
      }
    });
  }
};
</script>
