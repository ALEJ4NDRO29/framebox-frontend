import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'


import { Jwt } from "../common/jwt";
Vue.use(VueRouter)

const loginRequired = ['ProfileViewed', 'ProfileUpdate'];
const loginNotRequired = ['Login', 'Register'];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue'),
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('../views/resources/Resources.vue')
  },
  {
    path: '/resources/:slug',
    name: 'ResourcesDetails',
    component: () => import('../views/resources/ResourcesDetails')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
  },
  {
    path: '/profile/@:nickname',
    name: 'Profile',
    component: () => import('../views/profile/Profile')
  },
  {
    path: '/profile/@:nickname/update',
    name: 'ProfileUpdate',
    component: () => import('../views/profile/ProfileUpdate')
  },
  {
    path: '/profile/viewed',
    name: 'ProfileViewed',
    component: () => import('../views/profile/ProfileViewed')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Usuario NO logueado para acceder
  if (loginNotRequired.includes(to.name) && Jwt.get()) {
    next({ name: 'Home' });
  }

  // Usuario logueado para acceder
  if (loginRequired.includes(to.name) && !Jwt.get()) {
    next({ name: 'Login' });
  }

  next();
});

export default router
