<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li v-if="isStudent">
        <router-link :to="{ name: 'STUDENT_SOLUTIONS', params: { studentId: currentUser._id } }">Мои решения</router-link>
      </li>
      <li v-if="isTeacher">
        <router-link to="#">Мои группы</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useCurrentUser } from '~/composables/useCurrentUser';

const { currentUser, isAdmin, isTeacher, isStudent } = useCurrentUser();
</script>

<style scoped lang="scss">
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
</style>
