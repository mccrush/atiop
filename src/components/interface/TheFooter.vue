<template>
  <div
    class="at-z-2 small bg-dark text-center border-top border-dark-subtle position-fixed bottom-0 z-5 w-100 p-1 ps-2"
  >
    <code class="text-light">v{{ version }}</code>
    <code class="text-body-secondary"> from </code>
    <code class="text-light"> {{ VITE_BD }}</code>
    <code class="text-body-secondary"> by </code>
    <a
      href="https://github.com/mccrush/atiop"
      target="_blank"
      title="Открыть проект на GitHub"
      class="text-nodecoration"
      ><code class="text-light">mccrush.ru</code></a
    >
  </div>
</template>

<script>
import { version } from './../../../package.json'
import { getLocaleDateFromDateDigit } from './../../helpers/getDateFormat'

export default {
  data() {
    return {
      version,
      VITE_BD: import.meta.env.VITE_BD
    }
  },
  methods: {
    getLocaleDateFromDateDigit
  }
}
</script>

<style scoped>
.at-z-2 {
  z-index: 2;
}
</style>