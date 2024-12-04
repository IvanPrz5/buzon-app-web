<template>
  <v-card>
    <v-carousel height="300" hide-delimiter-background>
      <v-carousel-item
        v-for="item in desserts.fotosSolicitudList"
        :key="item.id"
        :src="item.content"
        cover
      >
      </v-carousel-item>
    </v-carousel>
    <v-card-item>
      <v-card-title>{{ desserts.titulo }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">Menu : {{ desserts.nombreMenu }}</span>
        <br />
        <span class="me-1">Area : {{ desserts.descripcionArea }}</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="text-grey">Estado : {{ desserts.estado }}</div>
      </v-row>
      <br />
      <v-divider></v-divider>
      <br />
      <div>{{ desserts.descripcion }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { SolicitudService } from "@/services/Solicitud/SolicitudService";
import { onMounted, ref } from "vue";

const props = defineProps({
  idSolicitud: {
    type: [Number, null],
    required: true,
  },
});

const solicitudService = new SolicitudService();
const desserts: any = ref([]);

onMounted(() => {
  getSolicitudById();
});

function getSolicitudById() {
  if (props.idSolicitud) {
    solicitudService
      .findByIdAndEstatus(props.idSolicitud)
      .then((response) => {
        desserts.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}
</script>
