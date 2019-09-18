<template>
  <ul class="list-group list-group-flush">
    <Proj v-for="(value, id, index) in spheObj" :key="'ulpr'+id+index" :title="value.prop.title" :projId="id" :spheId="spheId" />
    <li class="list-group-item small new-proj">
      <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Название проекта + Enter" id="formNewSphe" @keypress="saveNewItem" v-model="nameNewItem" @blur="hideForm" autofocus />
      <a href="#" class="btn btn-sm btn-light btn-block text-left" v-if="!showForm" @click="createNewItem">Создать проект</a>
    </li>
  </ul>
</template>

<script>
import Proj from "@/components/Proj.vue";

export default {
  name: "UlProj",
  components: {
    Proj
  },
  props: {
    spheId: String,
    title: String,
    spheObj: Object
  },
  data() {
    return {
      showForm: false,
      nameNewItem: ""
    };
  },
  mounted() {},
  methods: {
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        let payload = {
          type: "p",
          spheid: this.spheId,
          child: {
            prop: { title: this.nameNewItem },
            child: {}
          }
        };
        this.$store.commit("addElement", payload);
        this.nameNewItem = "";
        this.showForm = false;
      }
    },
    hideForm() {
      if (!this.nameNewItem) {
        this.showForm = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
.list-group-item {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: none;
}
</style>
