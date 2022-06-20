<template>
  <LoginForm
    :errors="errors"
    :submit-button-disabled="isLoading"
    type="register"
    @register="formHandler"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoading } from '~/composables/useLoading';
import { apiClient } from '~/api';
import LoginForm, { RegisterEvent } from '~/components/LoginForm.vue';
import { useRoute, useRouter } from 'vue-router';

const groupId = useRoute().query.groupId as string || undefined;
const errors = ref<string[]>([]);

let email = '';
let name = '';
let password = ''
let passwordConfirmation = ''

const { run: login, isLoading } = useLoading(() => apiClient.users.registerStudent({
  email,
  password,
  groupId,
  name,
}))
const router = useRouter();

const formHandler = (event: RegisterEvent) =>  {
  errors.value = [];
  email = event.email;
  name = event.name;
  password = event.password;
  passwordConfirmation = event.passwordConfirmation

  if (password !== passwordConfirmation) {
    errors.value.push('Пароли не совпадают');
  }

  if (!errors.value.length) {
    login()
        .then(() => {
          router.push('/');
        })
  }
}
</script>
