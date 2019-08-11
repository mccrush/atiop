<template>
  <div class="col-2 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-block btn-success" type="button">Person Plan</button>
      </li>
      <li class="list-group-item" v-for="item in 3" :key="item">
        <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseExample'+item" aria-expanded="false" :aria-controls="'collapseExample'+item">Button with data-target</button>
        <div class="collapse" :id="'collapseExample'+item">
          <div class>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</div>
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
