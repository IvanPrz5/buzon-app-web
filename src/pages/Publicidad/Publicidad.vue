<template>
  <v-container v-if="!showLoader" fluid width="90vw">
    <div class="d-flex mb-4">
      <h2>Publicidad</h2>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <v-btn color="success" @click="agregar()">Agregar</v-btn>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col
        v-for="item in desserts"
        :key="item.id"
        cols="12"
        sm="12"
        md="4"
        xl="3"
      >
        <v-card min-height="460" outlined>
          <!-- <v-img
            height="250"
            :src="`data:image/png;base64,${item.fotoPublicidad}`"
            cover
          ></v-img> -->
          <v-img height="250" :src="item.fotoPublicidad" cover></v-img>
          <v-card-item>
            <v-card-title>{{ item.titulo }}</v-card-title>
            <v-card-subtitle>
              <span class="me-1">{{ item.subTitulos }}</span>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>Tipo de publicidad: {{ item.tipoPublicidad }}</div>
            </v-row>
            <br />
            <div>{{ item.descripcion.substr(0, 100) + "..." }}</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn color="primary" variant="outlined" @click="edit(item)">
              Editar
            </v-btn>
            <v-btn
              color="success"
              variant="outlined"
              @click="openPublicidadDetalleDialog(item)"
            >
              Mostrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="publicidadFormDialog" width="850">
      <PublicidadForm
        :idPublicidad="idPublicidad"
        @publicidadChange="publicidadChange"
      ></PublicidadForm>
    </v-dialog>
    <v-dialog v-model="publicidadDetalleDialog" width="650">
      <DetallePublicidad :idPublicidad="idPublicidad"></DetallePublicidad>
    </v-dialog>
  </v-container>
  <Loader v-else></Loader>
</template>

<script lang="ts" setup>
import DetallePublicidad from "@/components/DetallePublicidad/DetallePublicidad.vue";
import Loader from "@/components/Loader/Loader.vue";
import PublicidadForm from "@/components/Publicidad/PublicidadForm.vue";
import { PublicidadService } from "@/services/Publicidad/PublicidadService";
import { storeApp } from "@/store/app";
import { onMounted, ref } from "vue";

const publicidadService = new PublicidadService();

const appStore = storeApp();
const desserts: any = ref([]);
const publicidadFormDialog = ref(false);
const publicidadDetalleDialog = ref(false);
const idPublicidad = ref(null);
const showLoader = ref(false);

onMounted(() => {
  findAllByStatus();
});

async function findAllByStatus() {
  if (appStore.usuario) {
    showLoader.value = true;
    publicidadService
      .findAllByStatus()
      .then((response) => {
        desserts.value = response.data;
        showLoader.value = false;
      })
      .catch((e) => {
        console.log("Fatal " + e);
        showLoader.value = false;
      });
  }
}

function openPublicidadDetalleDialog(item: any) {
  publicidadDetalleDialog.value = true;
  idPublicidad.value = item.id;
}

function publicidadChange() {
  publicidadFormDialog.value = false;
  findAllByStatus();
}

function agregar() {
  publicidadFormDialog.value = true;
  idPublicidad.value = null;
}

function edit(item: any) {
  publicidadFormDialog.value = true;
  idPublicidad.value = item.id;
}
</script>
