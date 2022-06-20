<template>
<div class="page">
  <header class="header">
    <div class="title">{{ title }}</div>
    <slot name="header"></slot>
  </header>
  <div class="content">
    <aside class="sidebar"><slot name="aside"></slot></aside>
    <main class="main">
      <slot></slot>
    </main>
  </div>
  <footer class="footer">
    <slot name="footer"></slot>
  </footer>
</div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Сборник задач по программированию'
  }
})
</script>

<style scoped lang="scss">
@import "src/styles/variables";

.page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: auto;
}

.content {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.header {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background-color: $dark-blue;
  color: white;
  font-weight: bold;
}

.sidebar {
  background-color: $light-blue;
  min-width: 200px;
  &:empty {
    display: none;
  }
}

.main {
  padding: 12px;
  background: #fff;
  flex-grow: 1;
}
</style>
