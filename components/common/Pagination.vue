<script setup lang="ts">
defineProps<{
  pageNumber: number | undefined;
  perPage: number;
  page: number;
  pageChange: (number: number) => void;
  contentPage: number;
  number: number;
}>();
</script>

<template>
  <button
    class="rounded-full flex items-center justify-center px-3 h-8 text-blue-400 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
    :class="page == number ? 'font-semibold text-blue-600' : ''"
    @click="pageChange(number)"
  >
    {{ contentPage + 1 }}
  </button>
</template>
