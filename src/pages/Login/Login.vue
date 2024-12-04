<template>
  <v-container>
    <v-img
      class="mx-auto my-10"
      max-width="250"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="0"
      max-width="448"
      rounded="lg"
    >
      <v-form ref="loginForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col cols="12" class="mb-3">
            <v-text-field
              v-model="usuario.email"
              :rules="[rules.requerido]"
              density="compact"
              label="Email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="usuario.password"
              :rules="[rules.requerido]"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              label="Contraseña"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              @keyup.enter="login"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-btn
        block
        class="mb-5"
        color="primary"
        size="large"
        variant="tonal"
        @click="login"
      >
        Iniciar Sesión
      </v-btn>
      <!-- <v-card-text class="text-center registerLink">
          <a class="text-blue text-decoration-none" rel="noopener noreferrer" @click="register">
            Registrate Aquí <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text> -->
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { Usuario } from "@/classes/Usuarios/Usuarios";
import { AuthService } from "@/services/Auth/AuthService";
import { storeApp } from "@/store/app";
import Rules from "@/utils/Rules/Rules";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authService = new AuthService();
const router = useRouter();
const rules = new Rules();

const usuario = ref<Usuario>(new Usuario());
const loginForm: any = ref(null);
const appStore = storeApp();
const visible = ref(false);

async function login() {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    authService
      .login(usuario.value)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        appStore.setUsuarioState(response.data.data.usuario);
        localStorage.setItem(
          "usuario",
          JSON.stringify(response.data.data.usuario)
        );
        router.push({ path: "/usuarios" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
