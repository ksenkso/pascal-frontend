<template>
  <Page title="Решение задачи">
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
    <template v-if="task">
      <h1>{{ task.name }}</h1>
      <p v-html="task.description"></p>
      <h3>Ожидаемый вывод</h3>
      <pre class="expected-result">{{task.expectedResult}}</pre>
    </template>
    <div class="solution-view">
      <div class="editor-container">
        <CodeMirror ref="codeMirror" />
        <div class="controls">
          <Timer @tick="time = $event" :is-running="isRunning" />
          <BasicButton type="primary" @click="run">Выполнить</BasicButton>
          <BasicButton type="primary" @click="send">Отправить</BasicButton>
        </div>
      </div>
      <div class="result-container">
        <pre>{{output}}</pre>
      </div>
    </div>
    <Modal :visible="resultVisible" @close="resultVisible = false" :title="resultTitle">
      <StarRating :rating="average" />
      <BasicList :list="solutionResult.messages" v-slot="{ item }">
        <div class="list-item-content">{{item}}</div>
      </BasicList>
      <template #footer>
        <BasicButton type="primary" @click="goToTasks">К задачам</BasicButton>
        <BasicButton type="danger" @click="resultVisible = false; isRunning = true;">Закрыть</BasicButton>
      </template>
    </Modal>
  </Page>
</template>

<script setup lang="ts">

import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import CodeMirror from '~/components/CodeMirror.vue';
import { computed, onMounted, ref } from 'vue';
import BasicButton from '~/components/common/BasicButton.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import { useModel } from '~/composables/useModel';
import { apiClient } from '~/api';
import { useRoute, useRouter } from 'vue-router';
import Modal from '~/components/Modal.vue';
import { SolutionAssessmentResult } from '~/api/solutions';
import BasicList from '~/components/common/BasicList.vue';
import StarRating from '~/components/StarRating.vue';
import Timer from '~/components/Timer.vue';

const { currentUser } = useCurrentUser();
const route = useRoute();
const getTask = () => apiClient.tasks.getById(route.params.taskId as string);
const { model: task, run: loadTask } = useModel(getTask);

const codeMirror = ref<typeof CodeMirror | null>(null);
const output = ref('');
const average = ref(0);
const messages = ref<string[]>([]);
const resultVisible = ref(false);
const solutionResult = ref({} as SolutionAssessmentResult);

const resultTitle = computed(() => {
  if (resultVisible.value) {
    return 'Результат';
  }
  return 'Загрузка...';
});

onMounted(() => {
  loadTask();
  if (codeMirror.value) {
    codeMirror.value.getCode()
  }
});

const time = ref(0);
const isRunning = ref(true);

const router = useRouter();

const run = () => {
  isRunning.value = false;
  if (codeMirror.value) {
    const code = codeMirror.value.getCode();
    apiClient.solutions.checkSolution({
      code,
      student: currentUser.value!._id,
      task: task.value!._id,
      time: time.value,
    })
        .then(result => {
          console.log(result);
          solutionResult.value = result;
          output.value = result.output;

          if (result.successful) {
            setTimeout(() => {
              average.value = result.average;
            }, 500)
            messages.value = result.messages;
            resultVisible.value = true;
          }
        })
  }
}
const send = () => {}
const goToTasks = () => {
  resultVisible.value = false;
  router.push({ name: 'TASK_SET', params: { id: task.value!.taskSet._id } })
}

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
