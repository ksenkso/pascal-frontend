<template>
  <div v-if="tabs" class="tabs">
    <div class="tabs-header">
      <div class="tabs-header-item" v-for="tab in tabs" :key="tab.name" :class="{ 'tabs-header-item-active': activeTab && activeTab.name === tab.name }">
        <button class="tab-button" @click="activeTab = tab">{{ tab.title }}</button>
      </div>
    </div>
    <div v-if="activeTab" class="tabs-body">
      <component :is="activeTab.component" v-bind="activeTab.props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

export type Tab = {
  title: string;
  name: string;
  component: any;
  props?: any
};

type Props = {
  tabs: Tab[]
}
const props = defineProps<Props>();

const activeTab = ref<Tab>(props.tabs[0]);

watch(() => props.tabs, (tabs) => {
  activeTab.value = tabs[0];
});


</script>

<style scoped lang="scss">
@import "src/styles/variables";

.tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tabs-header {
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
}
.tabs-header-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-right: none;
  &:last-child {
    border-right: 1px solid #ccc;
  }
}

.tab-button {
  display: inline-block;
  text-decoration: none;
  color: #111;
  padding: 12px;
  cursor: pointer;
  border: none;
}

.tabs-body {
  padding: 4px;
}
.tabs-header-item-active {
  border-color: lighten($dark-blue, 10%);
  .tab-button {
    background-color: $dark-blue;
    color: white;
  }
}
</style>
