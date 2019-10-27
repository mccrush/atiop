<template>
  <div class="col-8 border-right">
    <div class="row" v-if="this.$store.state.proj">
      <List v-for="(value, index) in listArr" :key="'ulli'+index" :list="value" />
      <div class="col-4 border-right">
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center small new-sphe pl-0 pr-0">
            <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Название списка + Enter" id="formNewSphe" @keypress="saveNewItem" v-model="nameNewItem" @blur="hideForm" autofocus />
            <a href="#" class="btn btn-sm btn-light btn-block text-left text-muted" v-if="!showForm" @click="createNewItem">Добавить список</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List.vue";

export default {
  name: "UlList",
  components: {
    List
  },
  props: {},
  data() {
    return {
      showForm: false,
      nameNewItem: "",
      listArr: []
    };
  },
  created() {
    // this.$store.watch(
    //   state => state.proj,
    //   (newV, oldV) => {
    //     console.log("Произошло изменение projId");
    //     this.getListArr();
    //   }
    // );

    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "setStateProjId") {
        this.listArr = state.listArr.filter(list => list.proj == state.proj);
      }
    });

    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type == "addItem" && mutation.payload.type == "list") {
    //     this.listArr = this.getListArr();
    //   }
    // });
  },
  // computed: {
  //   listArr() {
  //     return this.$store.getters.listArr.filter(
  //       list => list.proj == this.$store.state.proj
  //     );
  //   }
  // },
  methods: {
    getListArr() {
      //console.log("Произошел вызов метода getListArr()");
      this.listArr = this.$store.getters.listArr.filter(
        list => list.proj == this.$store.state.proj
      );
      console.log("Новое значение this.listArr = ", this.listArr);
    },
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        let payload = {
          type: "list",
          item: {
            id: "" + Date.now(),
            title: this.nameNewItem,
            pos: 1,
            sphe: this.$store.state.sphe,
            proj: this.$store.state.proj
          }
        };
        this.$store.commit("addItem", payload);
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
.col-10 {
  padding-left: 0;
  padding-right: 0;
}
</style>
