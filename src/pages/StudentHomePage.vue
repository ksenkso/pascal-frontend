<template>
  <Page title="Домашняя страница">
    <template #header>
      <UserInfo :user="currentUser" />
    </template>
    <h1>{{groupTitle}}</h1>
    <h2>Список курсов</h2>
    <BasicList v-if="taskSets" :list="taskSets">
      <template #default="{ item }">
        <router-link :to="{ name: 'TASK_SET', params: { id: item._id } }">{{item.name}}</router-link>
      </template>
    </BasicList>
  </Page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import BasicList from '~/components/common/BasicList.vue';
import { useModel } from '~/composables/useModel';
import { apiClient } from '~/api';

const { currentUser, loadUser } = useCurrentUser()
const getTaskSets = () => apiClient.taskSets.findForGroup(currentUser.value!.groups[0]._id);
const { model: taskSets, run: loadTaskSets } = useModel(getTaskSets)

onMounted(() => {
  loadUser();
  loadTaskSets();
});

const groupTitle = computed(() => {
  if (currentUser.value?.groups.length) {
    return `Ваша группа: ${currentUser.value.groups[0].name}`
  }
  return 'Ваша группа: загрузка...'
})
</script>

