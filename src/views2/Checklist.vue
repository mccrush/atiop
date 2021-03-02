<template>
  <div class="row align-content-start bg-info p-3 checklist">
    <ul class="list-group ms-2">
      <li class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          value=""
          aria-label="..."
        />
        First checkbox
      </li>
      <li class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          value=""
          aria-label="..."
        />
        Second checkbox
      </li>
      <li class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          value=""
          aria-label="..."
        />
        Third checkbox
      </li>
      <li class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          value=""
          aria-label="..."
        />
        Fourth checkbox
      </li>
      <li class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          value=""
          aria-label="..."
        />
        Fifth checkbox
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.checklist {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>