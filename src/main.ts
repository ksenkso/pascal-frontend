import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import { routes } from './router';
import { useAuth } from '~/composables/useAuth';
import { plugin, defaultConfig } from '@formkit/vue';
import '@formkit/themes/genesis'

const app = createApp(App);
app.use(plugin, defaultConfig);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const auth = useAuth();

router.beforeEach((to, from, next) => {
  if (!to.meta.private) {
    if (auth.isAuthorized.value && (to.name === 'LOGIN' || to.name === 'REGISTER')) {
      next('/');
    } else {
      next();
    }
    return;
  }

  if (to.meta.private && !auth.isAuthorized.value) {
    next('/login')
  } else {
    next();
  }
})

app.use(router)

app.mount('#app')
