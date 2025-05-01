<template>
  <v-card>
    <v-card-title>Formulario de Tipo Publicidad</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="tipoPublicidadForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="tipoPublicidad.descripcion"
              variant="outlined"
              density="compact"
              label="Descripcion"
              :rules="[rules.requerido]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="iconAux"
              :hint="iconAux != null ? '' : 'Requerido'"
              label="Icono"
              prepend-icon="mdi-camera"
              variant="outlined"
              density="compact"
              accept="image/png, image/gif, image/jpeg"
              required
            ></v-file-input>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="mt-5 d-flex justify-end">
            <v-btn color="success" @click="saveTipoPublicidad()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { TipoPublicidad } from "@/classes/TipoPublicidad/TipoPublicidad";
import { TipoPublicidadService } from "@/services/TipoPublicidad/TipoPublicidadService";
import Rules from "@/utils/Rules/Rules";
import { onMounted, ref } from "vue";

const props = defineProps({
  idTipoPublicidad: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["tipoPublicidadChange"]);

const rules = new Rules();

const tipoPublicidadService = new TipoPublicidadService();

const tipoPublicidadForm: any = ref(null);
const tipoPublicidad = ref<TipoPublicidad>(new TipoPublicidad());
const iconAux: any = ref();

onMounted(() => {
  findById();
});

function saveTipoPublicidad() {
  tipoPublicidadService
    .saveTipoPublicidad(iconAux.value, tipoPublicidad.value)
    .then(() => {
      emits("tipoPublicidadChange");
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

function findById() {
  if (props.idTipoPublicidad) {
    tipoPublicidadService
      .findByIdAndEstatus(props.idTipoPublicidad)
      .then((response) => {
        tipoPublicidad.value = response.data;
        iconAux.value = {
          name: tipoPublicidad.value.nombreIcon,
        };
      });
  }
}
</script>
