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
          <v-divider></v-divider>
          <v-col cols="12" class="mt-5 d-flex justify-end">
            <v-btn color="success" @click="save()">Guardar</v-btn>
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
import { ref } from "vue";

const emits = defineEmits(["tipoPublicidadChange"]);

const rules = new Rules();

const tipoPublicidadService = new TipoPublicidadService();

const tipoPublicidadForm: any = ref(null);
const tipoPublicidad = ref<TipoPublicidad>(new TipoPublicidad());

function save() {
  tipoPublicidadService
    .save(tipoPublicidad.value)
    .then(() => {
      emits("tipoPublicidadChange");
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}
</script>
