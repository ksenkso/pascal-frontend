<template>
<Teleport to="#modals">
  <transition name="fade">
    <div @click.stop="close" class="modal-background" v-if="visible">
      <div class="modal-window">
        <div class="modal-header">
          <div class="header-title">
            {{ title }}
          </div>
          <button @click="close" class="close-button">
            <svg class="close-icon" id="cross" viewBox="0 0 16 16"><path d="M14.2929.2929c.3905-.3905 1.0237-.3905 1.4142 0 .3905.3905.3905 1.0237 0 1.4142L9.4142 8l6.2929 6.2929c.3905.3905.3905 1.0237 0 1.4142-.3905.3905-1.0237.3905-1.4142 0L8 9.4142l-6.2929 6.2929c-.3905.3905-1.0237.3905-1.4142 0-.3905-.3905-.3905-1.0237 0-1.4142L6.5858 8 .2928 1.7071C-.0975 1.3166-.0975.6834.2929.293c.3906-.3905 1.0238-.3905 1.4143 0L8 6.5858l6.2929-6.293z"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="!noFooter" class="modal-footer">
          <slot name="footer">
            <BasicButton type="primary" @click="save">Сохранить</BasicButton>
            <BasicButton type="danger" @click="close">Закрыть</BasicButton>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</Teleport>
</template>

<script setup lang="ts">
import BasicButton from '~/components/common/BasicButton.vue';
import { LoginEvent, RegisterEvent } from '~/components/LoginForm.vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  visible: {
    type: Boolean,
    required: false,
  },
  noFooter: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'close'): void;
}>();

const save = () => {
  emit('save');
}

const close = () => {
  emit('close');
}
</script>

<style scoped lang="scss">
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  column-gap: 4px;
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.close-icon {
  width: 16px;
  height: 16px;
  fill: #111;
}
</style>
