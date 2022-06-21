<template>
  <Page title="Группы">
    <template #header>
      <UserInfo :user="currentUser"/>
    </template>
    <template #aside>
      <nav>
        <ul>
          <li>
            <router-link to="/">Главная</router-link>
          </li>
          <li>
            <router-link to="/groups">Мои группы</router-link>
          </li>
        </ul>
      </nav>
    </template>
    <FadeTransition>
      <div v-if="copyPopupVisible" class="copy-popup">
        <div class="copy-popup-content">
          <p>Ссылка на регистрацию в группе скопирована в буфер обмена</p>
        </div>
      </div>
    </FadeTransition>
    <template v-if="groupLoading">
      Загрузка...
    </template>
    <h1 v-if="group">Группа {{ group.name }}</h1>
    <div class="copy-link">
      <BasicButton @click="copyGroupLink" type="primary">Скопировать ссылку</BasicButton>
    </div>
    <BasicTabs :tabs="tabs" />
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import BasicButton from '~/components/common/BasicButton.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import { computed, markRaw, onMounted, ref } from 'vue';
import { Group } from '~/api/groups';
import { apiClient } from '~/api';
import { useRoute } from 'vue-router';
import { useLoading } from '~/composables/useLoading';
import FadeTransition from '~/components/common/FadeTransition.vue';
import { copyTextToClipboard } from '~/utils';
import BasicTabs from '~/components/common/BasicTabs.vue';
import StudentsList from '~/components/groups/StudentsList.vue';
import TaskSetsList from '~/components/groups/TaskSetsList.vue';

const { currentUser } = useCurrentUser();
const route = useRoute();
const group = ref<Group | undefined>();
const getGroup = () => apiClient.groups.getById(route.params.id as string);
const { isLoading: groupLoading, run: loadGroup } = useLoading(getGroup);

const tabs = computed(() => {
  const tabs = [];
  if (group.value) {
    tabs.push({
      title: 'Студенты',
      name: 'students',
      component: markRaw(StudentsList),
      props: {
        group: group.value,
      },
    });
    tabs.push({
      title: 'Наборы задач',
      name: 'task-sets',
      component: markRaw(TaskSetsList),
      props: {
        group: group.value,
      },
    });
  }
  return tabs;
});

function createGroupLink(id: string) {
  return `${window.location.origin}/register-student?groupId=${id}`;
}

const copyPopupVisible = ref(false);
const copyGroupLink = () => {
  copyTextToClipboard(createGroupLink(group.value!._id))
      .then(() => {
        copyPopupVisible.value = true;
        setTimeout(() => copyPopupVisible.value = false, 2000);
      })
}

onMounted(() => {
  loadGroup()
      .then((g) => group.value = g);

});
</script>

<style scoped lang="scss">
@import "src/styles/variables";

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  li a {
    display: block;
    padding: 12px;
    text-decoration: none;
    color: #111;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

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
    padding: 12px;
    display: flex;
    align-items: center;

    a {
      display: inline-block;
      text-decoration: none;
      color: $dark-blue;
    }

    .controls {
      margin-left: auto;
      display: flex;
      column-gap: 4px;
    }
  }
}

.list-more {
  margin-top: 12px;
  display: inline-block;
  text-decoration: none;
  color: $dark-blue;
  padding: 4px 6px;
  border: 1px solid $dark-blue;
  border-radius: 4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 12px;
}

.grid-item {
  border: 1px solid #ccc;
  padding: 12px;
  text-decoration: none;
  color: $dark-blue;
}

.copy-popup {
  position: fixed;
  top: 60px;
  right: 24px;
  color: black;
  background-color: lighten($yellow, 10%);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  p {
    padding: 0;
    margin: 0;
    max-width: 300px;
  }
}

.copy-link {
  margin: 12px 0;
}
</style>
