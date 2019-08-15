<template>
  <div class="col-2 border-right">
    <ul class="list-group list-group-flush" v-if="this.$store.state.spheArr[0] && this.$store.state.spheId[0] && this.$store.state.projArr[0]">
      <li class="list-group-item">
        <button class="btn btn-block btn-success" type="button">Person Plan</button>
      </li>
      <li class="list-group-item" v-for="(item, index) in this.$store.state.spheArr" :key="'sp'+index">
        <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseExample'+index" aria-expanded="false" :aria-controls="'collapseExample'+index">{{item.title}}</button>
        <div class="collapse" :id="'collapseExample'+index">
          <ListProj :sphe="spheId[index]" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ListProj from "@/components/ListProj.vue";

export default {
  name: "sidebar",
  components: {
    ListProj
  },
  props: {
    spheId: Array
  },
  created() {
    console.log("Пришел масс", this.spheId);
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
