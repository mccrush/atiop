<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-sm btn-block btn-warning" type="button">Показать все задачи</button>
      </li>
      <Sphe v-for="(value, index) in spheArr" :key="'ulsp'+index" :sphe="value" />
      <li class="list-group-item small">
        <div class="input-group" v-if="showForm">
          <input type="text" class="form-control form-control-sm" placeholder="Название сферы + Enter" @keyup.enter="saveNewItem" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="nameNewItem" @blur="hideForm" autofocus />
        </div>
        <button href="#" class="btn btn-sm btn-light btn-block text-left text-muted" v-if="!showForm" @click="createNewItem">Создать объект</button>
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
      nameNewItem: ""
    };
  },
  computed: {
    spheArr() {
      return this.$store.getters.spheArr;
    }
  },
  methods: {
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      //if (e.keyCode == 13) {
        const spheId = "" + Date.now();
        let payload = {
          type: "sphe",
          item: {
            id: spheId,
            title: this.nameNewItem,
            pos: 1
          }
        };

        this.$store.commit("addItem", payload);
        this.nameNewItem = "";
        this.showForm = false;
     // }
    },
    hideForm() {
      if (!this.nameNewItem) {
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
