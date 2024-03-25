import {createApp} from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import ElementPlus from 'element-plus/lib/index'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')