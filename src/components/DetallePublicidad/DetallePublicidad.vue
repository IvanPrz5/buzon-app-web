<template>
  <v-card>
    <swiper
      ref="mySwiper"
      :modules="[Navigation, Pagination]"
      :slides-per-view="1"
      :space-between="10"
      pagination
      navigation
      class="mySwiper"
      @swiper="setSwiperInstance"
    >
      <swiper-slide v-for="item in desserts.fotosPublicidadList" :key="item.id">
        <img class="img-carrousel-control" :src="item.content" />
      </swiper-slide>
      <!-- Controles del carrusel -->
      <div class="swiper-pagination"></div>
    </swiper>
    <!-- <v-carousel height="300" hide-delimiter-background>
      <v-carousel-item
        v-for="item in desserts.fotosPublicidadList"
        :key="item.id"
        cover
      >
      <img :src="item.content">
      </v-carousel-item>
    </v-carousel> -->
    <v-card-item>
      <v-card-title>{{ desserts.titulo }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ desserts.subTitulos }}</span>
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
import { onMounted, ref } from "vue";
import { storeApp } from "@/store/app";
import { PublicidadService } from "@/services/Publicidad/PublicidadService";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperInstance } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";

const props = defineProps({
  idPublicidad: {
    type: [Number, null],
    required: true,
  },
});

const appStore = storeApp();
const publicidadService = new PublicidadService();

const desserts: any = ref([]);
const mySwiper = ref<SwiperInstance | null>(null);

onMounted(() => {
  getDetallePublicidaById();
});

const setSwiperInstance = (swiper: SwiperInstance) => {
  mySwiper.value = swiper;
};

function getDetallePublicidaById() {
  if (props.idPublicidad && appStore.usuario) {
    publicidadService
      .findByIdAndEstatusAndIdUsuario(props.idPublicidad, appStore.usuario?.id)
      .then((response) => {
        desserts.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}
</script>

<style scooped>
.mySwiper {
  height: 100%;
  width: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.img-carrousel-control {
  max-width: 40%;
  max-height: 40%;
}

/* .swiper-pagination-bullet-active {
  background-color: #fff;
} */
</style>
