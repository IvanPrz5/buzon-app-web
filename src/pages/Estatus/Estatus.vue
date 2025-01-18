<template>
  <v-container v-if="!showLoader" width="70vw">
    <div class="d-flex mb-4">
      <h2>Estatus</h2>
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
                <v-btn
                  color="primary"
                  variant="tonal"
                  @click="edit(item)"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="estatusFormDialog" width="400">
      <EstatusForm
        :idEstatus="idEstatus"
        @estatusChange="estatusChange"
      ></EstatusForm>
    </v-dialog>
  </v-container>
  <Loader v-else></Loader>
</template>

<script lang="ts" setup>
import EstatusForm from "@/components/Estatus/EstatusForm.vue";
import { EstatusService } from "@/services/Estatus/Estatus";
import { onMounted, ref } from "vue";

const estatusService = new EstatusService();

const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Descripcion", key: "descripcion" },
  { title: "Opciones", key: "actions" },
]);
const estatusFormDialog = ref(false);
const idEstatus = ref<number | null>(null);
const showLoader = ref(false);

onMounted(() => {
  findAllByStatus();
  //agregar
});

async function findAllByStatus() {
  showLoader.value = true;
  estatusService
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

function estatusChange() {
  estatusFormDialog.value = false;
  findAllByStatus();
}

function agregar() {
  estatusFormDialog.value = true;
  idEstatus.value = null;
}

function edit(item: any) {
  estatusFormDialog.value = true;
  idEstatus.value = item.id;
}
</script>
