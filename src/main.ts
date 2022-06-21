import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';
import { defaultConfig, plugin } from '@formkit/vue';
import '@formkit/themes/genesis'

const app = createApp(App);
app.use(plugin, defaultConfig);


app.use(router)

app.mount('#app')
