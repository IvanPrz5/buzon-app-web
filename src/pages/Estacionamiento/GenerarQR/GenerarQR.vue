<template>
  <v-container>
    <div class="d-flex mb-4">
      <h2>Generar QR</h2>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <v-btn color="primary" @click="openFormCalle()">Agregar Calle</v-btn>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table :items="desserts" :headers="headers">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="warning" @click="generaQR(item)">
                  <v-icon size="x-large" color="black"> mdi-qrcode </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogFormCalle" width="600">
      <v-card>
        <v-card-title> Formulario de Calle </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="calleForm" fast-fail @submit.prevent>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="calle.calle"
                  variant="outlined"
                  density="compact"
                  label="Calle"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn color="success" block @click="save()">Guardar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { Calle } from "@/classes/Calle/Calle";
import { onMounted, ref } from "vue";
import Rules from "@/utils/Rules/Rules";
import { CalleService } from "@/services/Calle/CalleService";

const props = defineProps({
  idCalle: {
    type: [Number],
    required: true,
  },
});

const rules = new Rules();
const calleService = new CalleService();
const calleForm: any = ref(null);
const calle = ref<Calle>(new Calle());

const headers = ref([
  { title: "ID", key: "id" },
  { title: "Calle", key: "calle" },
  { title: "Opciones", key: "actions" },
]);
const desserts: any = ref([]);
const dialogFormCalle = ref(false);

onMounted(() => {
  getAllCalles();
});

function getAllCalles() {
  calleService
    .findAllByEstatus()
    .then((response) => {
      desserts.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

async function save() {
  const { valid } = await calleForm.value.validate();
  if (valid) {
    const saveOrUpdate = props.idCalle
      ? calleService.update(calle.value)
      : calleService.save(calle.value);

    saveOrUpdate
      .then(() => {
        dialogFormCalle.value = false;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function generaQR(item: any) {
  calleService.generateCodigo(item.id).catch((e) => {
    console.log("Fatal " + e);
  });
}

function openFormCalle() {
  dialogFormCalle.value = true;
}
</script>
