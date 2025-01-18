<template>
  <v-container class="container-contrasenia">
    <v-card width="500">
      <v-card-title class="title-card">
        <v-img class="control-candado" src="/detective.gif"></v-img>
        Confirma que eres tú.
        <v-card-subtitle>Enviaremos la solicitud a tu email.</v-card-subtitle>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="solicitudChangeForm" fast-fail @submit.prevent>
          <v-row no-gutters>
            <v-col v-if="showAlert == true" cols="12">
              <v-alert
                class="mb-5"
                :text="msg"
                :color="color"
                variant="tonal"
                type="info"
              ></v-alert>
            </v-col>
            <v-col cols="12">
              <span>Email *</span>
              <v-text-field
                v-model="email"
                variant="outlined"
                density="compact"
                placeholder="Ingrese email"
                :rules="[rules.requerido]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                color="success"
                block
                @click="generarSolicitudCambioPassword()"
                >Enviar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
  <v-dialog v-model="loader">
    <Loader></Loader>
  </v-dialog>
</template>

<script lang="ts" setup>
import Loader from "@/components/Loader/Loader.vue";
import { AuthService } from "@/services/Auth/AuthService";
import Rules from "@/utils/Rules/Rules";
import { ref } from "vue";

const authService = new AuthService();
const rules = new Rules();

const solicitudChangeForm: any = ref(null);
const showAlert: any = ref(false);
const email = ref("");
const color = ref("");
const msg = ref("");
const loader = ref(false);

async function generarSolicitudCambioPassword() {
  const { valid } = await solicitudChangeForm.value.validate();
  if (valid) {
    showAlert.value = false;
    loader.value = true;
    authService
      .generarSolicitudCambioPassword(email.value)
      .then((response) => {
        showAlert.value = true;
        if(response.data.messageError){
          color.value = "error";
          msg.value = response.data.messageError;
        }
        if(response.data.message){
          color.value = "success";
          msg.value = response.data.message;
        }
        loader.value = false;
      })
      .catch(() => {
        loader.value = false;
      });
  }
}
</script>

<style scoped>
@import "SolicitudChangePasswordForm.css";
</style>
