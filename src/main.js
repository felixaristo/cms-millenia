import { createApp } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@/assets/css/style.css'
import App from './App.vue'
import router from './router'
import VueSocialChat from 'vue-social-chat'
import 'vue-social-chat/dist/style.css'
import Footer from './views/Components/Footer.vue'
import Menu from './views/Components/Menu.vue'
// import VueWhatsappWidget from 'vue-whatsapp-widget/dist/'
// components: {
//     VueWhatsappWidget
// }
// import wysiwyg from "vue-wysiwyg";

const app = createApp(App)
app.use(VueSocialChat)
// app.use(wysiwyg);
// app.use(VueWhatsappWidget)
app.component('Footer', Footer)
app.component('Menu', Menu)
app.use(router)
app.use(createBootstrap()) // Important
app.mount('#app')
