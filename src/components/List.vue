<template>
  <div class="col-5 border-right">
    <h6 class="pt-3 border-bottom pb-2 font-weight-bold">{{title}}</h6>
    <UlTask :listId="listId" :listObj="listObj" />
  </div>
</template>

<script>
import UlTask from "@/components/UlTask.vue";
export default {
  name: "List",
  components: {
    UlTask
  },
  props: {
    listId: String,
    title: String,
    listObj: Object
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    deleteProj(e) {
      e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "l",
        spheid: this.spheId,
        projid: this.projId,
        listid: this.listId
      });
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
.col-3 {
  padding-right: 0;
}
</style>
