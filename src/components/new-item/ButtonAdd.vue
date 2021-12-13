<template>
  <button
    class="btn btn-sm btn-success"
    @click="$emit('add-elem', { type, id })"
  >
    Add {{ type.substring(0, type.length) }}
  </button>
</template>

<script>
export default {
  props: ['type', 'id']
}
</script>