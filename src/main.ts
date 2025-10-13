import { createApp } from "vue";
import App from "@/App.vue";
// 重制样式表
import "@/styles/reset.css";
// 全局样式表
import "@/styles/global.scss";
import { createPinia } from "pinia";

const pipia = createPinia();

const app = createApp(App);
app.use(pipia);
app.mount("#app");