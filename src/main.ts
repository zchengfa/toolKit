import {createApp} from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import ElementPlus from "element-plus";
import toast from "./components/Toast/toast.ts";
import loading from "./components/Loading/loading.ts";
import './style.css';
const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

//安装自定义插件
app.use(toast)
app.use(loading)

app.mount('#app')