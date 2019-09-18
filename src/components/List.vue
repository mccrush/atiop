<template>
  <div class="col-5 border-right">
    <h6 class="pt-3 border-bottom pb-2 font-weight-bold">{{title}}</h6>
    <UlTask :listId="listId" :listObj="listObj" />
  </div>
</template>

<script>
import UlTask from "@/components/UlTask.vue";
export default {
  name: "List",
  components: {
    UlTask
  },
  props: {
    listId: String,
    title: String,
    listObj: Object
  },
  data() {
    return {
      //listObjClear: {}
    };
  },
  mounted() {},
  methods: {
    createTask() {}
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
.col-3 {
  padding-right: 0;
}
</style>
