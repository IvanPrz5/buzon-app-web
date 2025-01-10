<template>
  <v-container class="container-contrasenia">
    <v-card v-if="showContent === true" width="500">
      <v-card-title class="title-card">
        <v-img class="control-candado" src="/candado.gif"></v-img>
        Actualizar contraseña
        <v-card-subtitle>Cambia tu contraseña si la olvidaste</v-card-subtitle>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert
          v-if="showMensageResut == true"
          class="mb-5"
          :text="msg"
          :color="color"
          variant="tonal"
          type="info"
        ></v-alert>
        <v-form ref="contraseniaForm" fast-fail @submit.prevent>
          <v-row v-if="hideForm == false" no-gutters>
            <v-col v-if="newPassword !== confirmPassword" cols="12">
              <v-alert
                class="mb-5"
                text="Las contraseñas no coinciden."
                color="error"
                variant="tonal"
                type="info"
              ></v-alert>
            </v-col>
            <v-col cols="12">
              <span>Nueva Contraseña *</span>
              <v-text-field
                v-model="newPassword"
                placeholder="Nueva Contraseña"
                variant="outlined"
                density="compact"
                :rules="[rules.requerido]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <span>Confirmar Contraseña *</span>
              <v-text-field
                v-model="confirmPassword"
                placeholder="Confirmar Contraseña"
                variant="outlined"
                density="compact"
                :rules="[rules.requerido]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                color="success"
                :disabled="newPassword === confirmPassword ? false : true"
                block
                @click="actualizarContrasenia()"
                >Actualizar</v-btn
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
import { onMounted, ref } from "vue";
import Rules from "@/utils/Rules/Rules";
import { AuthService } from "@/services/Auth/AuthService";
import { SolicitudesContraseñaService } from "@/services/SolicitudesContraseña/SolicitudesContraseñaService";
import router from "@/router";

const props = defineProps({
  id: {
    type: [Number],
    required: true,
  },
  uuid: {
    type: [String],
    required: true,
  },
});

const rules = new Rules();
const authService = new AuthService();
const solicitudesContraseñaService = new SolicitudesContraseñaService();

const contraseniaForm: any = ref(null);
const newPassword = ref("");
const confirmPassword = ref("");
const showContent = ref(false);
const idSolicitud = ref(null);
const idUsuario = ref(null);
const color = ref("");
const msg = ref("");
const loader = ref(false);
const showMensageResut = ref(false);
const hideForm = ref(false);

onMounted(() => {
  hideForm.value = false;
  if (props.id && props.uuid) {
    showContent.value = false;
    solicitudesContraseñaService
      .findByIdAndUuid(props.id, props.uuid)
      .then((response) => {
        if (
          response.data.data.id == props.id &&
          response.data.data.uuid == props.uuid &&
          response.data.data.status == true
        ) {
          showContent.value = true;
          idSolicitud.value = response.data.data.id;
          idUsuario.value = response.data.data.idUsuario;
        } else {
          router.push({ path: "/notFound" });
        }
      })
      .catch(() => {
        router.push({ path: "/notFound" });
      });
  }
});

async function actualizarContrasenia() {
  const { valid } = await contraseniaForm.value.validate();
  if (valid) {
    if (idSolicitud.value && idUsuario.value) {
      showMensageResut.value = false;
      loader.value = true;
      authService
        .cambiarContrasenia(
          idUsuario.value,
          idSolicitud.value,
          newPassword.value
        )
        .then((response) => {
          showMensageResut.value = true;
          if (response.data.messageError) {
            color.value = "error";
            msg.value = response.data.messageError;
          }
          if (response.data.message) {
            color.value = "success";
            msg.value = response.data.message;
            hideForm.value = true;
          }
          contraseniaForm.value.reset();
          loader.value = false;
        })
        .catch(() => {
          loader.value = false;
        });
    }
  }
}
</script>

<style scoped>
@import "CambiarContraseniaForm.css";
</style>
