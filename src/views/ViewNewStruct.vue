<template>
  <div
    class="row d-flex flex-nowrap align-items-start bg-light pt-3 ps-2 kanban"
    id="rowScroll"
  >
    <CycleView type="napravs" parentId="" />
  </div>
</template>

<style scoped>
.kanban {
  height: calc(100vh - 56px);
  overflow-x: auto;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}

.active {
  cursor: grabbing;
}
</style>