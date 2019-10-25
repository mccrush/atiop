<template>
  <li class="list-group-item pr-4" :id="proj.id">
    <small class="text-muted">&nbsp;&nbsp;|_&nbsp;&nbsp;</small>
    <div class="btn-group btn-block" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteItem" title="Удалить проект">D</button>
      <button class="btn btn-sm btn-light btn-block text-left proj-item" type="button" @click="setStateProjId">{{proj.title}}</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "Proj",
  props: {
    proj: Object,
    spheId: String
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    deleteItem(e) {
      this.$store.commit("deleteElement", {
        type: "p",
        spheId: this.spheId,
        projId: this.proj.id
      });
    },

    setStateProjId() {
      this.$store.commit("setStateProjId", {
        spheId: this.spheId,
        projId: this.proj.id
      });
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
