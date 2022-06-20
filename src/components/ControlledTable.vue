<template>
  <div class="table-wrapper">
    <div class="table-controls">
      <div class="table-controls-item">
        <slot name="controls" />
      </div>
    </div>
    <table v-if="showTable">
      <thead>
      <tr>
        <th :style="{ width: col.width || 'auto' }" v-for="col in columns">{{ getTitle(col) }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <slot name="row" :data="row">
          <td v-for="(col, colIndex) in columns" :key="colIndex">{{ getContent(col, row) }}</td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: false,
  },
  showTable: {
    type: Boolean,
    default: true,
  },
})

export type ColObject = {
  title: string;
  value: string;
  render?: (row: Record<string, any>) => string;
};

const getTitle = (col: string | ColObject) => {
  if (typeof col === 'string') {
    return col;
  }
  return col.title;
}

const getContent = (col: string | ColObject, row: Record<string, any>) => {
  if (typeof col === 'string') {
    return col;
  }
  return col.render ? col.render(row) : row[col.value];
}
</script>

<style lang="scss">
.table-wrapper {
  margin-bottom: 1rem;
}

table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}
th, td {
  padding: 0.5rem;
  border: 1px solid #ccc;
}
</style>
