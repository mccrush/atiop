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
    return {
      //uid: auth.currentUser.uid ? auth.currentUser.uid : ""
      //authStat: flase
    };
  },
  mounted() {
    this.$store.commit("getMainObject");
  },
  created() {
    auth.onAuthStateChanged(function(user) {
      console.log("Home: Выполнился метод auth.onAuthStateChanged");
      if (user) {
        console.log("Home: Пользователь вошел в аккаунт");
        //this.authStat = true;

        //document.location.replace("/app");
      } else {
        console.log("Home: Пользователь вышел из аккаунта");
        //document.location.replace("/about");
        //this.$router.push("/about");
      }
    });

    // console.log("this.uid:", this.uid);
    // if (this.uid) {
    //   console.log("Home: Выполнился метод if (this.uid)");
    //   this.$store.commit("getMainObject");
    // } else {
    //   console.log("Home: Пользователь Не авторизован");
    //   this.$router.push("/about");
    // }
  }
  // watch: {
  //   authStat: function() {
  //     this.$store.commit("getMainObject");
  //   }
  // }
};
</script>
