<template>
  <v-container width="70vw">
    <div class="d-flex mb-4">
      <h2>Usuarios</h2>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col>
        <v-card>
          <v-card-text>
            <v-data-table :items="desserts" :headers="headers">
              <template v-slot:[`item.actions`]="{ item }">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      class="me-2 text-none"
                      color="primary"
                      variant="tonal"
                      v-bind="props"
                    >
                      <v-icon> mdi-dots-horizontal </v-icon>
                    </v-btn>
                  </template>
                  <v-list :lines="false" density="compact" nav>
                    <v-list-item @click="editarUsuario(item)">
                      <template v-slot:prepend>
                        <v-icon size="small">mdi-pencil</v-icon>
                      </template>
                      <v-list-item-title class="list-item"
                        >Editar</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item @click="editarRoles(item)">
                      <template v-slot:prepend>
                        <v-icon size="small">mdi-account-key</v-icon>
                      </template>
                      <v-list-item-title class="list-item"
                        >Roles</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item @click="editarAreas(item)">
                      <template v-slot:prepend>
                        <v-icon size="small">mdi-animation</v-icon>
                      </template>
                      <v-list-item-title class="list-item"
                        >Areas</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="usuariosFormDialog" width="500">
    <UsuariosForm
      :idUsuario="idUsuario"
      @usuarioChange="usuarioChange"
    ></UsuariosForm>
  </v-dialog>
  <v-dialog v-model="usuarioRolFormDialog" width="500">
    <UsuarioRolList :idUsuario="idUsuario"></UsuarioRolList>
  </v-dialog>
  <v-dialog v-model="usuarioAreaDialog" width="500">
    <AreaList :idUsuario="idUsuario"></AreaList>
  </v-dialog>
</template>

<script lang="ts" setup>
import AreaList from "@/components/Area/AreaList.vue";
import UsuarioRolList from "@/components/UsuarioRol/UsuarioRolList.vue";
import UsuariosForm from "@/components/Usuarios/UsuariosForm.vue";
import { UsuariosService } from "@/services/Usuarios/UsuariosService";
import { onMounted, ref } from "vue";

const usuariosService = new UsuariosService();

const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Nombre", key: "nombre" },
  { title: "Apellidos", key: "apPaterno" },
  { title: "Email", key: "email" },
  { title: "Opciones", key: "actions" },
]);
const usuariosFormDialog = ref(false);
const idUsuario = ref();
const usuarioRolFormDialog = ref(false);
const usuarioAreaDialog = ref(false);

onMounted(() => {
  getUsuarios();
});

async function getUsuarios() {
  usuariosService
    .findAll()
    .then((response) => {
      desserts.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

function editarUsuario(item: any) {
  usuariosFormDialog.value = true;
  idUsuario.value = item.id;
}

function editarRoles(item: any) {
  usuarioRolFormDialog.value = true;
  idUsuario.value = item.id;
}

function editarAreas(item: any) {
  usuarioAreaDialog.value = true;
  idUsuario.value = item.id;
}

function usuarioChange() {
  usuariosFormDialog.value = false;
  getUsuarios();
}

/* function areaChange(){
  usuarioAreaDialog.value = false;
  getUsuarios();
} */
</script>

<style>
.list-item {
  cursor: pointer;
}
</style>
