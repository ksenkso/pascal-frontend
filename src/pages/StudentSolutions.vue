<template>
  <Page :title="title">
    <template #header>
      <UserInfo :user="currentUser"/>
    </template>
    <template #aside>
      <Navigation />
    </template>
    <h1>{{title}}</h1>
    <BasicList v-if="solutions" :list="solutions" v-slot="{ item: solution }">
      <router-link :to="{ name: 'SOLUTION_PAGE', params: { id: solution._id } }">{{ solution.task.name }}</router-link>
    </BasicList>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import { computed, onMounted } from 'vue';
import UserInfo from '~/components/UserInfo.vue';
import Navigation from '~/components/common/Navigation.vue';
import { apiClient } from '~/api';
import { useRoute } from 'vue-router';
import { useModel } from '~/composables/useModel';
import BasicList from '~/components/common/BasicList.vue';

const { currentUser, isTeacher } = useCurrentUser();
const route = useRoute();
const getUser = () => apiClient.users.getById(route.params.studentId as string);
const { model: user, run: loadUser } = useModel(getUser);
const getSolutions = () => apiClient.solutions.getForUser(user.value!._id);
const { model: solutions, run: loadSolutions } = useModel(getSolutions);

onMounted(() => {
  loadUser()
      .then(() => loadSolutions());
});

const title = computed(() => {
  if (user.value) {
    return `Решения ученика: ${user.value.name}`;
  }
  return 'Решения ученика';
});


</script>

<style scoped>

</style>
