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
    this.$store.commit("getMainObject");
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
