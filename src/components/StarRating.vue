<template>
<div class="rating">
  <h3>Ваш рейтинг: {{rating}}</h3>
  <div class="stars">
    <div class="progress" :style="{ width }"></div>
    <img width="200" src="../assets/stars_rating.png">
  </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ rating: number }>()

const width = computed(() => {
  const percent = (props.rating / 5) * 100;

  return `${percent}%`;
})
</script>

<style scoped lang="scss">
@import "../styles/variables";
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}
.stars {
  width: 200px;
  height: 42px;
  position: relative;
}
.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 42px;
  background-color: $orange;
  border-radius: 4px;
  transition: width .3s ease-in-out;
}
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 42px;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, .2));
}
</style>
