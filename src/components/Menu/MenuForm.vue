<template>
  <v-card>
    <v-card-title> Formulario de Menu </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="menuForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col v-if="props.idEditMenu" class="d-flex justify-end" cols="12">
            <v-switch
              v-model="menu.status"
              label="Status"
              color="primary"
              hide-details
              inset
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="menu.nombre"
                  variant="outlined"
                  density="compact"
                  label="Nombre"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="menu.descripcion"
                  variant="outlined"
                  density="compact"
                  label="Descripcion"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  v-model="menu.ruta"
                  variant="outlined"
                  density="compact"
                  label="Ruta"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col> -->
              <v-col cols="12">
                <v-text-field
                  v-model="menu.orden"
                  variant="outlined"
                  density="compact"
                  label="Orden"
                  :rules="[rules.requerido, rules.numero]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="idAreaAux"
                  item-title="descripcion"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  label="Area"
                  :items="itemsArea"
                  :rules="[rules.requerido]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="iconAux"
                  label="Icono"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  density="compact"
                  accept="image/png, image/gif, image/jpeg"
                  required
                  @change="onFileChange"
                ></v-file-input>
                <!-- <v-text-field
                  v-model="menu.icon"
                  variant="outlined"
                  density="compact"
                  label="Icon"
                  :rules="[rules.requerido]"
                ></v-text-field> -->
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-color-picker
                  v-model="menu.color"
                  hide-inputs
                ></v-color-picker>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="menu.color"
                  variant="plain"
                  class="centered-input"
                  placeholder="Seleccione el color"
                  readonly
                  disabled
                  hint="Walsdladksn"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-end pt-3">
            <v-btn v-if="props.idEditMenu" color="primary" @click="reset()"
              >Limpiar</v-btn
            >
            <v-btn class="ml-2" color="success" @click="save()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Menu } from "@/classes/Menu/Menu";
import { MenuService } from "@/services/Menu/MenuService";
import Rules from "@/utils/Rules/Rules";
import { AreaService } from "@/services/Area/AreaService";
import { onMounted, ref } from "vue";
import { Area } from "@/classes/Area/Area";

const props = defineProps({
  idNewMenu: {
    type: [Number, null],
    required: true,
  },
  idEditMenu: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["menuChange"]);

const rules = new Rules();
const menuService = new MenuService();
const menu = ref<Menu>(new Menu());
const areaService = new AreaService();
const itemsArea = ref([]);

const menuForm: any = ref(null);
const iconAux: any = ref();
const iconB64: any = ref();
const idAreaAux: any = ref();

onMounted(() => {
  findById();
  getAreas();
});

async function findById() {
  if (props.idEditMenu) {
    menuService
      .findByIdAndEstatus(props.idEditMenu)
      .then((response) => {
        Object.assign(menu.value, response.data);
        iconAux.value = {
          name: response.data.archivo.nombre,
        };
        idAreaAux.value = response.data.area.id;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

async function save() {
  const { valid } = await menuForm.value.validate();
  if (valid) {
    if (props.idNewMenu) {
      menu.value.idMenuRelacion = { id: props.idNewMenu } as Menu;
    }
    if (iconB64.value) {
      menu.value.idIcon = {
        content: iconB64.value,
        nombre: iconAux.value.name,
      } as any;
    }
    menu.value.idArea = { id: idAreaAux.value } as Area;

    const saveOrUpdate = props.idEditMenu
      ? menuService.update(menu.value)
      : menuService.save(menu.value);

    saveOrUpdate
      .then(() => {
        emits("menuChange");
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function getAreas() {
  areaService
    .findAllByEstatus()
    .then((response) => {
      console.log(response.data);
      itemsArea.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal" + e);
    });
}

function reset() {
  //menu.value = new Menu();
  menuForm.value.reset();
}

function onFileChange() {
  if (!iconAux.value) return;
  console.log(iconAux.value);
  const reader = new FileReader();
  reader.onload = (e: any) => {
    iconB64.value = e.target.result;
  };
  reader.readAsDataURL(iconAux.value);
}
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
.centered-input >>> .v-messages__message {
  text-align: center;
  color: red;
}
</style>
