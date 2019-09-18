<template>
  <li class="list-group-item pr-4" :id="projId">
    <small class="text-muted">&nbsp;&nbsp;|_&nbsp;&nbsp;</small>
    <div class="btn-group btn-block" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteProj" title="Удалить проект">D</button>
      <button class="btn btn-sm btn-light btn-block text-left proj-item" type="button" @click="setStateProjId">{{title}}</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "Proj",
  props: {
    spheId: String,
    projId: String,
    title: String
  },
  data() {
    return {};
  },
  created() {},
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
        "Proj: projId =",
        this.$store.state.proj,
        "spheId=",
        this.$store.state.sphe
      );
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
.list-group-item {
  border: none;
}

.proj-item {
  border-bottom: 1px solid rgba(52, 58, 64, 0.07);
}
</style>
