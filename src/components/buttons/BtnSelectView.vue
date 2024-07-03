<template>
  <button class="btn btn-sm btn-dark lh-1 ps-3 pe-3 pt-2 pb-2">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>