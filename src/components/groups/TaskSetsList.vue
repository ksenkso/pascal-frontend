<template>
  <div class="controls">
    <BasicButton @click="showTaskSetForm = true" type="primary">Добавить набор</BasicButton>
  </div>
  <Modal :visible="showTaskSetForm" @close="showTaskSetForm = false" title="Добавление набора задач">
    <FormKit
      type="form"
      v-model="taskSetForm"
      submit-label="Добавить"
      :incomplete-message="false"
      @submit="createTaskSet"
    >
      <FormKit
        type="text"
        name="name"
        label="Название"
        validation="required"
        :validation-messages="reqMsg"
      />
      <FormKit
        type="text"
        name="description"
        label="Описание"
        validation="required"
        :validation-messages="reqMsg"
      />
    </FormKit>
  </Modal>
  <p v-if="isLoading">Загрузка...</p>
  <template v-else>
    <ul class="list">
      <li v-for="taskSet in taskSets" class="list-item">
        <router-link :to="{ name: 'TASK_SET', params: { id: taskSet._id } }">{{taskSet.name}}</router-link>
        <div class="task-set-actions">
          <InlineSpaced>
            <div class="count">
              {{ taskSet.tasks.length }} {{ pluralize(taskSet.tasks.length, 'задача', 'задачи', 'задач') }}
            </div>
            <BasicButton @click="showTaskSetForm = true; taskSetForm = {...taskSet};" type="primary">Редактировать</BasicButton>
            <BasicButton @click="deleteTaskSet(taskSet)" type="danger">Удалить</BasicButton>
          </InlineSpaced>
        </div>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { apiClient } from '~/api';
import { Group } from '~/api/groups';
import { useModel } from '~/composables/useModel';
import { onMounted, ref } from 'vue';
import BasicButton from '~/components/common/BasicButton.vue';
import Modal from '~/components/Modal.vue';
import { ResourceScope } from '~/api/taskSets';
import { pluralize } from '~/utils';
import InlineSpaced from '~/components/common/InlineSpaced.vue';

type TaskSetForm = {
  _id?: string;
  name: string;
  description: string;
};

const props = defineProps<{ group: Group }>()

const showTaskSetForm = ref(false);
const reqMsg = { required: 'Это поле обязательно' }
const taskSetForm = ref<TaskSetForm>({} as TaskSetForm)

const getTaskSets = () => apiClient.taskSets.findForGroup(props.group._id);
const { model: taskSets, run: loadTaskSets, isLoading } = useModel(getTaskSets);
const createTaskSet = () => {
  let request;
  if (!taskSetForm.value._id) {
    request = apiClient.taskSets.create({
      name: taskSetForm.value.name,
      description: taskSetForm.value.description,
      group: props.group._id,
      isPart: true,
      scope: ResourceScope.Group,
    });
  } else {
    request = apiClient.taskSets.update(taskSetForm.value._id, {
      name: taskSetForm.value.name,
      description: taskSetForm.value.description,
    });
  }

  request.then(() => {
    loadTaskSets();
    showTaskSetForm.value = false;
  });
}
onMounted(() => {
  loadTaskSets();
});
</script>

<style scoped lang="scss">
.controls {
  margin: 12px 0;
}
</style>
