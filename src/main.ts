import {createApp} from "vue";
import App from "./App.vue";
import {createPinia} from "pinia";
import ElementPlus from 'element-plus/lib/index'
import toast from "../Components/Toast/toast";
import loading from "../Components/Loading/loading";

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

//安装自定义插件
app.use(toast)
app.use(loading)

app.mount('#app')