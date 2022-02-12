import { createApp } from "vue";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import App from "./App.vue";
import "./index.css";
import router from "./router/router";

createApp(App).use(router).mount("#app");
