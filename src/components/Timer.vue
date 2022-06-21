<template>
  <div class="timer">
    {{formattedTime}}
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{ startTime: number, time: number, isRunning: boolean }>();
const interval = ref();
const elapsed = ref(0);
const emit = defineEmits<{
  (e: 'tick', time: number): void;
}>()
onMounted(() => {
  interval.value = setInterval(() => {
    if (props.isRunning) {
      elapsed.value += 1;
      emit('tick', elapsed.value);
    }
  }, 1000);
})

watch(() => props.isRunning, (isRunning) => {
  if (!isRunning) {
    clearInterval(interval.value);
  } else {
    clearInterval(interval.value);
    elapsed.value = 0;
    interval.value = setInterval(() => {
      if (props.isRunning) {
        elapsed.value += 1;
        emit('tick', elapsed.value);
      }
    }, 1000);
  }
})

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
const formattedTime = computed(() => {
  const hours = Math.floor(elapsed.value / 3600);
  const minutes = Math.floor((elapsed.value - hours * 3600) / 60);
  const seconds = elapsed.value % 60;

  return [
    hours,
    minutes,
    seconds
  ]
    .map(t => t.toString().padStart(2, '0'))
    .join(':');
})
</script>

<style scoped>

</style>
