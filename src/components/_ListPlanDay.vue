<template>
  <div class="col-3 border-right">
    <h4 class="text-center pt-2">План дня</h4>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="item in 14" :key="item">Task {{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "listplanday",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-2 {
  padding-left: 0;
  padding-right: 0;
}
</style>
