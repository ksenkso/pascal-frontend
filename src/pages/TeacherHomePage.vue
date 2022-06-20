<template>
  <Page title="Домашняя страница">
    <template #header>
      <UserInfo :user="currentUser"/>
    </template>
    <template #aside>
      <nav>
        <ul>
          <li>
            <a href="#">Главная</a>
          </li>
          <li>
            <a href="#">Мои задачи</a>
          </li>
          <li>
            <a href="#">Мои предметы</a>
          </li>
          <li>
            <a href="#">Мои подписки</a>
          </li>
          <li>
            <a href="#">Мои преподаватели</a>
          </li>
        </ul>
      </nav>
    </template>
    <h1>Мои группы</h1>
    <ul class="list">
      <li class="list-item">
        <router-link to="/groups/1">7 "А"</router-link>
      </li>
      <li class="list-item">
        <router-link to="/groups/2">7 "Б"</router-link>
      </li>
      <li class="list-item">
        <router-link to="/groups/3">7 "В"</router-link>
      </li>
    </ul>
    <h1>Мои курсы</h1>
    <ul class="list">
      <li class="list-item">
        <router-link to="/groups/1">Основы языка Паскаль</router-link>
      </li>
      <li class="list-item">
        <router-link to="/groups/2">Решение типовых задач</router-link>
      </li>
      <li class="list-item">
        <router-link to="/groups/3">Подготовка к олимпиадам</router-link>
      </li>
    </ul>
    <h1>Мои задачи</h1>
    <div class="grid">
      <div v-for="item in 8" class="grid-item">
        <router-link to="/tasks/1">Задача {{ item }}</router-link>
      </div>
    </div>
    <a href="#" class="list-more">Все задачи</a>
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
  max-width: 300px;

  .list-item {
    border: 1px solid #ccc;

    a {
      display: block;
      padding: 12px;
      text-decoration: none;
      color: $dark-blue;
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

.join-requests {
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;

  thead {
    th {
      padding: 12px;
      text-align: left;
    }
  }
  tbody {
    tr {
      td {
        padding: 12px;
        text-align: left;

        input[type="checkbox"] {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
