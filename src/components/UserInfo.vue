<template>
  <div class="user-info-wrapper">
    <div v-if="user" class="user-info">
      <div class="user-name">{{ user.name }}</div>
      <div v-if="isTeacher" class="notifications">7</div>
      <BasicButton @click="logout">Выйти</BasicButton>
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script setup lang="ts">
import { apiClient } from '~/api';
import { useRouter } from 'vue-router';
import { User } from '~/api/users';
import BasicButton from '~/components/common/BasicButton.vue';
import { computed } from 'vue';

const props = defineProps<{ user?: User }>()

const router = useRouter();
const logout = () => apiClient.users.logout()
    .then(() => {
      router.push('/login');
    });
const isTeacher = computed(() => {
  return props.user?.roles.includes('teacher');
});
</script>
<style scoped lang="scss">
@import "src/styles/variables";
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  column-gap: 12px;
}

.user-info-wrapper {
  margin-left: auto;
}

.notifications {
  background-color: $orange;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  color: white;
  cursor: pointer;
}
</style>
