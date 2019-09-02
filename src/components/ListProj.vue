<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(value, name, index) in projObjClear" :key="'pr'+index">
      <button type="button" class="btn btn-sm btn-block btn-light" @click="setStateProjId(name)">{{index+1}}. {{value.title}}</button>
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
    spheId: String,
    projObj: Object
  },
  data() {
    return {
      projObjClear: {}
    };
  },
  created() {
    this.projObjClear = this.projObj;
    delete this.projObjClear.title;
  },
  computed: {},
  methods: {
    setStateProjId(projid) {
      this.$store.state.sphe = this.spheId;
      this.$store.state.proj = projid;
      console.log(
        "ListProj: projId =",
        this.$store.state.proj,
        "spheId=",
        this.$store.state.sphe
      );
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
          // this.$store.state.projArr.push({
          //   title: e.target.value,
          //   sphe: "Надо как-то его получить"
          // });
          console.log("ListProj: Вызван метод создания проекта");
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
