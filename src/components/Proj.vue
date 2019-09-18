<template>
  <li class="list-group-item pr-4" :id="projId">
    <!-- <button type="button" class="btn btn-sm btn-block btn-success" @click="setStateProjId">{{title}}</button> -->
    <small class="text-muted">&nbsp;&nbsp;|_&nbsp;&nbsp;</small>
    <div class="btn-group btn-block" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteProj" title="Удалить проект">D</button>
      <button class="btn btn-sm btn-light btn-block text-left" type="button" @click="setStateProjId">{{title}}</button>
    </div>
  </li>
</template>

<script>
//import store from "@/store";

export default {
  name: "Proj",
  props: {
    spheId: String,
    projId: String,
    title: String
  },
  data() {
    return {
      //projObjClear: {}
    };
  },
  created() {
    //this.projObjClear = this.projObj;
    //delete this.projObjClear.title;
  },
  computed: {},
  methods: {
    deleteProj(e) {
      e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "p",
        spheid: this.spheId,
        projid: this.projId
      });
    },
    setStateProjId() {
      this.$store.state.sphe = this.spheId;
      this.$store.state.proj = this.projId;
      console.log(
        "List: projId =",
        this.$store.state.proj,
        "spheId=",
        this.$store.state.sphe
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  border: none;
}
</style>
