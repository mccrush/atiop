<template>
  <nav id="foot" class="navbar fixed-bottom navbar-dark bg-dark d-flex justify-content-center pt-0 pb-0">
    <p class="text-muted font-weight-light mb-0">
      <small>
        Powered by&nbsp;
        <a class="text-muted under" href="https://mccrush.ru/" target="_blank">mccrush.ru</a>
        <span class="text-white-50">&nbsp;&nbsp;&starf;&nbsp;&nbsp;</span>
        Fork me on&nbsp;
        <a class="text-muted under" href="https://github.com/mccrush/atiop2" target="_blank">GitHub</a>
      </small>
    </p>
  </nav>
</template>

<script>
export default {
  name: "foot",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: underline;
}
</style>
