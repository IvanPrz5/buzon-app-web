/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Area from '@/pages/Area/Area.vue';
import CambiarContraseniaForm from '@/pages/Contraseña/CambiarContraseniaForm.vue';
import SolicitudChangePasswordForm from '@/pages/Contraseña/SolicitudChangePasswordForm.vue';
import BusquedaCalle from '@/pages/Estacionamiento/BusquedaCalle/BusquedaCalle.vue';
import GenerarQR from '@/pages/Estacionamiento/GenerarQR/GenerarQR.vue';
import Estatus from '@/pages/Estatus/Estatus.vue';
import Login from '@/pages/Login/Login.vue';
import Menu from '@/pages/Menu/Menu.vue';
import NotFound from '@/pages/NotFound/NotFound.vue';
import Publicidad from '@/pages/Publicidad/Publicidad.vue';
import Roles from '@/pages/Roles/Roles.vue';
import Solicitud from '@/pages/Solicitud/Solicitud.vue';
import Usuarios from '@/pages/Usuarios/Usuarios.vue';
import { createRouter, createWebHistory } from 'vue-router/auto'

const estacionamiento = '/estacionamiento';

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
    path: "/cambiar-contrasenia/:idUsuario/:uuid/:id",
    name: "CambiarContrasenia",
    props: true,
    component: CambiarContraseniaForm,
  },
  /* {
    path: "/solicitud-cambio-password",
    name: "SolicitudCambioPassword",
    component: SolicitudChangePasswordForm,
  }, */
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
      {
        path: estacionamiento + '/generar-qr',
        component: GenerarQR
      },
      {
        path: estacionamiento + '/busqueda',
        component: BusquedaCalle
      }
    ],
  },
  {
    path: "/notFound",
    component: NotFound,
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
