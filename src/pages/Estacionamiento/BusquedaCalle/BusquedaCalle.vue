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

const headers: any = ref([
  { title: "ID", key: "id" },
  { title: "Placas", key: "placas" },
  { title: "Calle", key: "calle" },
  { title: "Fecha de ingreso", key: "fechaInicio" },
  { title: "Fecha de salida", key: "fechaFin" },
]);
const desserts: any = ref();
const search = ref("");

function busquedaFilter() {
  estacionamientoUsoService
    .busqueda(search.value)
    .then((response) => {
      desserts.value = response.data.data;

      for (let i = 0; i < desserts.value.length; i++) {
        desserts.value[i].fechaInicio = formatearFecha(
          desserts.value[i].fechaInicio
        );
        desserts.value[i].fechaFin = formatearFecha(desserts.value[i].fechaFin);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function formatearFecha(fechaIso: string): string {
  const fecha = new Date(fechaIso);

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
  const anio = fecha.getFullYear();

  let horas = fecha.getHours();
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  const ampm = horas >= 12 ? "p.m." : "a.m.";
  horas = horas % 12;
  horas = horas ? horas : 12; // las 0 horas es 12 a.m.

  const horasFormateadas = String(horas).padStart(2, "0");

  const final = `${dia}-${mes}-${anio} ${horasFormateadas}:${minutos} ${ampm}`;
  console.log(final);
  return final;
}
</script>
