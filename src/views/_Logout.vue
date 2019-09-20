<template>
  <div class="container-fluid"></div>
</template>


<script>
// @ is an alias to /src
import { auth } from "@/main.js";

export default {
  name: "logout",

  mounted() {
    var user = auth.currentUser;

    if (user) {
      console.log("Logout: Пользователь авторизован");
      auth
        .signOut()
        .then(function() {
          // Sign-out successful.
          document.location.replace("/login");
          //this.$router.push("/login");
        })
        .catch(function(error) {
          // An error happened.
          console.log("Logout: errors,", error);
        });
    } else {
      // No user is signed in.
      console.log("Logout: Пользователь Не авторизован");
      this.$router.push("/login");
    }
  }
};
</script>
