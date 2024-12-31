<template>
  <v-card>
    <v-card-title>Roles de Usuario</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-list>
            <v-list-item
              v-for="item in rolesList"
              :key="item.id"
              :subtitle="item.descripcion"
            >
              <template v-slot:prepend>
                <v-list-item-action start>
                  <v-checkbox-btn
                    :model-value="isRoleSelected(item)"
                    @update:model-value="
                      (isChecked) => toggleRole(item, isChecked)
                    "
                  ></v-checkbox-btn>
                </v-list-item-action>
              </template>
              <!-- <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                <v-btn
                  v-if="
                    rolesSeleccionados.filter((item: any) => item.id!== item.id)
                      .length < 1
                  "
                  color="success"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn v-else color="error" size="small">
                  <v-icon>mdi-delete</v-icon>
                </v-btn> -->
            </v-list-item>
          </v-list>
        </v-col>
        <!-- <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-end mt-3">
            <v-btn color="success" @click="save">Guardar</v-btn>
          </v-col> -->
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { RolesService } from "@/services/Roles/RolesService";
import { UsuarioRolService } from "@/services/UsuarioRol/UsuarioRolService";
//import { storeApp } from "@/store/app";
import { onMounted, ref } from "vue";

const props = defineProps({
  idUsuario: {
    type: Number,
    required: true,
  },
});

//const appStore = storeApp();
const usuarioRolService = new UsuarioRolService();
const rolService = new RolesService();
const rolesList: any = ref([]);
//const rolesUsuario: any = ref([]);
const rolesSeleccionados: any = ref([]);

onMounted(() => {
  getAllRoles();
  getRolesByUsuario();
});

const isRoleSelected = (role: any) => {
  return rolesSeleccionados.value.some(
    (selected: any) => selected.id === role.id
  );
};

const toggleRole = (role: any, isChecked: any) => {
  if (isChecked) {
    if (
      !rolesSeleccionados.value.some((selected: any) => selected.id === role.id)
    ) {
      const guardar = save(role);
      guardar
        ?.then(() => {
          rolesSeleccionados.value.push(role);
        })
        .catch((e) => {
          console.log("Fatal " + e);
        });
    }
  } else {
    //if (rolesSeleccionados.value.length > 0) {
    const deleteRol = quitarRol(role);
    deleteRol
      ?.then(() => {
        rolesSeleccionados.value = rolesSeleccionados.value.filter(
          (selected: any) => selected.id !== role.id
        );
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
    //}
  }
};

async function getAllRoles() {
  rolService
    .findAllByEstatus()
    .then((response) => {
      rolesList.value = response.data;
    })
    .catch((e) => {
      console.log("Fatal " + e);
    });
}

async function getRolesByUsuario() {
  if (props.idUsuario) {
    usuarioRolService
      .getRolesByUsuario(props.idUsuario)
      .then((response) => {
        rolesSeleccionados.value = response.data;
      })
      .catch((e) => {
        console.log("Fatal " + e);
      });
  }
}

function save(item: any) {
  if (props.idUsuario) {
    return usuarioRolService.save({
      idUsuario: {
        id: props.idUsuario,
      },
      idRol: {
        id: item.id,
      },
    });
  }
}

function quitarRol(item: any) {
  if (props.idUsuario) {
    return usuarioRolService.quitarRol({
      idUsuario: {
        id: props.idUsuario,
      },
      idRol: {
        id: item.id,
      },
    });
  }
}
</script>
