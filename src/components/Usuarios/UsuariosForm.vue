<template>
  <v-card>
    <v-card-title>Formulario de Usuario</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="usuarioForm" fast-fail @submit.prevent>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="usuario.nombre"
              label="Nombre"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="usuario.apPaterno"
              label="Apellido Paterno"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="usuario.apMaterno"
              label="Apellido Materno"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="usuario.email"
              label="Email"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12">
            <v-text-field
              v-model="usuario.password"
              label="Password"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col> -->
          <v-col cols="12">
            <v-text-field
              v-model="usuario.celular"
              label="Celular"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="usuario.username"
              label="Username"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-end mt-3">
            <v-btn color="success" @click="save">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Usuario } from '@/classes/Usuarios/Usuarios';
import { UsuariosService } from '@/services/Usuarios/UsuariosService';
import { onMounted, ref } from 'vue';

const props = defineProps({
  idUsuario: {
    type: Number,
    required: true
  }
});
const emits = defineEmits(["usuarioChange"])

const usuarioService = new UsuariosService();
const usuario = ref<Usuario>(new Usuario());
const usuarioForm: any = ref(null);

onMounted(() => {
  findUsuario();
})

function findUsuario(){
  if(props.idUsuario){
    usuarioService.findByIdAndEstatus(props.idUsuario)
    .then((response) => {
      Object.assign(usuario.value, response.data)
    })
    .catch((e) => {
      console.log("Fatal " + e)
    })
  }
}

async function save(){
  const { valid } = await usuarioForm.value.validate();
  if(valid){

    const saveOrUpdate = props.idUsuario
      ? usuarioService.update(usuario.value)
      : usuarioService.save(usuario.value);

    saveOrUpdate
    .then(() => {
      emits("usuarioChange")
    })
    .catch((e) => {
      console.log("Fatal " + e)
    })
  }
}
</script>
