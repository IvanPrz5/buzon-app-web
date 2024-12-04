<template>
  <v-container>
    <div class="d-flex mb-4">
      <h2 v-if="titleMenu === ''">Menus</h2>
      <h2 v-else>{{ titleMenu }}</h2>
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
        <v-card min-height="440" outlined>
          <div class="gif-container">
            <img height="250" :src="item.archivo.content" />
          </div>
          <v-card-item>
            <v-card-title>
              {{ item.nombre }}
            </v-card-title>
            <v-card-subtitle>
              <span class="me-1">Menu ID : {{ item.id }}</span>
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div>Ranking</div>
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                size="small"
                half-increments
                readonly
              ></v-rating>
              <div class="text-grey ms-4">4.5 (958)</div>
            </v-row>
            <br />
            <div>{{ item.descripcion.substr(0, 100) + "..." }}</div>
          </v-card-text>
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-actions class="justify-end">
            <v-btn variant="outlined" color="primary" @click="edit(item.id)"
              >Editar</v-btn
            >
            <v-btn
              variant="outlined"
              color="success"
              @click="findSubMenusByIdMenuRelacion(item.nombre, item.id)"
              >Ver</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="menuFormDialog" width="800">
      <MenuForm
        :idNewMenu="idNewMenu"
        :idEditMenu="idEditMenu"
        @menuChange="menuChange()"
      ></MenuForm>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { MenuService } from "@/services/Menu/MenuService";
import MenuForm from "@/components/Menu/MenuForm.vue";

const menuService = new MenuService();

const menuFormDialog = ref(false);
const desserts: any = ref([]);
const idNewMenu = ref<number | null>(null);
const idEditMenu = ref<number | null>(null);
const titleMenu = ref("");

onMounted(() => {
  if (!idNewMenu.value) {
    findAllByStatus();
  }
});

async function findAllByStatus() {
  menuService
    .findAllByEstatus()
    .then((response) => {
      desserts.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

function findSubMenusByIdMenuRelacion(nombreMenu: string, id: number) {
  menuService
    .findSubMenusByIdMenuRelacion(id)
    .then((response) => {
      idNewMenu.value = id;
      desserts.value = response.data;
      if (nombreMenu != "") {
        titleMenu.value = titleMenu.value + "/" + nombreMenu;
      }
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

function menuChange() {
  menuFormDialog.value = false;
  if (!idNewMenu.value) {
    findAllByStatus();
  } else {
    findSubMenusByIdMenuRelacion("", idNewMenu.value);
  }
}

function edit(id: number) {
  menuFormDialog.value = true;
  idEditMenu.value = id;
}

function agregar() {
  menuFormDialog.value = true;
  idEditMenu.value = null;
}
</script>

<style>
.gif-container {
  background-color: transparent !important;
  display: flex;
  justify-content: center;
}

.gif-container img {
  mix-blend-mode: multiply;
  display: block;
}
</style>
