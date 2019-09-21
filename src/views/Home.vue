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
      uid: auth.currentUser.uid || ""
    };
  },
  mounted() {},
  created() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("Home: Пользователь вошел в аккаунт");
      } else {
        console.log("Home: Пользователь вышел из аккаунта");
        document.location.replace("/about");
      }
    });

    console.log("this.uid:", this.uid);
    if (this.uid) {
      this.$store.commit("getMainObject");
    } else {
      console.log("Home: Пользователь Не авторизован");
      this.$router.push("/about");
    }
    /*
   console.log("Home: this.$store.state.userId:", this.$store.state.userId);
    if (this.$store.state.userId) {
      const user = auth.currentUser;
      if (user) {
        //console.log("Home: Пользователь авторизован");
        this.$store.state.userId = user.uid;
        //console.log("Home: userId", this.$store.state.userId);
        this.$store.commit("getMainObject");
        // Вот здесь как раз и можно сверять имеющееся время и время на сервере. Если отличается то загружать, иначе незачем лишний раз тащить все данные
      } else {
        console.log("Home: Пользователь Не авторизован");
      }
    } else {
      //console.log("Home: Пользователь Не авторизован");
      this.$router.push("/login");
    }
    */
  }
};
</script>
