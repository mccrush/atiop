<template>
  <div class="col-2 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-block btn-success" type="button">Person Plan</button>
      </li>
      <li class="list-group-item" v-for="(item, index) in this.$store.state.spheArr" :key="'sp'+index">
        <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseExample'+item" aria-expanded="false" :aria-controls="'collapseExample'+item">{{item.title}}</button>
        <div class="collapse" :id="'collapseExample'+item">
          <!-- <div class v-for="(item2, index2) in this.$store.state.projArr" :key="'pr'+index2">{{item2.title}}</div> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidebar",
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
