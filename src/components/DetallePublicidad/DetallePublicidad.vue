<template>
  <v-card>
    <v-carousel 
      height="300"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="item in desserts.fotosPublicidadList"
        :key="item.id"
        :src="item.content"
        cover
      >
      </v-carousel-item>
    </v-carousel>
    <v-card-item>
      <v-card-title>{{ desserts.titulo }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ desserts.subTitulos	}}</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>
        <div class="text-grey ms-4">4.5 (413)</div>
      </v-row>
      <br />
      <v-divider></v-divider>
      <br />
      <div>{{ desserts.descripcion }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { PublicidadService } from "@/services/Publicidad/PublicidadService";
import { storeApp } from "@/store/app";
import { onMounted, ref } from "vue";

const props = defineProps({
  idPublicidad: {
    type: [Number, null],
    required: true,
  },
});

const appStore = storeApp();

const publicidadService = new PublicidadService();

const desserts: any = ref([]);

onMounted(() => {
  getDetallePublicidaById();
});

function getDetallePublicidaById() {
  if (props.idPublicidad && appStore.usuario) {
    publicidadService
      .findByIdAndEstatusAndIdUsuario(props.idPublicidad, appStore.usuario?.id)
      .then((response) => {
        desserts.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e)
      });
  }
}
</script>
