<template>
  <v-card>
    <v-card-title>Atender Solicitud</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="solicitudesHistoricoForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col cols="6">
            <v-row no-gutters>
              <v-col class="d-flex" cols="12">
                <v-autocomplete
                  v-model="idEstatusAux"
                  variant="outlined"
                  density="compact"
                  label="Estatus"
                  :items="itemsEstatus"
                  item-title="descripcion"
                  item-value="id"
                  :rules="[rules.requerido]"
                ></v-autocomplete>
                <v-btn class="ml-2" color="primary" @click="open()">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="solicitudHistorico.descripcion"
                  variant="outlined"
                  density="compact"
                  label="Descripcion"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row no-gutters>
              <v-col cols="12" class="pl-5">
                <span class="dragBox">
                  Click aqui para seleccionar archivos
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    @change="onChangeFile"
                  />
                </span>
                <v-divider class="my-4"></v-divider>
                <div class="cards-img-container">
                  <v-card
                    v-for="(item, i) in arrayFile"
                    :key="i"
                    :prepend-avatar="`${item.content}`"
                    :subtitle="`Image ${i + 1}`"
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
          <v-col class="mt-5 d-flex justify-end" cols="12">
            <v-btn color="success" @click="save()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
  <v-dialog v-model="estatusDialog" width="500">
    <EstatusForm :idEstatus="null" @estatusChange="estatusChange"></EstatusForm>
  </v-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { SolicitudesHistoricoService } from "@/services/SolicitudesHistorico/SolicitudesHistoricoService";
import EstatusForm from "../Estatus/EstatusForm.vue";
import { EstatusService } from "@/services/Estatus/Estatus";
import Rules from "@/utils/Rules/Rules";
import { SolicitudHistorico } from "@/classes/SolicitudHistorico/SolicitudHistorico";
import type { Estatus } from "@/classes/Estatus/Estatus";
import { storeApp } from "@/store/app";
import type { Usuario } from "@/classes/Usuarios/Usuarios";

const props = defineProps({
  idSolicitud: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["solicitudHistoricoChange"]);

const appStore = storeApp();
const rules = new Rules();
const solicitudesHistoricoForm: any = ref(null);
const solicitudesHistoricoService = new SolicitudesHistoricoService();
const estatusService = new EstatusService();
const solicitudHistorico = ref<SolicitudHistorico>(new SolicitudHistorico());

const arrayFile: any = ref([]);
const estatusDialog = ref(false);
const itemsEstatus = ref([]);
const idEstatusAux = ref();
//const tieneHistorico = ref(false);

onMounted(() => {
  getAllEstatus();
  // getSolicitudHistorico();
});

async function getAllEstatus() {
  estatusService
    .findAllByEstatus()
    .then((response) => {
      itemsEstatus.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

/* async function getSolicitudHistorico(){
  if(props.idSolicitud){
    solicitudesHistoricoService.findByIdSolicitud(props.idSolicitud)
      .then((response) => {
        if(response.data.length > 0){
          Object.assign(solicitudHistorico.value, response.data[0])
          idEstatusAux.value = response.data[0].idEstatus;
          tieneHistorico.value = true;
        }else{
          tieneHistorico.value = false;
        }
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
  }
} */

async function save() {
  const { valid } = await solicitudesHistoricoForm.value.validate();
  if (valid) {
    if (appStore.usuario) {
      solicitudHistorico.value.idEstatus = {
        id: idEstatusAux.value,
      } as Estatus;
      solicitudHistorico.value.idUsuario = {
        id: appStore.usuario.id,
      } as Usuario;
      solicitudHistorico.value.idSolicitud = { id: props.idSolicitud };

      solicitudHistorico.value.fotosHistoricoList = arrayFile.value;

      // tieneHistorico.value
      // ? solicitudesHistoricoService.update(solicitudHistorico.value)
      const saveOrUpdate = solicitudesHistoricoService.save(
        solicitudHistorico.value
      );

      saveOrUpdate
        .then(() => {
          emits("solicitudHistoricoChange");
        })
        .catch((e) => {
          console.log("Fatal " + e);
        });
    }
  }
}

function onChangeFile(event: any) {
  const input = event.target;
  let count = input.files.length;
  let index = 0;
  if (input.files) {
    while (count--) {
      const reader = new FileReader();
      //const file = input.files[index];
      reader.onload = (e) => {
        arrayFile.value.push({
          content: e.target?.result as string,
          //name: file.name,
        });
      };
      reader.readAsDataURL(input.files[index]);
      index++;
    }
  }
}

function quitarImagen(item: any) {
  const index = arrayFile.value.indexOf(item);
  if (index !== -1) {
    arrayFile.value.splice(index, 1);
  }
}

function estatusChange() {
  estatusDialog.value = false;
  getAllEstatus();
}

function open() {
  estatusDialog.value = true;
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
  overflow-y: auto;
}
</style>
