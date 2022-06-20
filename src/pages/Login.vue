<template>
  <LoginForm
    :errors="errors"
    :submit-button-disabled="isLoading"
    type="login"
    @login="formHandler"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoading } from '~/composables/useLoading';
import { apiClient } from '~/api';
import LoginForm, { LoginEvent } from '~/components/LoginForm.vue';
import { useRouter } from 'vue-router';

const errors = ref<string[]>([]);
let email = '';
let password = ''
const { run: login, isLoading } = useLoading(() => apiClient.users.login(email, password))
const router = useRouter();

const formHandler = (event: LoginEvent) =>  {
  email = event.email;
  password = event.password;
  login()
      .then(() => {
        router.push('/');
      })
}
</script>

<style scoped lang="scss">
.centered-page {

}
</style>
