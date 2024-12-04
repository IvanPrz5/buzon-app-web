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
            ></v-text-field>
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
import { onMounted, ref } from "vue";

const props = defineProps({
  idEstatus: {
    type: [Number, null],
    required: true
  }
})
const emits = defineEmits(["estatusChange"]);

const estatusService = new EstatusService();

const estatus = ref<Estatus>(new Estatus());
const publicidadForm: any = ref(null);

onMounted(() => {
  findByIdAndStatus();
})

async function findByIdAndStatus() {
  if(props.idEstatus){
    estatusService.findByIdAndEstatus(props.idEstatus)
      .then((response) => {
        estatus.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e)
      })
  }
}

async function save() {
  const { valid } = await publicidadForm.value.validate();
  if (valid) {
    const saveOrUpdate = props.idEstatus 
      ? estatusService.update(estatus.value)
      : estatusService.save(estatus.value)

    saveOrUpdate
      .then(() => {
        emits("estatusChange");
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}
</script>
