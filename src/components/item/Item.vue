<template>
  <div class="item align-self-start border rounded-1 pt-1 pb-1 ps-2 pe-2 m-2">
    <span class="small">{{ item.title }}</span>
    <hr class="m-1" />
  </div>
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style scoped>
.item {
  width: 192px;
  line-height: 1.2;
  user-select: none;
  cursor: default;
}

.btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}

hr {
  background-color: #dee2e6;
}
</style>