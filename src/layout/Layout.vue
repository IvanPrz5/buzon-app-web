<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>APPLICATION</v-toolbar-title> -->
      <v-app-bar-title>Panel General</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        icon="mdi-theme-light-dark"
        @click="darkMode"
      ></v-btn>
      <v-btn variant="text" icon="mdi-logout" @click="cerrarSesion"></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" permanent>
      <v-list>
        <v-list-item
          prepend-avatar="/usuario.png"
          :title="appStore.usuario?.nombre"
          :subtitle="appStore.usuario?.username"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        v-if="ROLE_BZN_ADMIN == true || SUPER_ADMIN == true"
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Usuarios"
          to="/usuarios"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-key"
          title="Roles"
          to="/roles"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-animation"
          title="Areas"
          to="/areas"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-bullhorn-variant"
          title="Tipo Publicidad"
          to="/tipoPublicidad"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-state-machine"
          title="Estatus"
          to="/estatus"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-menu"
          title="Menu"
          to="/menus"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-bullhorn"
          title="Publicidad"
          to="/publicidad"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-text-box"
          title="Solicitud"
          to="/solicitud"
        ></v-list-item>
        <!-- <v-list-group v-if="roleAdmin == true">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-account-cog" title="Configuracion General"></v-list-item>
            </template>
            <v-list-item prepend-icon="mdi-account" title="Usuarios" to="/usuarios"></v-list-item>
          </v-list-group> -->
        <!-- {{ appStore.usuario.role }} -->
      </v-list>
      <v-list
        v-if="ROLE_ESTACIONAMIENTO_ADMIN == true || SUPER_ADMIN == true"
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-qrcode"
          title="Generar QR"
          to="/estacionamiento/generar-qr"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-magnify"
          title="Busqueda"
          to="/estacionamiento/busqueda"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";
import { storeApp } from "@/store/app";

const appStore = storeApp();
const router = useRouter();
const theme = useTheme();

const drawer = ref(true);
const SUPER_ADMIN = ref(false);
const ROLE_ESTACIONAMIENTO_ADMIN = ref(false);
const ROLE_BZN_ADMIN = ref(false);

onBeforeMount(() => {
  const token = localStorage.getItem("token");
  if (token == null) {
    router.push({ path: "/login" });
  } else {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      appStore.setUsuarioState(JSON.parse(usuario));
      getRole();
    }
  }
});

function darkMode() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  localStorage.setItem("theme", theme.global.name.value);
  appStore.setThemeState(
    JSON.stringify(localStorage.getItem("theme")).replaceAll('"', "")
  );
}

function cerrarSesion() {
  localStorage.clear();
  router.push({ path: "/login" });
}

function getRole() {
  const usuarioRol = appStore.usuario;
  if (usuarioRol?.role) {
    for (let i = 0; i < usuarioRol.role.length; i++) {
      if (usuarioRol.role[i].descripcion === "SUPER_ADMIN") {
        SUPER_ADMIN.value = true;
      }
      if (usuarioRol.role[i].descripcion === "ROLE_ESTACIONAMIENTO_ADMIN") {
        ROLE_ESTACIONAMIENTO_ADMIN.value = true;
      }
      if (usuarioRol.role[i].descripcion === "ROLE_BZN_ADMIN") {
        ROLE_BZN_ADMIN.value = true;
      }
    }
  }
}
</script>
