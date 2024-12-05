<template>
  <v-card>
    <v-card-title> Areas de Usuario </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col>
          <v-list>
            <v-list-item
              v-for="item in areasList"
              :key="item.id"
              :subtitle="item.descripcion"
            >
              <template v-slot:prepend>
                <v-list-item-action start>
                  <v-checkbox-btn
                    :model-value="isRoleSelected(item)"
                    @update:model-value="
                      (isChecked) => toggleRole(item, isChecked)
                    "
                  ></v-checkbox-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider></v-divider>
        <v-col class="d-flex justify-end">
          <v-btn color="success" @click="saveUsuarioAreas">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { AreaService } from "@/services/Area/AreaService";
import { UsuarioAreaService } from "@/services/UsuarioArea/UsuarioAreaService";
//import { storeApp } from "@/store/app";
import { onMounted, ref } from "vue";

const props = defineProps({
  idUsuario: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(["areaChange"]);

//const appStore = storeApp();
const areasList: any = ref([]);
const areasSeleccionadas: any = ref([]);
const areasService = new AreaService();
const usuarioAreaService = new UsuarioAreaService();

onMounted(() => {
  getAreasDisponibles();
  getAreasByUsuario();
});

function saveUsuarioAreas() {
  if (props.idUsuario) {
    usuarioAreaService
      .saveUsuarioAreas(props.idUsuario, areasSeleccionadas.value)
      .then(() => {
        emits("areaChange")
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

const isRoleSelected = (role: any) => {
  return areasSeleccionadas.value.some(
    (selected: any) => selected.id === role.id
  );
};

const toggleRole = (area: any, isChecked: any) => {
  if (isChecked) {
    if (
      !areasSeleccionadas.value.some((selected: any) => selected.id === area.id)
    ) {
      areasSeleccionadas.value.push(area);
    }
  } else {
    areasSeleccionadas.value = areasSeleccionadas.value.filter(
      (selected: any) => selected.id !== area.id
    );
  }
};

async function getAreasDisponibles() {
  areasService
    .findAllByEstatus()
    .then((response) => {
      areasList.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

async function getAreasByUsuario() {
  if (props.idUsuario) {
    usuarioAreaService
      .findAllByUsuarioAndStatus(props.idUsuario)
      .then((response) => {
        areasSeleccionadas.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}
</script>
