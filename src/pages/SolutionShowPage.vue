<template>
  <Page title="Просмотр решения">
    <template #header>
      <UserInfo :user="currentUser"/>
    </template>
    <template #aside>
      <Navigation />
    </template>
    <template v-if="solution">
      <h1>{{ solution.task.name }}</h1>
      <p v-html="solution.task.description"></p>
      <h3>Ожидаемый вывод</h3>
      <pre class="expected-result">{{solution.task.expectedResult}}</pre>
    </template>
    <h1 v-if="solution">Решение {{solution.successful ? '(выполнено)' : '(не выполнено)'}}</h1>
    <div class="info-container" v-if="solution">
      <div v-if="solution.messages.length" class="criteria">
        <p style="margin-top: 0;">Критерии:</p>
        <BasicList :list="solution.messages" v-slot="{ item }">
          <span class="list-item-content">{{item}}</span>
        </BasicList>
      </div>
      <div>
        <p class="info">Затраченное время - {{ formatTime(solution.time) }}</p>
        <p class="info">Оценка: {{solution.score}}</p>
      </div>
    </div>
    <div class="solution-view" style="margin-top: 12px;">
      <div class="editor-container">
        <CodeMirror ref="codeMirror" />
      </div>
      <div class="result-container">
        <pre>{{solution && solution.output}}</pre>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import { apiClient } from '~/api';
import { useModel } from '~/composables/useModel';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import UserInfo from '~/components/UserInfo.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import Navigation from '~/components/common/Navigation.vue';
import CodeMirror from '~/components/CodeMirror.vue';
import BasicButton from '~/components/common/BasicButton.vue';
import Timer from '~/components/Timer.vue';
import InlineSpaced from '~/components/common/InlineSpaced.vue';
import { formatTime } from '~/utils';
import BasicList from '~/components/common/BasicList.vue';

const route = useRoute();
const getSolution = () => apiClient.solutions.getById(route.params.id as string);
const { model: solution, run: loadSolution } = useModel(getSolution);
const codeMirror = ref();
const {currentUser} = useCurrentUser();

onMounted(() => {
  loadSolution()
      .then(() => {
        if (codeMirror.value) {
          codeMirror.value.setCode(solution.value!.code);
        }
      })
})
</script>

<style scoped lang="scss">
@import "src/styles/variables";
.info {
  margin: 0;
}

.info-container {
  display: flex;
  column-gap: 1rem;
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
  overflow: auto;

  pre {
    margin: 0;
  }
}
.expected-result {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
