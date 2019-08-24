<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(item, index) in projArr" :key="'pj'+index">
      <button type="button" class="btn btn-sm btn-block btn-light" @click="setState(item.id)">{{index+1}}. {{item.title}}</button>
    </li>
    <li class="list-group-item text-center small new-proj">
      <a href="#" @click="createProj">Создать проект</a>
    </li>
  </ul>
</template>

<script>
import store from "@/store";

export default {
  name: "listproj",
  props: {
    id: String
  },
  data() {
    return {
      projArr: []
    };
  },
  created() {
    //console.log("ListProj: Пришел id", this.id);
    this.projArr = this.$store.state.projArr.filter(item => {
      return item.sphe == this.id;
    });
    //console.log("ListProj: projArr", this.projArr);
  },
  methods: {
    setState(id) {
      this.$store.state.proj = id;
      console.log("ListProj: proj id =", this.$store.state.proj);
    },
    createProj(event) {
      let inputForm = document.createElement("input");
      inputForm.setAttribute("type", "text");
      inputForm.setAttribute("value", "");
      inputForm.slassName = "form-control, form-control-sm";
      inputForm.setAttribute("autofocus", "");
      event.target.parentElement.replaceWith(inputForm);
      //"<input type='text' value='' autofocus/>";

      inputForm.addEventListener("keypress", e => {
        if (e.keyCode == 13) {
          this.$store.state.projArr.push({
            title: e.target.value,
            sphe: "Надо как-то его получить"
          });
          // Добавить в State, реактивно обновить Вид, отправить в Фаерстор. Подумать как сгенерировать id...
          // Ну можно отправить в Фаерстор, а потом обновить State... Но что делать если интернета нет?
          // Да, можно работать со Стором, и отправлять в Фаерстор как появится интернет, но тогда где взять id для дальнейшей работы... Если нет интернета \_( )_/
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  border: none;
}
</style>
