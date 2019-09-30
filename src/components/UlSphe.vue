<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-sm btn-block btn-warning" type="button">Показать все задачи</button>
      </li>
      <!-- <Sphe v-for="(value, id, index) in this.$store.state.mainObject" :key="'ulsp'+id+index" :title="value.prop.title" :spheId="id" :child="value.child" /> -->
      <Sphe v-for="(value, index) in this.$store.state.spheArr" :key="'ulsp'+index" :sphe="value" />
      <li class="list-group-item small">
        <div class="input-group" v-if="showForm">
          <input type="text" class="form-control form-control-sm" placeholder="Название сферы + Enter" @keypress="saveNewItem" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="nameNewItem" @blur="hideForm" autofocus />
          <!-- <div class="input-group-append">
            <button class="btn btn-sm btn-success" type="button" id="button-addon2" @click="createNewItem">&nbsp;+&nbsp;</button>
          </div>-->
        </div>

        <a href="#" class="btn btn-sm btn-light btn-block text-left text-muted" v-if="!showForm" @click="createNewItem">Создать объект</a>
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
  mounted() {},
  methods: {
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        let payload = {
          sphe: {
            id: Date.now(),
            title: this.nameNewItem,
            pos: 1
          }
        };

        this.$store.commit("addSphe", payload);
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
