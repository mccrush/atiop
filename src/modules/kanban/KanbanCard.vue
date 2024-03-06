<template>
  <div class="shadow-sm rounded mt-2 p-2">
    <h6>{{ task.title }}</h6>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
  }
}
</script>