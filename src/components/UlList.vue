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
  created() {},
  mounted() {
    this.$store.watch(
      state => state.proj,
      (newV, oldV) => {
        this.listArr = this.getListArr;
      }
    );
  },
  methods: {
    getListArr() {
      return this.$store.getters.listArr.filter(
        list => list.proj == this.$store.state.proj
      );
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
        this.listObj = this.spheObj.child[this.$store.state.proj].child;
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
