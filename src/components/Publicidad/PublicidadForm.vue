<template>
  <v-card>
    <v-card-title>Formulario de Publicidad</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="publicidadForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col cols="6">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="publicidad.titulo"
                  variant="outlined"
                  density="compact"
                  label="Titulo"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="publicidad.subTitulos"
                  variant="outlined"
                  density="compact"
                  label="Subtitulo"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="pb-6">
                <h5>Fecha Inicial</h5>
                <VueDatepicker
                  v-model="publicidad.inicio"
                  class="pr-1"
                  placeholder="Fecha Inicial"
                  :teleport="true"
                  :format="dateUtils.formatDate"
                  :enable-time-picker="false"
                  :start-time="startTime"
                  auto-apply
                  locale="es-MX"
                  :state="publicidad.inicio != null ? true : false"
                  :dark="appStore.theme == 'dark' ? true : false"
                />
              </v-col>
              <v-col cols="6">
                <h5>Fecha Final</h5>
                <VueDatepicker
                  v-model="publicidad.fin"
                  class="pl-1"
                  placeholder="Fecha Final"
                  :teleport="true"
                  :format="dateUtils.formatDate"
                  :enable-time-picker="false"
                  :start-time="endTime"
                  auto-apply
                  locale="es-MX"
                  :state="publicidad.fin != null ? true : false"
                  :dark="appStore.theme == 'dark' ? true : false"
                />
              </v-col>
              <v-col cols="12" class="d-flex">
                <v-autocomplete
                  v-model="idTipoPublicidadAux"
                  item-title="descripcion"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  label="Tipo de Publicidad"
                  :items="tipoPublicidadList"
                  :rules="[rules.requerido]"
                ></v-autocomplete>
                <v-btn color="primary" class="ml-3" @click="open()">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="publicidad.descripcion"
                  variant="outlined"
                  density="compact"
                  label="Descripcion"
                  :rules="[
                    rules.requerido,
                    rules.maximoDeCaracteres(publicidad.descripcion, 500),
                  ]"
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row no-gutters>
              <v-col cols="12" class="pl-5">
                <span class="dragBox">
                  Click aqui para seleccionar archivos
                  <!-- <v-file-input
                  class="pa-1 file"
                  variant="outlined"
                  density="compact"
                  label="Archivos"
                  multiple
                  chips
                  :rules="[rules.requerido]"
                  @change="onChangeFile"
                ></v-file-input> -->
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    :rules="[rules.requerido]"
                    @change="onChangeFile"
                  />
                </span>
                <v-divider class="my-4"></v-divider>
                <div class="cards-img-container">
                  <v-card
                    v-for="(item, i) in arrayFile"
                    :key="i"
                    :prepend-avatar="`${item.content}`"
                    :subtitle="item.nombre"
                    class="card-img mt-2"
                    variant="outlined"
                  >
                    <template v-slot:append>
                      <v-btn variant="text" @click="quitarImagen(item)">
                        <v-icon color="error" icon="mdi-delete"></v-icon>
                      </v-btn>
                    </template>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="mt-5 d-flex justify-end">
            <v-btn color="success" @click="save()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
  <v-dialog v-model="tipoPublicidadFormDialog" width="500">
    <TipoPublicidadForm
      :id-tipo-publicidad="null"
      @tipoPublicidadChange="tipoPublicidadChange"
    ></TipoPublicidadForm>
  </v-dialog>
</template>

<script lang="ts" setup>
import { Publicidad } from "@/classes/Publicidad/Publicidad";
import { storeApp } from "@/store/app";
import Rules from "@/utils/Rules/Rules";
import { onMounted, ref } from "vue";
import TipoPublicidadForm from "../TipoPublicidad/TipoPublicidadForm.vue";
import { TipoPublicidadService } from "@/services/TipoPublicidad/TipoPublicidadService";
import { DateUtils } from "@/utils/DateUtils/DateUtils";
import VueDatepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { PublicidadService } from "@/services/Publicidad/PublicidadService";
import type { TipoPublicidad } from "@/classes/TipoPublicidad/TipoPublicidad";

const props = defineProps({
  idPublicidad: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["publicidadChange"]);

const appStore = storeApp();
const rules = new Rules();
const dateUtils = new DateUtils();

const publicidadService = new PublicidadService();
const tipoPublicidadService = new TipoPublicidadService();

const publicidad = ref<Publicidad>(new Publicidad());
const tipoPublicidadFormDialog = ref(false);
const publicidadForm: any = ref(null);
const tipoPublicidadList = ref([]);
const idTipoPublicidadAux = ref();
const arrayFile: any = ref([]);
const startTime = ref({ hours: 0, minutes: 0 });
const endTime = ref({ hours: 23, minutes: 59 });

onMounted(() => {
  getAllTipoPublicidad();
  if (props.idPublicidad) {
    getDetallePublicidaById();
  }
});

async function getAllTipoPublicidad() {
  tipoPublicidadService
    .findAllByEstatus()
    .then((response) => {
      tipoPublicidadList.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

async function save() {
  const { valid } = await publicidadForm.value.validate();
  if (valid && arrayFile.value.length > 0) {
    if (appStore.usuario) {
      publicidad.value.idUsuario = appStore.usuario;
    }
    publicidad.value.idTipoPublicidad = {
      id: idTipoPublicidadAux.value,
    } as TipoPublicidad;
    publicidad.value.fotosPublicidadList = arrayFile.value;

    const saveOrUpdate = props.idPublicidad
      ? publicidadService.update(publicidad.value)
      : publicidadService.save(publicidad.value);

    saveOrUpdate
      .then(() => {
        emits("publicidadChange");
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function onChangeFile(event: any) {
  const input = event.target;
  let count = input.files.length;
  let index = 0;
  if (input.files) {
    while (count--) {
      const reader = new FileReader();
      const file = input.files[index];
      reader.onload = (e) => {
        arrayFile.value.push({
          content: e.target?.result as string,
          nombre: file.name,
        });
      };
      reader.readAsDataURL(input.files[index]);
      index++;
    }
  }
}

function getDetallePublicidaById() {
  if (props.idPublicidad && appStore.usuario) {
    publicidadService
      .findByIdAndEstatusAndIdUsuario(props.idPublicidad, appStore.usuario?.id)
      .then((response) => {
        Object.assign(publicidad.value, response.data);
        arrayFile.value = response.data.fotosPublicidadList;
        idTipoPublicidadAux.value = response.data.idTipoPublicidad;
      });
  }
}

function quitarImagen(item: any) {
  const index = arrayFile.value.indexOf(item);
  if (index !== -1) {
    arrayFile.value.splice(index, 1);
  }
}

function tipoPublicidadChange() {
  tipoPublicidadFormDialog.value = false;
  getAllTipoPublicidad();
}

function open() {
  tipoPublicidadFormDialog.value = true;
}
</script>

<style scoped>
.dragBox {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  font-weight: bold;
  line-height: 95px;
  color: #999;
  border: 2px dashed #ccc;
  display: inline-block;
  transition: transform 0.3s;
  input[type="file"] {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
  }
}
.card-img {
  border: 1px solid #ccc;
}
.cards-img-container {
  height: 270px;
  overflow-y: auto;
}
</style>
