import { createApp } from "vue";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import App from "./App.vue";
import "./index.css";
import router from "./router/router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
