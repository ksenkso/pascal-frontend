<template>
  <Page title="Решение задачи">
    <template #header>
      <UserInfo :user="{ name: 'Петров П.' }"/>
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
    <h1>Задача 1</h1>
    <p>
      Пользователь вводит два числа. Одно присваивается одной переменной, а второе -
      другой. Необходимо поменять значения переменных так, чтобы значение первой
      оказалось во второй, а второй - в первой.
    </p>
    <div class="solution-view">
      <div class="editor-container">
        <CodeMirror ref="codeMirror" />
        <div class="controls">
          <BasicButton type="primary" @click="run">Выполнить</BasicButton>
          <BasicButton type="primary" @click="send">Отправить</BasicButton>
        </div>
      </div>
      <div class="result-container">
        <pre>
Введите два числа:
4 6
Первое число: 6
Второе число: 4
        </pre>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import CodeMirror from '~/components/CodeMirror.vue';
import { onMounted, ref } from 'vue';
import BasicButton from '~/components/common/BasicButton.vue';

const codeMirror = ref<typeof CodeMirror | null>(null);
onMounted(() => {
  if (codeMirror.value) {
    codeMirror.value.getCode()
  }
})

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
.solution-view {
  display: flex;
  column-gap: 18px;
}
.editor-container, .result-container {
  flex: 1;
}

.editor-container .controls {
  display: flex;
  margin-top: 12px;
  column-gap: 4px;
  justify-content: flex-end;
  border-top: 1px solid #e5e5e5;
  padding-top: 12px;
}

.result-container {
  border: 1px solid #ccc;
  padding: 8px;

  pre {
    margin: 0;
  }
}

</style>
