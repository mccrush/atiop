<template>
  <ul class="list-group list-group-flush">
    <Proj v-for="(value, name, index) in this.$store.state.mainObject[spheId]" :key="'ulpr'+id+index" :title="value.title" :projId="name" :spheId="spheId" />
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
    title: String
  },
  data() {
    return {
      actualSphe: this.$store.state.mainObject[this.spheId],
      showForm: false
    };
  },
  mounted() {},
  methods: {
    getActualSphe() {
      this.actualSphe = Object.assign(
        {},
        this.$store.state.mainObject[this.spheId]
      );
      delete this.actualSphe.title;
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
        this.$store.state.mainObject[this.spheId][idNewProj] = newProj;
        this.$store.state.timeup = Date.now();
        this.removeTitleFromObject();
        this.$store.commit("saveOnServer", this.$store.state.userId);
        //this.$store.state.mainObject[idNewSphe] = newSphe;
        console.log(
          "UlProj: Новыый главный объект:",
          this.$store.state.mainObject
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
