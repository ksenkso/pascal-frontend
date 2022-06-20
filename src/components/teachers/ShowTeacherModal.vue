<template>
<Modal :visible="visible" @close="close">
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
import { Teacher } from '~/api/users';
defineProps<{
  visible: boolean,
  teacher: Teacher,
  password: string;
}>()
</script>

<style scoped>

</style>
