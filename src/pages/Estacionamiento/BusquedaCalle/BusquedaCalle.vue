<template>
  <v-container>
    <div class="d-flex mb-4">
      <h2>Busqueda</h2>
      <v-spacer></v-spacer>
      <!-- <v-divider inset vertical></v-divider> -->
      <v-text-field
        v-model="search"
        label="Número de placas"
        variant="outlined"
        density="compact"
        placeholder="Ingrese el número de placas"
        append-inner-icon="mdi-magnify"
        :rules="[rules.requerido]"
        @click:append-inner="busquedaFilter()"
      ></v-text-field>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col cols="12">
        <v-data-table :items="desserts" :headers="headers"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { EstacionamientoUsoService } from "@/services/EstacionamientoUso/EstacionamientoUsoService";
import Rules from "@/utils/Rules/Rules";
import { ref } from "vue";

const rules = new Rules();
const estacionamientoUsoService = new EstacionamientoUsoService();

const headers = ref([
  { text: "ID", value: "id" },
  { text: "Placas", value: "placas" },
  { text: "Calle", value: "calle" },
  { text: "Fecha de ingreso", value: "fechaInicio" },
  { text: "Fecha de salida", value: "fechaFin" },
  { text: "Acciones", value: "actions", sortable: false },
]);
const desserts: any = ref([]);
const search = ref("");

const busquedaFilter = () => {
  estacionamientoUsoService.busqueda(search.value)
    .then((response) => {
      desserts.value.push(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
