<script setup lang="ts">
defineProps<{
  isFor: string;
  title: string;
}>();
</script>

<template>
  <label
    :for="isFor"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ title }}</label
  >
</template>
