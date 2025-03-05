import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '@/views/Home/Home.vue'
import Article from '@/views/Article/Article.vue'
import AddArticle from '@/views/Article/AddArticle.vue'
import UpdateArticle from '@/views/Article/UpdateArticle.vue'
import Login from '@/views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/add-article',
      name: 'addarticle',
      component: AddArticle,
    },
    {
      path: '/update-article/:id',
      name: 'updatearticle',
      component: UpdateArticle,
    }
  ]
})

export default router
