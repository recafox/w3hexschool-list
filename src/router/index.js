import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authors from '../views/Authors.vue'
import Articles from '../views/Articles.vue'
import About from '../views/About.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/articles',
    name: 'Article',
    component: Articles,

  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
    
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
 

]

const router = new VueRouter({
  routes
});
export default router
