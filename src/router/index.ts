/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Area from '@/pages/Area/Area.vue';
import Estatus from '@/pages/Estatus/Estatus.vue';
import Login from '@/pages/Login/Login.vue';
import Menu from '@/pages/Menu/Menu.vue';
import Publicidad from '@/pages/Publicidad/Publicidad.vue';
import Roles from '@/pages/Roles/Roles.vue';
import Solicitud from '@/pages/Solicitud/Solicitud.vue';
import Usuarios from '@/pages/Usuarios/Usuarios.vue';
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  /* {
    path: "/",
    redirect: "/home",
  }, */
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: () => import("@/layout/Layout.vue"),
    name: "Layout",
    children: [
      {
        path: "/usuarios",
        name: "Usuarios",
        component: Usuarios,
      },
      {
        path: "/areas",
        name: "Areas",
        component: Area,
      },
      {
        path: "/roles",
        name: "Roles",
        component: Roles,
      },
      {
        path: "/estatus",
        name: "Estatus",
        component: Estatus,
      },
      {
        path: "/menus",
        name: "Menus",
        component: Menu,
      },
      {
        path: "/publicidad",
        name: "Publicidad",
        component: Publicidad,
      },
      {
        path: "/solicitud",
        name: "Solicitud",
        component: Solicitud,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") != undefined) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;