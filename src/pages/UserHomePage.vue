<template>
  <component :is="userHomeComponent" />
</template>

<script setup lang="ts">
import StudentHomePage from '~/pages/StudentHomePage.vue';
import TeacherHomePage from '~/pages/TeacherHomePage.vue';
import AdminHomePage from '~/pages/AdminHomePage.vue';
import { useRoleMapping } from '~/composables/useRoleMapping';

const userHomeComponent = useRoleMapping({
  Teacher: TeacherHomePage,
  Student: StudentHomePage,
  Admin: AdminHomePage,
})
</script>

<style scoped>

</style>
