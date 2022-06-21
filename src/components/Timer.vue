<template>
  <div class="timer">
    {{formattedTime}}
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { formatTime } from '~/utils';

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
const formattedTime = computed(() => formatTime(elapsed.value))
</script>

<style scoped>

</style>
