<template>
  <v-container width="70vw">
    <div class="d-flex mb-4">
      <h2>Roles</h2>
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
    <v-dialog v-model="rolesFormDialog" width="400">
      <RolesForm :idRol="idRol" @rolesChange="rolesChange"></RolesForm>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import RolesForm from "@/components/Roles/RolesForm.vue";
import { RolesService } from "@/services/Roles/RolesService";
import { onMounted, ref } from "vue";

const rolesService = new RolesService();

const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Descripcion", key: "descripcion" },
  { title: "Opciones", key: "actions" },
]);
const idRol = ref<number | null>(null);
const rolesFormDialog = ref(false);

onMounted(() => {
  findAllByStatus();
});

async function findAllByStatus() {
  rolesService
    .findAllByEstatus()
    .then((response) => {
      desserts.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

function agregar() {
  rolesFormDialog.value = true;
  idRol.value = null;
}

function edit(item: any) {
  rolesFormDialog.value = true;
  idRol.value = item.id;
}

function rolesChange() {
  findAllByStatus();
  rolesFormDialog.value = false;
}
</script>
