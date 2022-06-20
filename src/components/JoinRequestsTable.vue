<template>
  <table>
    <thead>
    <tr>
      <td>Выбрать</td>
      <td>Группа</td>
      <td>Имя</td>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="request in requests"
      :key="request.id"
    >
      <td>
        <input type="checkbox" v-model="request.checked">
      </td>
      <td>{{ request.group.name }}</td>
      <td>{{ request.student.name }}</td>
    </tr>
    </tbody>
  </table>
  <div v-if="hasSelectedRequests" class="controls">
    <button @click="addAction.run">Добавить выбранные</button>
    <button @click="rejectAction.run">Отменить выбранные</button>
  </div>
</template>

<script setup lang="ts">

import { apiClient } from '../api';
import { JoinRequest } from '../api/joinRequests';
import { useLoading } from '../composables/useLoading';
import { computed } from 'vue';

const props = defineProps<{ requests: JoinRequest[] }>();

const hasSelectedRequests = computed(() => !!props.requests.filter(r => r.checked).length);

const addSelected = () => {
  return apiClient.joinRequests.add(props.requests.filter(r => r.checked).map(r => r.id));
}

const rejectSelected = () => {
  return apiClient.joinRequests.reject(props.requests.filter(r => r.checked).map(r => r.id));
}

const addAction = useLoading(addSelected);
const rejectAction = useLoading(rejectSelected);

</script>

<style scoped>

</style>
