<template>
  <Page title="Домашняя страница">
    <template #header>
      <UserInfo :user="currentUser" />
    </template>
    <h1>Список учителей</h1>
    <div class="loader" v-if="teachersLoading">
      Загрузка...
    </div>
    <ControlledTable v-else :columns="teachersColumns" :rows="teachers" :show-table="!teachersLoading">
      <template #controls>
        <BasicButton type="primary" @click="createTeacherModalVisible = true">Добавить учителя</BasicButton>
      </template>
      <template #row="{ data }">
        <td>{{ data.name }}</td>
        <td>
          <router-link v-for="group in data.groups" :to="`/groups/${group._id}`">{{ group.name }}</router-link>
        </td>
        <td>
          <InlineSpaced :style="{ justifyContent: 'flex-end', width: '100%' }">
            <BasicButton type="primary" @click="editTeacher(data)">Редактировать</BasicButton>
            <BasicButton type="danger" @click="deleteTeacher(data)">Удалить</BasicButton>
          </InlineSpaced>
        </td>
      </template>
    </ControlledTable>
    <CreateTeacherModal
      :visible="createTeacherModalVisible"
      @close="createTeacherModalVisible = false"
      @save="showCreatedTeacherInfo"
    />

    <h1>Список групп</h1>
    <h1>Список курсов</h1>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Page from '~/components/common/Page.vue';
import UserInfo from '~/components/UserInfo.vue';
import { useCurrentUser } from '~/composables/useCurrentUser';
import { apiClient } from '~/api';
import { CreateUserDto, Role, Teacher } from '~/api/users';
import { useLoading } from '~/composables/useLoading';
import BasicButton from '~/components/common/BasicButton.vue';
import ControlledTable from '~/components/ControlledTable.vue';
import InlineSpaced from '~/components/common/InlineSpaced.vue';
import CreateTeacherModal from '~/components/teachers/CreateTeacherModal.vue';

const { currentUser, loadUser } = useCurrentUser()

const teachers = ref<Teacher[] | undefined>();
const getTeachers = () => apiClient.users.findByRole(Role.Teacher, { with: ['groups'] }).then(users => {
  teachers.value = users;
});
const { isLoading: teachersLoading, run: loadTeachers } = useLoading(getTeachers);

const createTeacherModalVisible = ref(false);
const teachersColumns = [
  {
    title: 'Имя',
    value: 'name',
    width: '40%',
  },

  {
    title: 'Список групп',
    value: 'groups',
    render: (teacher: Teacher) => teacher.groups.map(group => group.name).join(', '),
  },
  {
    title: 'Действия',
    width: '20%',
  }
];

const showTeacherInfo = ref(false);
const teacherInfo = ref<CreateUserDto | undefined>();
const showCreatedTeacherInfo = (dto: CreateUserDto) => {
  showTeacherInfo.value = true;
  teacherInfo.value = dto;
};

onMounted(() => {
  loadUser();
  loadTeachers();

});
</script>

<style scoped lang="scss">

</style>
