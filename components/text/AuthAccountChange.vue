<script setup lang="ts">
defineProps<{
  accountToggle: () => void;
  title: string;
  button: string;
}>();
</script>

<template>
  <div class="my-5 flex items-center text-center gap-5 text-sm">
    <span>{{ title }}</span>
    <span
      class="text-red-500 hover:text-red-700 cursor-pointer"
      @click="accountToggle"
      >{{ button }}</span
    >
  </div>
</template>
