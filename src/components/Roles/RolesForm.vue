<template>
  <v-card>
    <v-card-title> Formulario de Roles </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="rolesForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col v-if="props.idRol" class="d-flex justify-end" cols="12">
            <v-switch
              v-model="roles.status"
              label="Status"
              color="primary"
              hide-details
              inset
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="roles.descripcion"
              variant="outlined"
              density="compact"
              label="Descripcion"
              :rules="[rules.requerido]"
            ></v-text-field>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-end pt-3">
            <v-btn v-if="props.idRol" color="primary" @click="reset()"
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
import { Roles } from "@/classes/Roles/Roles";
import { RolesService } from "@/services/Roles/RolesService";
import Rules from "@/utils/Rules/Rules";
import { onMounted, ref } from "vue";

const props = defineProps({
  idRol: {
    type: [Number, null],
    required: true,
  },
});
const emits = defineEmits(["rolesChange"]);

const rules = new Rules();

const roles = ref<Roles>(new Roles());
const rolesForm: any = ref(null);
const rolesService = new RolesService();

onMounted(() => {
  findByIdAndStatus();
});

async function findByIdAndStatus() {
  if (props.idRol) {
    rolesService
      .findByIdAndEstatus(props.idRol)
      .then((response) => {
        roles.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

async function save() {
  const { valid } = await rolesForm.value.validate();
  if (valid) {
    const saveOrUpdate = props.idRol
      ? rolesService.update(roles.value)
      : rolesService.save(roles.value);

    saveOrUpdate
      .then(() => {
        emits("rolesChange");
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function reset() {
  rolesForm.value.reset();
}
</script>
