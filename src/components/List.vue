<template>
  <div class="col-4 border-right">
    <h6 v-if="!showForm" class="pt-3 border-bottom pb-2 font-weight-bold listtitle" @click="editItem">
      {{itemTitle}}
      <button class="btn btn-sm btn-light text-center delbutton" title="Удалить список" @click="deleteItem">D</button>
    </h6>
    <input class="form-control form-control-sm formitem" v-if="showForm" v-model="itemTitle" @blur="blurForm" @focus="hideBorder" type="text" @keypress="pressEnter" />
    <UlTask :listId="list.id" />
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
    list: Object
  },
  data() {
    return {
      showForm: false,
      itemTitle: this.list.title
    };
  },
  mounted() {},
  methods: {
    deleteItem(e) {
      //e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "l",
        spheId: this.$store.state.sphe,
        projId: this.$store.state.proj,
        listId: this.list.id
      });
    },
    editItem(e) {
      this.showForm = true;
    },
    hideBorder(e) {
      e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
    },
    saveChangeName() {
      this.$store.commit("renameElement", {
        type: "l",
        spheId: this.$store.state.sphe,
        projId: this.$store.state.proj,
        listId: this.list.id,
        title: this.itemTitle
      });
    },
    pressEnter(e) {
      if (e.keyCode == 13 && this.itemTitle) {
        e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
        this.showForm = false;
        this.saveChangeName();
      }
    },
    blurForm(e) {
      if (!this.itemTitle) {
        e.target.style = "border-bottom: 1px solid #dc3545 !important;";
      } else {
        e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
        this.showForm = false;
        this.saveChangeName();
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
  opacity: 0.8;
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
