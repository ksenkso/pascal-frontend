<template>
  <Page>
    <div class="centered-page">
      <div class="login-form">
        <div class="header">
          {{ formTitle }}
        </div>
        <div class="controls">
          <div v-if="type === 'register'" class="control">
            <label for="name">Имя</label>
            <input type="text" id="name" v-model="name">
          </div>
          <div class="control">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email">
          </div>
          <div class="control">
            <label for="password">Пароль</label>
            <input type="password" id="password" v-model="password">
          </div>
          <div v-if="type === 'register'" class="control">
            <label for="password-repeat">Пароль повторно</label>
            <input type="password" id="password-repeat" v-model="passwordConfirmation">
          </div>
        </div>
        <div class="footer">
          <div v-if="errors.length" class="errors">
            <div v-for="error in errors" class="error">{{ error }}</div>
          </div>
          <div class="buttons">
            <BasicButton
                @click="onMainActionClick"
                :disabled="submitButtonDisabled"
            >
              {{ mainActionText }}
            </BasicButton>
            <BasicButton
                @click="onSecondaryActionClick"
                :disabled="submitButtonDisabled"
            >
              {{ secondaryActionText }}
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import BasicButton from '../components/common/BasicButton.vue';
import Page from '~/components/common/Page.vue';
import { useRouter } from 'vue-router';

type Props = {
  submitButtonDisabled: boolean;
  type: 'login' | 'register';
  errors: string[];
}

const props = defineProps<Props>()

export type LoginEvent = { email: string, password: string };
export type RegisterEvent = LoginEvent & { name: string, passwordConfirmation: string };

const emit = defineEmits<{
  (e: 'login', data: LoginEvent): void;
  (e: 'register', data: RegisterEvent): void;
}>();

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const router = useRouter();

const formTitle = computed(() => {
  return props.type === 'login'
    ? 'Вход на сайт'
    : 'Регистрация';
});

const onMainActionClick = () => {
  if (props.type === 'login') {
    emit('login', { email: email.value, password: password.value });
  } else {
    emit('register', {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value
    });
  }
}

const mainActionText = computed(() => {
  return props.type === 'login'
    ? 'Войти'
    : 'Зарегистрироваться';
});

const secondaryActionText = computed(() => {
  return props.type === 'login'
    ? 'Зарегистрироваться'
    : 'Войти';
});

const onSecondaryActionClick = () => {
  if (props.type === 'login') {
    router.push('/register-student');
  } else {
    router.push('/login');
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/variables";

.centered-page {
  max-width: 800px;
  margin: 40px auto;
}
.login-form {
  border: 2px solid $orange;
  border-radius: 4px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
}

.controls {
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.control {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  column-gap: 12px;
  width: 300px;
}

.errors {
  margin-bottom: 8px;
  color: #7c2c2c;
}

.buttons {
  display: flex;
  column-gap: 8px;
  justify-content: center;
}

button {
  background-color: $orange;
  color: white;
}
</style>
