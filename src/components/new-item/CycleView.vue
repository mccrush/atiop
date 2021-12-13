<template>
  <div class="d-flex align-items-start">
    <div
      v-for="elem in getChildArray(type, parentId)"
      :key="elem.id"
      class="border border-success rounded me-2 p-2"
    >
      <div class="mb-2">
        {{ type.substring(0, type.length) }} title
        <ButtonRemove :type="elem.type" :id="elem.id" />
      </div>
      <CycleView
        v-if="type !== 'tasks'"
        :array="getChildArray('napravs', '')"
      />
    </div>
    <ButtonAdd :type="elem.type" :id="id" />
  </div>
</template>

<script>
export default {
  props: ['array', 'type', 'id', 'parentId'],
  methods: {
    getChildArray(type, parentId) {
      if (parentId) {
        return this[type].filter(item => item.parentId === parentId)
      } else {
        return this[type]
      }
    }
  }
}
</script>