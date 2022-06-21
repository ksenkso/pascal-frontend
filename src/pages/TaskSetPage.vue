<template>
  <Page :title="title">
    <template #header>
      <UserInfo :user="currentUser"/>
    </template>
    <template #aside>
      <Navigation />
    </template>
    <h1>{{title}}</h1>
    <template v-if="!taskSet">
      Загрузка...
    </template>
    <template v-else>
      <div v-if="isTeacher || isAdmin" class="controls">
        <BasicButton type="primary" @click="showTaskForm = true">Добавить задачу</BasicButton>
      </div>
      <BasicList v-if="taskSet.tasks.length" :list="taskSet.tasks" v-slot="{ item, index }">
        <span class="list-item-content" v-if="isStudent">{{ item.name }}</span>
        <span v-else class="list-item-content">{{ item.name }}</span>
        <div class="controls">
          <InlineSpaced v-if="isTeacher || isAdmin">
            <BasicButton type="primary" @click="fillForm(item); showTaskForm = true">Редактировать</BasicButton>
            <BasicButton type="danger" @click="removeTask(item)">Удалить</BasicButton>
          </InlineSpaced>
          <BasicButton v-else-if="canStart(item, index)" type="primary" @click="$router.push({ name: 'SOLUTION_PAGE', params: { taskId: item._id } })">Начать выполнение</BasicButton>
        </div>
      </BasicList>
      <p v-else>
        Нет задач
      </p>
    </template>
    <Modal full-screen :visible="showTaskForm" @close="showTaskForm = false" no-footer :title="formTitle">
      <FormKit type="form" v-model="taskForm" submit-label="Добавить" :incomplete-message="false" @submit="createTask">
        <FormKit
          type="text"
          name="name"
          label="Название"
          validation="required"
          :validation-messages="reqMsg"
        />
        <FormKit
          type="textarea"
          rows="5"
          label="Описание"
          name="description"
          validation="required"
          :validation-messages="reqMsg"
        />
        <FormKit
          type="textarea"
          rows="5"
          label="Ожидаемый результат"
          name="expectedResult"
          validation="required"
          :validation-messages="reqMsg"
        />
        <h3>Критерии</h3>
        <div class="loc">
          <FormKit
            type="number"
            step="1"
            min="1"
            name="linesForFive"
            label="На 5"
            validation="required"
            :validation-messages="reqMsg"
          />
          <FormKit
            type="number"
            step="1"
            min="1"
            name="linesForFour"
            label="На 4"
            validation="required"
            :validation-messages="reqMsg"
          />
          <FormKit
            type="number"
            step="1"
            min="1"
            name="linesForThree"
            label="На 3"
            validation="required"
            :validation-messages="reqMsg"
          />
        </div>
        <FormKit
          type="text"
          label="Код должен содержать"
          name="codeContains"
        />
      </FormKit>
    </Modal>
  </Page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useModel } from '~/composables/useModel';
import { apiClient } from '~/api';
import { useRoute } from 'vue-router';
import { useCurrentUser } from '~/composables/useCurrentUser';
import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import BasicList from '~/components/common/BasicList.vue';
import BasicButton from '~/components/common/BasicButton.vue';
import { CreateTaskDto, SerializedAssessmentData, Task } from '~/api/tasks';
import Modal from '~/components/Modal.vue';
import InlineSpaced from '~/components/common/InlineSpaced.vue';
import Navigation from '~/components/common/Navigation.vue';
import { getCompletedTasks, removeCompletedTask } from '~/utils';

type TaskForm = {
  name: string;
  description: string;
  expectedResult: string;
  linesForFive: number;
  linesForFour: number;
  linesForThree: number;
  codeContains: string;
}

const reqMsg = { required: 'Это поле обязательно' }

const { currentUser, isAdmin, isTeacher, isStudent } = useCurrentUser();

const route = useRoute();
const getTaskSet = () => apiClient.taskSets.getById(route.params.id as string);
const { model: taskSet, isLoading, run: loadTaskSet } = useModel(getTaskSet)
const completedTasks = ref([] as string[])

onMounted(() => {
  loadTaskSet()
      .then(() => {
        completedTasks.value =  getCompletedTasks(taskSet.value!)
      });
});

const showTaskForm = ref(false);
const taskForm = ref<TaskForm>({} as TaskForm);
const currentTask = ref<Task | null>(null);
const formTitle = computed(() => {
  if (currentTask.value) {
    return `Редактирование задачи "${currentTask.value.name}"`;
  }

  return 'Добавление задачи';
})

const createTask = () => {
  const { linesForFour, linesForFive, linesForThree, codeContains, name, expectedResult, description } = taskForm.value;
  const taskDto: CreateTaskDto & { assessments: SerializedAssessmentData[] } = {
    name,
    description,
    expectedResult,
    assessments: [],
    taskSet: taskSet.value!._id,
  };

  if (codeContains) {
    taskDto.assessments.push({
      type: 'ContainsTextAssessment',
      constructorArguments: [codeContains],
    })
  }

  const lines = {
    5: linesForFive,
    4: linesForFour,
    3: linesForThree,
  }
  taskDto.assessments.push({
    type: 'NumberOfLinesAssessment',
    constructorArguments: [lines],
  });

  let request;
  if (currentTask.value) {
    request = apiClient.tasks.update(currentTask.value._id, taskDto);
  } else {
    request = apiClient.tasks.create(taskDto);
  }

  request.then(() => {
    showTaskForm.value = false;
    loadTaskSet();
  });
}

const fillForm = (item: Task) => {
  currentTask.value = item;
  const newFormValue: any = {
    name: item.name,
    description: item.description,
    expectedResult: item.expectedResult,
  }
  const codeContains = item.assessments.find(a => a.type === 'ContainsTextAssessment')?.constructorArguments[0];
  const lines = item.assessments.find(a => a.type === 'NumberOfLinesAssessment')?.constructorArguments[0];
  if (codeContains) {
    newFormValue.codeContains = codeContains;
  }
  if (lines) {
    newFormValue.linesForFive = lines[5];
    newFormValue.linesForFour = lines[4];
    newFormValue.linesForThree = lines[3];
  }

  taskForm.value = newFormValue;
}

const removeTask = (task: Task) => {
  apiClient.tasks.delete(task._id)
      .then(() => {
        removeCompletedTask(task);
        taskSet.value!.tasks.splice(taskSet.value!.tasks.indexOf(task), 1);
      })
}

const title = computed(() => {
  if (taskSet.value) {
    return `Набор задач "${taskSet.value.name}"`;
  }
  return 'Набор задач';
});

const canStart = (task: Task, index: number) => {
  if (index === 0) return true;

  if (!taskSet.value) return false;

  return completedTasks.value.includes(taskSet.value.tasks[index - 1]._id);
}
</script>

<style scoped lang="scss">
.loc {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 8px;
  max-width: 300px;
}

.controls {
  margin: 12px 0;
}
</style>
