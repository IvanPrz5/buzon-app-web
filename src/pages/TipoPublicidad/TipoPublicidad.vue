<template>
  <v-container v-if="!showLoader" width="70vw">
    <div class="d-flex mb-4">
      <h2>Tipo Publicidad</h2>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <v-btn color="success" @click="agregar()">Agregar</v-btn>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table :items="desserts" :headers="headers">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="primary" variant="tonal" @click="edit(item)">
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="tipoPublicidadFormDialog" width="400">
      <TipoPublicidadForm
        :idTipoPublicidad="idTipoPublicidad"
        @tipoPublicidadChange="tipoPublicidadChange"
      ></TipoPublicidadForm>
    </v-dialog>
  </v-container>
  <Loader v-else></Loader>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { TipoPublicidadService } from "@/services/TipoPublicidad/TipoPublicidadService";
import TipoPublicidadForm from "@/components/TipoPublicidad/TipoPublicidadForm.vue";

const tipoPublicidadService = new TipoPublicidadService();

const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Descripcion", key: "descripcion" },
  { title: "Opciones", key: "actions" },
]);
const showLoader = ref(false);
const tipoPublicidadFormDialog = ref(false);
const idTipoPublicidad = ref(null);

onMounted(() => {
  findAllByStatus();
});

async function findAllByStatus() {
  showLoader.value = true;
  tipoPublicidadService
    .findAllByEstatus()
    .then((response) => {
      desserts.value = response.data;
      showLoader.value = false;
    })
    .catch((e) => {
      console.log("Fatal " + e);
      showLoader.value = false;
    });
}

function tipoPublicidadChange() {
  tipoPublicidadFormDialog.value = false;
  findAllByStatus();
}

function agregar() {
  tipoPublicidadFormDialog.value = true;
  idTipoPublicidad.value = null;
}

function edit(item: any) {
  tipoPublicidadFormDialog.value = true;
  idTipoPublicidad.value = item.id;
}
</script>
