<template>
  <div class="col-5 border-right">
    <h6 class="pt-3 border-bottom pb-2 font-weight-bold listtitle">
      {{title}}
      <button class="btn btn-sm btn-light text-center delbutton" @click="deleteItem">D</button>
    </h6>

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
    deleteItem(e) {
      e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "l",
        spheid: this.$store.state.sphe,
        projid: this.$store.state.proj,
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

.listtitle {
  cursor: pointer;
}

.delbutton {
  position: absolute;
  float: right;
  width: 30px;
  display: none;
  top: 11px;
  right: 15px;
  cursor: pointer;
}

.listtitle:hover .delbutton {
  display: block;
}
</style>
