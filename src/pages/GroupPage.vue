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
    <template v-if="!groupLoading && studentsLoading">
      Загрузка...
    </template>
    <div class="copy-link">
      <BasicButton @click="copyGroupLink" type="primary">Скопировать ссылку</BasicButton>
    </div>
    <template v-if="students">
      <ul class="list">
        <li v-for="student in students" class="list-item">
          <a href="#">{{student.name}}</a>
          <div class="controls">
            <BasicButton type="primary">Решения</BasicButton>
            <BasicButton type="danger">Удалить</BasicButton>
          </div>
        </li>
      </ul>
    </template>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import BasicButton from '~/components/common/BasicButton.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import { onMounted, ref } from 'vue';
import { Group } from '~/api/groups';
import { apiClient } from '~/api';
import { useRoute } from 'vue-router';
import { useLoading } from '~/composables/useLoading';
import { Student } from '~/api/users';
import FadeTransition from '~/components/common/FadeTransition.vue';
import { copyTextToClipboard } from '~/utils';

const { currentUser } = useCurrentUser();
const route = useRoute();
const group = ref<Group | undefined>();
const getGroup = () => apiClient.groups.getById(route.params.id as string);
const { isLoading: groupLoading, run: loadGroup } = useLoading(getGroup);

const students = ref<Student[] | undefined>();
const getStudents = () => apiClient.groups.getStudents(route.params.id as string);
const { isLoading: studentsLoading, run: loadStudents } = useLoading(getStudents);

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
  loadStudents()
      .then((s) => students.value = s);
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
