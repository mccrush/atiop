<template>
  <ul class="list-group list-group-flush">
    <Proj v-for="(value, name, i) in spheObjClear" :key="'ulpr'+name+i" :title="value.title" :projId="name" :spheId="spheId" />
    <li class="list-group-item text-center small new-proj">
      <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Название проекта" id="formNewSphe" @keypress="saveNewProj" />
      <a href="#" v-if="!showForm" @click="createNewProj">Создать проект</a>
    </li>
  </ul>
</template>

<script>
import Proj from "@/components/Proj.vue";
//import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

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
      spheObjClear: {},
      showForm: false
    };
  },
  mounted() {
    this.removeTitleFromObject();
  },
  methods: {
    removeTitleFromObject() {
      this.spheObjClear = Object.assign(
        {},
        this.$store.state.mapTask[this.spheId]
      );
      delete this.spheObjClear.title;
    },
    createNewProj() {
      this.showForm = true;
      //document.querySelector("#formNewSphe").focus();
    },
    saveNewProj(e) {
      if (e.keyCode == 13) {
        let nameNewProj = e.target.value;
        let idNewProj = Date.now();
        let newProj = {
          title: nameNewProj
        };
        this.$store.state.mapTask[this.spheId][idNewProj] = newProj;
        this.$store.state.timeup = Date.now();
        this.removeTitleFromObject();
        this.$store.commit("saveOnServer", this.$store.state.userId);
        //this.$store.state.mapTask[idNewSphe] = newSphe;
        console.log(
          "UlProj: Новыый главный объект:",
          this.$store.state.mapTask
        );

        this.showForm = false;
      }
    }
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
