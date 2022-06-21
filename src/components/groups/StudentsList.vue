<template>
  <p v-if="studentsLoading">Загрузка...</p>
  <template v-else>
    <ul class="list">
      <li v-for="student in students" class="list-item">
        <a href="#">{{student.name}}</a>
        <InlineSpaced>
          <BasicButton type="primary">Решения</BasicButton>
          <BasicButton type="danger">Удалить</BasicButton>
        </InlineSpaced>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { Student } from '~/api/users';
import { apiClient } from '~/api';
import { useLoading } from '~/composables/useLoading';
import { Group } from '~/api/groups';
import BasicButton from '~/components/common/BasicButton.vue';
import InlineSpaced from '~/components/common/InlineSpaced.vue';

const props = defineProps<{ group: Group }>()

const students = ref<Student[] | undefined>();
const getStudents = () => apiClient.groups.getStudents(props.group._id);
const { isLoading: studentsLoading, run: loadStudents } = useLoading(getStudents);

onMounted(() => {
  loadStudents()
      .then((s) => students.value = s);
})

</script>

<style scoped>

</style>
