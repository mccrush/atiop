<template>
  <div class="item align-self-start border rounded-1 pt-1 pb-1 ps-2 pe-2 mb-2">
    <span class="small">{{ item.title }}</span>
    <hr class="m-1" />
    <hr class="m-1" />
    <div class="btn-group w-100" role="group">
      <router-link
        v-if="item.type === 'projects'"
        type="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-100"
        :to="'?nap=' + item.napravId + '&proj=' + item.id"
      >
        In
      </router-link>
    </div>
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