<template>
  <div class="col-8 border-right">
    <div class="row" v-if="this.$store.state.proj">
      <List v-for="(value, id, index) in projObj" :key="'li'+id+index" :title="value.prop.title" :listId="id" :listObj="value.child" />
      <div class="col-5 border-right">
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center small new-sphe pl-0 pr-0">
            <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Название списка + Enter" id="formNewSphe" @keypress="saveNewItem" v-model="nameNewItem" @blur="hideForm" autofocus />
            <a href="#" class="btn btn-sm btn-light btn-block text-left" v-if="!showForm" @click="createNewItem">Добавить список</a>
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
      spheObj: {},
      projObj: {},
      showForm: false,
      nameNewItem: ""
    };
  },
  created() {},
  mounted() {
    this.$store.watch(
      state => state.proj,
      (newV, oldV) => {
        this.spheObj = this.$store.state.mainObject[this.$store.state.sphe];
        this.projObj = this.spheObj.child[newV].child;
      }
    );
  },
  methods: {
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        let payload = {
          type: "l",
          spheid: this.$store.state.sphe,
          projid: this.$store.state.proj,
          child: {
            prop: { title: this.nameNewItem },
            child: {}
          }
        };
        this.$store.commit("addElement", payload);
        this.nameNewItem = "";
        this.showForm = false;
        this.projObj = this.spheObj.child[this.$store.state.proj].child;
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
