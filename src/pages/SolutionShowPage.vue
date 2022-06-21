<template>
  <Page title="Просмотр решения">
    <template #header>
      <UserInfo :user="currentUser"/>
    </template>
    <template #aside>
      <Navigation />
    </template>
    <h1>Решение</h1>
    <div class="solution-view">
      <div class="editor-container">
        <CodeMirror ref="codeMirror" />
        <div class="controls">
          <BasicButton type="primary" @click="run">Выполнить</BasicButton>
          <BasicButton type="primary" @click="send">Отправить</BasicButton>
        </div>
      </div>
      <div class="result-container">
        <pre>{{output}}</pre>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import { apiClient } from '~/api';
import { useModel } from '~/composables/useModel';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import UserInfo from '~/components/UserInfo.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import Navigation from '~/components/common/Navigation.vue';
import CodeMirror from '~/components/CodeMirror.vue';
import BasicButton from '~/components/common/BasicButton.vue';
import Timer from '~/components/Timer.vue';

const route = useRoute();
const getSolution = () => apiClient.solutions.getById(route.params.id as string);
const { model: solution, run: loadSolution } = useModel(getSolution);

const {currentUser} = useCurrentUser();

onMounted(() => {
  loadSolution();
})
</script>

<style scoped>

</style>
