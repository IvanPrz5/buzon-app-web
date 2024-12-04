<template>
  <v-card>
    <v-card-title> Historial de Solicitudes </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table
        v-model:expanded="expanded"
        :headers="headers"
        :items="desserts"
        item-value="id"
        show-expand
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Expandable Table</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:expanded-row="{ item }">
          <tr>
            <td class="img-container-table">
              <!-- @vue-ignore -->
              <div v-for="img in item.fotosSolicitudesHistorico" :key="img.id">
                <img :src="img.content" width="100" height="100" cover>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { SolicitudesHistoricoService } from "@/services/SolicitudesHistorico/SolicitudesHistoricoService";
import { onMounted, ref } from "vue";

const props = defineProps({
  idSolicitud: {
    type: [Number, null],
    required: true,
  },
});

const solicitudHistoricoService = new SolicitudesHistoricoService();
const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Descripcion", key: "descripcion" },
  { title: "Estatus", key: "estatus" },
  { title: "Fecha", key: "fechaRegistro" },
  { title: "Opciones", key: "actions" },
]);
const expanded = ref([]);

onMounted(() => {
  getSolicitudHistoricoById();
});

function getSolicitudHistoricoById() {
  if (props.idSolicitud) {
    solicitudHistoricoService
      .findByIdSolicitud(props.idSolicitud)
      .then((response) => {
        desserts.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}
</script>

<style>
.img-container-table{
  display: flex;
  gap: 10px;
}
</style>