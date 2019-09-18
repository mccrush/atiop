<template>
  <li class="list-group-item" :id="projId">
    <!-- <button type="button" class="btn btn-sm btn-block btn-success" @click="setStateProjId">{{title}}</button> -->
    <small class="text-muted">&nbsp;&nbsp;|_&nbsp;&nbsp;</small>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-sm btn-dark" @click="deleteProj" title="Удалить проект">D</button>
      <button class="btn btn-sm btn-light" type="button" @click="setStateProjId">{{title}}</button>
    </div>
  </li>
</template>

<script>
//import store from "@/store";

export default {
  name: "Proj",
  props: {
    spheId: String,
    projId: String,
    title: String
  },
  data() {
    return {
      //projObjClear: {}
    };
  },
  created() {
    //this.projObjClear = this.projObj;
    //delete this.projObjClear.title;
  },
  computed: {},
  methods: {
    deleteProj(e) {
      e.target.parentNode.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "p",
        spheid: this.spheId,
        projid: this.projId
      });
    },
    setStateProjId() {
      this.$store.state.sphe = this.spheId;
      this.$store.state.proj = this.projId;
      console.log(
        "List: projId =",
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
