<template>
  <ul class="list">
    <li v-for="(item, index) in list" :key="index" class="list-item">
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ list: any[] }>()
</script>

<style lang="scss">
@import "src/styles/variables";

.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;

  .list-item {
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 12px;
    a, .list-item-content {
      display: block;
      padding: 12px;
      text-decoration: none;
      color: $dark-blue;
    }
  }
}
</style>
