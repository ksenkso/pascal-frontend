<template>
  <button @click="$emit('click', $event)" :class="bem('button', modifiers)"><slot /></button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { bem } from '../../utils';

defineEmits(['click']);
const props = defineProps<{ type?: string }>()
const modifiers = computed(() => ({
  type: props.type
}));
</script>

<style scoped lang="scss">
@import "src/styles/variables";
.button {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 16px;
  text-align: center;
}

.button_type-danger {
  background-color: #ba2c2c;
  color: white;
}

.button_type-primary {
  background-color: $dark-blue;
  color: white;
}
</style>
