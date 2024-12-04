<template>
  <v-card>
    <v-card-title>Formulario de Area</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="areaForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col v-if="props.idArea" class="d-flex justify-end" cols="12">
            <v-switch
              v-model="area.status"
              label="Status"
              color="primary"
              hide-details
              inset
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="area.descripcion"
              variant="outlined"
              density="compact"
              label="Descripcion"
              :rules="[rules.requerido]"
            ></v-text-field>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-end pt-3">
            <v-btn v-if="props.idArea" color="primary" @click="reset()"
              >Limpiar</v-btn
            >
            <v-btn class="ml-2" color="success" @click="save()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Area } from "@/classes/Area/Area";
import { AreaService } from "@/services/Area/AreaService";
import Rules from "@/utils/Rules/Rules";
import { onMounted, ref } from "vue";

const props = defineProps({
  idArea: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["areaChange"]);

const rules = new Rules();
const areaService = new AreaService();
const areaForm: any = ref(null);
const area = ref<Area>(new Area());

onMounted(() => {
  findByIdAndEstatus();
});

async function findByIdAndEstatus() {
  if (props.idArea) {
    areaService
      .findByIdAndEstatus(props.idArea)
      .then((response) => {
        Object.assign(area.value, response.data);
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

async function save() {
  const { valid } = await areaForm.value.validate();
  if (valid) {
    const saveOrUpdate = props.idArea
      ? areaService.update(area.value)
      : areaService.save(area.value);

    saveOrUpdate
      .then(() => {
        emits("areaChange");
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function reset() {
  areaForm.value.reset();
}
</script>
