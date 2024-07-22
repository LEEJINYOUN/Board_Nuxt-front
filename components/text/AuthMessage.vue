<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <span class="text-red-500 text-sm mt-2 px-1">
    {{ message }}
  </span>
</template>
