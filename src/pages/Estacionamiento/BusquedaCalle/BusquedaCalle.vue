<template>
  <v-container>
    <div class="d-flex mb-4">
      <h2>Busqueda</h2>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <v-text-field
        v-model="search"
        label="Número de placas"
        variant="outlined"
        density="compact"
        placeholder="Ingrese el número de placas"
        :rules="[rules.requerido]"
      ></v-text-field>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col cols="12">
        <v-data-table></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { CalleService } from "@/services/Calle/CalleService";
import Rules from "@/utils/Rules/Rules";
import { ref } from "vue";

const rules = new Rules();
const calleService = new CalleService();

const search = ref("");

const busquedaFilter = () => {
    console.log('Hola')
};
</script>
