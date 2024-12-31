<template>
  <v-card>
    <v-card-title>Formulario de Estatus</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="publicidadForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col v-if="props.idEstatus" class="d-flex justify-end" cols="12">
            <v-switch
              v-model="estatus.status"
              label="Status"
              color="primary"
              hide-details
              inset
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="estatus.descripcion"
              variant="outlined"
              density="compact"
              label="Descripcion"
              required
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
              @change="onFileChange"
            ></v-file-input>
          </v-col>
          <v-divider></v-divider>
          <v-col class="mt-5 d-flex justify-end" cols="12">
            <v-btn color="success" @click="save()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Estatus } from "@/classes/Estatus/Estatus";
import { EstatusService } from "@/services/Estatus/Estatus";
import Rules from "@/utils/Rules/Rules";
import { onMounted, ref } from "vue";

const props = defineProps({
  idEstatus: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["estatusChange"]);

const estatusService = new EstatusService();
const estatus = ref<Estatus>(new Estatus());
const rules = new Rules();

const publicidadForm: any = ref(null);
const iconAux: any = ref();
const iconB64: any = ref();

onMounted(() => {
  findByIdAndStatus();
});

async function findByIdAndStatus() {
  if (props.idEstatus) {
    estatusService
      .findByIdAndEstatus(props.idEstatus)
      .then((response) => {
        estatus.value = response.data;
        iconAux.value = {
          name: response.data.nombreIcon,
        };
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

async function save() {
  const { valid } = await publicidadForm.value.validate();
  if (valid && iconAux.value != null) {
    if (iconB64.value) {
      estatus.value.idIcon = {
        content: iconB64.value,
        nombre: iconAux.value.name,
      } as any;
    }

    const saveOrUpdate = props.idEstatus
      ? estatusService.update(estatus.value)
      : estatusService.save(estatus.value);

    saveOrUpdate
      .then(() => {
        emits("estatusChange");
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function onFileChange() {
  if (!iconAux.value) return;
  const reader = new FileReader();
  reader.onload = (e: any) => {
    iconB64.value = e.target.result;
  };
  reader.readAsDataURL(iconAux.value);
}
</script>
