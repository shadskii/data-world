import { createApp } from 'vue'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import App from './App.vue'
import './index.css'


createApp(App).use(VueChartkick).mount('#app')
