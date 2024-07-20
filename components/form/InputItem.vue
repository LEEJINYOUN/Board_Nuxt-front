<script setup lang="ts">
defineProps<{
  type: string;
  id: string;
  value: string;
  isReadonly?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
}>();
const emit = defineEmits(["update:inputValue"]);
</script>

<template>
  <input
    :type="type"
    :id="id"
    :name="id"
    :value="value"
    :placeholder="placeholder"
    :readonly="isReadonly"
    :disabled="isDisabled"
    @input="emit('update:inputValue', $event)"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    required
  />
</template>
