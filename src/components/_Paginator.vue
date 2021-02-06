<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li
        v-if="prev.href"
        class="page-item text-start w-50"
        :class="{ 'w-100': !next.href }"
      >
        <a class="page-link" :href="'#' + prev.href"
          >&laquo; {{ prev.title }}</a
        >
      </li>
      <li
        v-if="next.href"
        class="page-item text-end w-50"
        :class="{ 'w-100': !prev.href }"
      >
        <a class="page-link" :href="'#' + next.href"
          >{{ next.title }} &raquo;</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['prev', 'next'],
}
</script>