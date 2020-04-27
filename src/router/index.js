import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'


import { Jwt } from "../common/jwt";
Vue.use(VueRouter)

const loginRequired = [
  'ProfileViewed',
  'ProfileUpdate',
  'ResourcesConfigure',
  'ResourcesCreate',
  'List',
  'ListsCreate',
  'ListConfigure'
];
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
  // RESOURCES
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
    path: '/create/resources',
    name: 'ResourcesCreate',
    component: () => import('../views/resources/ResourcesCreate')
  },
  {
    path: '/resources/:slug/configure',
    name: 'ResourcesConfigure',
    component: () => import('../views/resources/ResourcesConfigure')
  },
  // AUTH
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
  // PROFILE
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
  // LISTS
  {
    path: '/lists',
    name: 'List',
    component: () => import('../views/list/List')
  },
  {
    path: '/lists/:slug',
    name: 'ListDetails',
    component: () => import('../views/list/ListDetails')
  },
  {
    path: '/lists/:slug/configure',
    name: 'ListConfigure',
    component: () => import('../views/list/ListConfigure')
  },
  {
    path: '/create/lists',
    name: 'ListsCreate',
    component: () => import('../views/list/ListCreate')
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
