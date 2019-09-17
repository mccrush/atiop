<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-sm btn-block btn-warning" type="button">Показать все задачи</button>
      </li>
      <Sphe v-for="(value, id, index) in this.$store.state.mainObject" :key="'ulsp'+id+index" :title="value.prop.title" :id="id" :child="value.child" />
      <li class="list-group-item text-center small">
        <!-- <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Название сферы" @keypress="saveNewSphe" /> -->

        <div class="input-group" v-if="showForm">
          <input type="text" class="form-control form-control-sm" placeholder="Название сферы + Enter" @keypress="saveNewSphe" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="nameNewSphe" />
          <!-- <div class="input-group-append">
            <button class="btn btn-sm btn-success" type="button" id="button-addon2">&nbsp;+&nbsp;</button>
          </div>-->
        </div>

        <a href="#" class="btn btn-sm btn-light" v-if="!showForm" @click="createNewSphe">Создать объект</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Sphe from "@/components/Sphe.vue";

export default {
  name: "UlSphe",
  components: {
    Sphe
  },
  data() {
    return {
      showForm: false,
      nameNewSphe: ""
    };
  },
  mounted() {
    // this.$store.watch(
    //   state => state.mapTask,
    //   (newV, oldV) => {
    //   }
    // );
  },
  methods: {
    createNewSphe() {
      this.showForm = true;
    },
    saveNewSphe(e) {
      if (e.keyCode == 13) {
        let spheObj = {
          prop: { title: this.nameNewSphe }
        };

        this.$store.commit("addElement", spheObj);
        this.nameNewSphe = "";
        this.showForm = false;
      }
    }
  }
};
</script>

<!-- Add "scoped"  -->
<style scoped>
.list-group-item {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: none;
}
</style>
