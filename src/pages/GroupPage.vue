<template>
  <Page title="Группы">
    <template #header>
      <UserInfo :user="{ name: 'Иванов И.' }"/>
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
    <h1>Группа 7 "А"</h1>
    <ul class="list">
      <li v-for="name in names" class="list-item">
        <a href="#">{{name}}</a>
        <div class="controls">
          <BasicButton type="primary">Решения</BasicButton>
          <BasicButton type="danger">Удалить</BasicButton>
        </div>
      </li>
    </ul>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import BasicButton from '~/components/common/BasicButton.vue';

const names = [
  'Зимина Анна',
  'Ильин Руслан',
  'Савицкий Максим',
  'Денисова Ольга',
  'Титова Виктория',
  'Федорова Елизавета',
  'Тарасов Роберт',
  'Алексеев Кирилл',
  'Максимов Лев',
  'Крючкова Елизавета',
].sort()
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
</style>
