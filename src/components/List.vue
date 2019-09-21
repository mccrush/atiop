<template>
  <div class="col-4 border-right">
    <h6 v-if="!showForm" class="pt-3 border-bottom pb-2 font-weight-bold listtitle" @click="editItem">
      {{itemTitle}}
      <button class="btn btn-sm btn-light text-center delbutton" title="Удалить список" @click="deleteItem">D</button>
    </h6>
    <input class="form-control form-control-sm formitem" v-if="showForm" v-model="itemTitle" @blur="hideForm" @focus="hideBorder" type="text" />
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
    return {
      showForm: false,
      itemTitle: this.title
    };
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
    },
    editItem(e) {
      this.showForm = true;
    },
    hideBorder(e) {
      e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
    },
    hideForm(e) {
      if (!this.itemTitle) {
        e.target.style = "border-bottom: 1px solid #dc3545 !important;";
      } else {
        e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
        this.showForm = false;
        this.$store.commit("renameElement", {
          type: "l",
          spheid: this.$store.state.sphe,
          projid: this.$store.state.proj,
          listid: this.listId,
          title: this.itemTitle
        });
      }
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

.formitem {
  font-size: 16px;
  font-weight: 700;
  outline: none;
  border: none;
  border-bottom: 1px solid #dee2e6 !important;
  margin-top: 10px;
  margin-bottom: 8px;
  padding: 0 0 1px 0;
  color: #212529;
}
</style>
