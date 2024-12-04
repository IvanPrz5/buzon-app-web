<template>
  <v-container width="80vw">
    <div class="d-flex mb-4">
      <h2>Solicitud</h2>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <div class="ml-5" style="width: 15%">
        <v-autocomplete
          v-model="idEstatusAux"
          label="Estatus"
          variant="outlined"
          density="compact"
          hide-details
          :items="itemsEstatus"
          item-title="descripcion"
          item-value="id"
        ></v-autocomplete>
      </div>
      <div class="ml-5" style="width: 15%">
        <v-autocomplete
          v-model="idAreaAux"
          label="Áreas Disponibles"
          variant="outlined"
          density="compact"
          hide-details
          :items="itemsArea"
          item-title="descripcion"
          item-value="id"
        ></v-autocomplete>
      </div>
      <div class="ml-2">
        <v-btn color="primary" @click="search">
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
      </div>
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
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list :lines="false" density="compact" nav>
                    <v-list-item @click="openDetallePublicidadDialog(item)">
                      <template v-slot:prepend>
                        <v-icon size="small">mdi-information-outline</v-icon>
                      </template>
                      <v-list-item-title class="list-item">
                        Detalles
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="atenderSolicitud(item)">
                      <template v-slot:prepend>
                        <v-icon size="small">mdi-order-bool-descending-variant</v-icon>
                      </template>
                      <v-list-item-title class="list-item">
                        Atender
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="verHistorialSolicitud(item)">
                      <template v-slot:prepend>
                        <v-icon size="small">mdi-format-list-numbered-rtl</v-icon>
                      </template>
                      <v-list-item-title class="list-item">
                        Historial
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="solicitudesHistoricoDialog" width="700">
      <SolicitudesHistoricoForm
        :idSolicitud="idSolicitud"
        @solicitudHistoricoChange="close()"
      ></SolicitudesHistoricoForm>
    </v-dialog>
    <v-dialog v-model="detalleSolicitudDialog" width="700">
      <DetalleSolicitud :idSolicitud="idSolicitud"></DetalleSolicitud>
    </v-dialog>
    <v-dialog v-model="solicitudHistoricoListDialog" width="1100">
      <SolicitudesHistoricoList :idSolicitud="idSolicitud"></SolicitudesHistoricoList>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { SolicitudService } from "@/services/Solicitud/SolicitudService";
import SolicitudesHistoricoForm from "@/components/SolicitudesHistorico/SolicitudesHistoricoForm.vue";
import { UsuarioAreaService } from "@/services/UsuarioArea/UsuarioAreaService";
import { storeApp } from "@/store/app";
import DetalleSolicitud from "@/components/Solicitud/DetalleSolicitud.vue";
import SolicitudesHistoricoList from "@/components/SolicitudesHistorico/SolicitudesHistoricoList.vue";
import { EstatusService } from "@/services/Estatus/Estatus";

const solicitudService = new SolicitudService();
const usuarioAreaService = new UsuarioAreaService();
const estatusService = new EstatusService();

const appStore = storeApp();
const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Descripcion", key: "descripcion" },
  { title: "Estado", key: "estado" },
  { title: "Menu", key: "nombreMenu" },
  { title: "Fecha", key: "fechaGenera" },
  { title: "Opciones", key: "actions" },
]);
const solicitudesHistoricoDialog = ref(false);
const idSolicitud = ref(null);
const itemsArea = ref([]);
const itemsEstatus = ref([]);
const idAreaAux = ref(null);
const idEstatusAux = ref(null);
const detalleSolicitudDialog = ref(false);
const solicitudHistoricoListDialog = ref(false);

onMounted(() => {
  findAllAreaByUsuario();
  findAllEstatus();
});

async function findAllAreaByUsuario() {
  if (appStore.usuario) {
    usuarioAreaService
      .findAllByUsuarioAndStatus(appStore.usuario.id)
      .then((response) => {
        itemsArea.value = response.data;
        idAreaAux.value = response.data[0].id;
        findAllEstatus();
      })
      .catch((e) => {
        console.log("Fatal " + e);
      })
      .finally(() => {
        if (idAreaAux.value && idEstatusAux.value) {
          findAllByIdUsuarioAndIdEstatusAndIdArea(idAreaAux.value, idEstatusAux.value);
        }
      });
  }
}

function search(){
  findAllByIdUsuarioAndIdEstatusAndIdArea(idAreaAux.value, idEstatusAux.value);
}

async function findAllByIdUsuarioAndIdEstatusAndIdArea(idArea: any, idEstatus: any) {
  if (appStore.usuario) {
    solicitudService
      .findAllByIdUsuarioAndIdEstatusAndIdAreaAndStatus(appStore.usuario.id, idEstatus, idArea)
      .then((response) => {
        desserts.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

async function findAllEstatus(){
  estatusService.findAllByEstatus()
    .then((response) => {
      itemsEstatus.value = response.data;
      idEstatusAux.value = response.data[0].id;
    })
    .catch((e) => {
      console.log("Fatal " + e)
    })
}

function atenderSolicitud(item: any) {
  solicitudesHistoricoDialog.value = true;
  idSolicitud.value = item.id;
}

function close() {
  solicitudesHistoricoDialog.value = false;
  findAllByIdUsuarioAndIdEstatusAndIdArea(idAreaAux.value, idEstatusAux.value);
}

function openDetallePublicidadDialog(item: any){
  detalleSolicitudDialog.value = true;
  idSolicitud.value = item.id;
}

function verHistorialSolicitud(item: any){
  solicitudHistoricoListDialog.value = true;
  idSolicitud.value = item.id;
}
</script>
