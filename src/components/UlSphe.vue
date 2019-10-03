<template>
  <div class="col-4 border-right">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <button class="btn btn-sm btn-block btn-warning" type="button">Показать все задачи</button>
      </li>
      <Sphe v-for="(value, index) in this.spheArr" :key="'ulsp'+index" :sphe="value" />
      <li class="list-group-item small">
        <div class="input-group" v-if="showForm">
          <input type="text" class="form-control form-control-sm" placeholder="Название сферы + Enter" @keypress="saveNewItem" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="nameNewItem" @blur="hideForm" autofocus />
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
      nameNewItem: "",
      spheArr: [],
      tecObject: this.$store.state.mainObject
    };
  },
  watch: {
    tecObject: (newVal, oldVal) => {
      this.getArray();
    }
  },
  mounted() {
    // Здесь надо получать массив Сфере через Вотч за Главным объектом. Именился главный объект, изменился массив сфер, перерисовалось представление.
    //this.getArray();
    this.$store.subscripe((mutation, state) => {
      switch (mutation.type) {
        case "getMainObject":
          this.getArray();
          break;
      }
    });
  },
  methods: {
    getArray() {
      for (let key in this.$store.state.mainObject) {
        this.spheArr.push(this.$store.state.mainObject[key]);
      }
      console.log("Получен массив this.spheArr:", this.spheArr);
    },
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        const spheId = "" + Date.now();
        let payload = {
          type: "s",
          spheId,
          item: {
            prop: {
              id: spheId,
              title: this.nameNewItem,
              pos: 1
            },
            child: {}
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
