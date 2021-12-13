<template>
  <button
    class="btn btn-sm btn-success"
    @click="$emit('add-elem', { type, parentId })"
  >
    Add {{ type.substring(0, type.length - 1) }}
  </button>
</template>

<script>
export default {
  props: ['type', 'parentId']
}
</script>