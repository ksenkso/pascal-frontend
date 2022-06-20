<template>
  <Page title="Домашняя страница">
    <template #header>
      <UserInfo :user="currentUser" />
    </template>
    <template v-if="currentUser">
      <h1>Ваши группы</h1>
      <ul v-if="currentUser.groups.length">
        <li
          v-for="group in currentUser.groups"
          :key="group._id"
        >
          {{ group.name }}
        </li>
      </ul>
      <div v-else>
        Вы не состоите ни в одной группе
      </div>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';

const { currentUser, loadUser } = useCurrentUser()

onMounted(loadUser);
</script>

