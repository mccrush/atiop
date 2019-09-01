<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <button class="btn btn-block btn-success" type="button">Person Plan</button>
    </li>
    <li class="list-group-item" v-for="(value, name, index) in this.$store.state.mapTask" :key="'sp'+index">
      <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" :data-target="'#collapseProj'+index" aria-expanded="false" :aria-controls="'collapseProj'+index">{{value.title}}</button>
      <div class="collapse" :id="'collapseProj'+index">
        <ListProj :spheId="name" :projObj="value" />
      </div>
    </li>
    <li class="list-group-item text-center small new-sphe">
      <a href="#" @click="createSphe">Создать сферу</a>
    </li>
  </ul>
</template>

<script>
import ListProj from "@/components/ListProj.vue";

export default {
  name: "listsphe",
  components: {
    ListProj
  },
  props: {},
  data() {
    return {
      // projArr: this.$store.state.projArr,
      // spheArr: this.$store.state.spheArr
    };
  },
  created() {
    //console.log("Пришел масс", this.spheId);
  },
  methods: {
    createSphe() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: none;
}
</style>
