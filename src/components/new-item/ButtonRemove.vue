<template>
  <button
    class="btn btn-sm btn-outline-dark"
    @click="$emit('remove-elem', { type, id })"
  >
    Del {{ type.substring(0, type.length) }}
  </button>
</template>

<script>
export default {
  props: ['type', 'id']
}
</script>