<template>
  <Modal :visible="visible" title="Добавить учителя" @save="save" @close="close" no-footer>
    <FormKit
      :disabled="groupsLoading"
      type="form"
      v-model="formData"
      submit-label="Сохранить"
      @submit="save"
      :incomplete-message="false"
    >
      <FormKit
        type="text"
        name="name"
        label="Имя"
        validation="required"
        validation-visibility="submit"
        :validation-messages="{ required: 'Обязательное поле' }"
      />
      <FormKit
        type="email"
        name="email"
        label="Email"
        validation="required"
        validation-visibility="submit"
        :validation-messages="{ required: 'Обязательное поле' }"
      />
      <FormKit
        type="password"
        name="password"
        label="Пароль"
        validation="required"
        validation-visibility="submit"
        :validation-messages="{ required: 'Обязательное поле' }"
      />
      <FormKit
        type="select"
        name="groupIds"
        multiple
        label="Группы"
        :options="groups.map(g => ({ label: g.name, value: g._id }))"
      />
    </FormKit>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/Modal.vue';
import { onMounted, ref } from 'vue';
import { apiClient } from '~/api';
import { useLoading } from '~/composables/useLoading';
import { Group } from '~/api/groups';
import { CreateUserDto } from '~/api/users';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'close'): void;
}>();
const formData = ref<CreateUserDto>({} as CreateUserDto);
const groups = ref<Group[]>([]);
const getGroups = () => apiClient.groups.getAll().then(g => {
  groups.value = g;
});
const { isLoading: groupsLoading, run: loadGroups } = useLoading(getGroups)
onMounted(() => {
  loadGroups();
})

const save = () => {
  const dto: CreateUserDto = formData.value
  apiClient.auth.registerTeacher(dto).then(() => {
    emit('save');
    emit('close');
  });
};

const close = () => {
  emit('close');
};
</script>

<style lang="scss">
.form-group {
  label {
    margin-bottom: 4px;
    display: block;
  }
}

.form-control {
  padding: 4px;
  width: 100%;
}
</style>
