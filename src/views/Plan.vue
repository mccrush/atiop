<template>
  <div>
    <!-- Строка фильтров -->
    <div class="row p-0 border-bottom">
      <div class="col-3 col-xxl-2 p-2">
        <input
          type="text"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="---"
        />
      </div>
    </div>
    <!-- Конец Строка фильтров -->

    <div class="row overflow-auto my-row-project">
      <div class="my-width-none">
        <div class="mt-2 mr-2 rounded-sm d-inline-block border my-project">
          <h6 class="text-center pt-3 pr-2 m-0">1</h6>
        </div>
        <div class="mt-2 mr-2 rounded-sm d-inline-block border my-project">
          <h6 class="text-center pt-3 pr-2 m-0">2</h6>
        </div>
        <div class="mt-2 mr-2 rounded-sm d-inline-block border my-project">
          <h6 class="text-center pt-3 pr-2 m-0">3</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.my-row-project {
  height: calc(100vh - 105px) !important;
}
.my-project {
  width: 210px;
  vertical-align: top;
}

.my-no-select {
  user-select: none;
}

/* .my-opacity-05 {
  opacity: 0.5;
} */

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
</style>