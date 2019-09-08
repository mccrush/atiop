<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-block btn-success" type="button">Person Plan</button>
      </li>
      <Sphe v-for="(value, id, index) in this.$store.state.mainObject" :key="'ulsp'+id+index" :title="value" :id="id" :child="value.child" />
      <li class="list-group-item text-center small">
        <!-- <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Название сферы" @keypress="saveNewSphe" /> -->

        <div class="input-group" v-if="showForm">
          <input type="text" class="form-control form-control-sm" placeholder="Название сферы" @keypress="saveNewSphe" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <div class="input-group-append">
            <button @click="saveNewSphe" class="btn btn-sm btn-success" type="button" id="button-addon2">&nbsp;+&nbsp;</button>
          </div>
        </div>

        <a href="#" v-if="!showForm" @click="createNewSphe">Создать сферу</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Sphe from "@/components/Sphe.vue";
//import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "UlSphe",
  components: {
    Sphe
  },
  data() {
    return {
      showForm: false
    };
  },
  mounted() {
    //this.getActualSphe();
    // this.$store.watch(
    //   state => state.mapTask,
    //   (newV, oldV) => {
    //     this.getActualSphe();
    //   }
    // );
  },
  methods: {
    getActualSphe() {},
    createNewSphe() {
      this.showForm = true;
      //document.querySelector("#formNewSphe").focus();
    },
    saveNewSphe(e) {
      if (e.keyCode == 13) {
        let nameNewSphe = e.target.value;
        //let spheId = Date.now();
        let spheObj = {
          prop: { title: nameNewSphe }
        };

        this.$store.commit("addSpheInMainObject", spheObj);
        console.log("Запуск сохранения на сервере");
        this.$store.commit("saveOnServer");
        // console.log(
        //   "UlSphe: Новыый главный объект:",
        //   this.$store.state.mapTask
        // );

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
