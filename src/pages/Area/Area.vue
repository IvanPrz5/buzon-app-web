<template>
  <v-container width="70vw">
    <div class="d-flex mb-4">
      <h2>Areas</h2>
      <v-spacer></v-spacer>
      <v-divider inset vertical></v-divider>
      <v-btn color="success" @click="agregar()">Agregar</v-btn>
    </div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table :items="desserts" :headers="headers">
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  color="primary"
                  variant="tonal"
                  @click="edit(item)"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="areaFormDialog" width="400">
      <AreaForm :idArea="idArea" @areaChange="areaChange"></AreaForm>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import AreaForm from "@/components/Area/AreaForm.vue";
import { AreaService } from "@/services/Area/AreaService";
import { onMounted, ref } from "vue";

const areaService = new AreaService();

const desserts = ref([]);
const headers = ref([
  { title: "ID", key: "id" },
  { title: "Descripcion", key: "descripcion" },
  { title: "Opciones", key: "actions" },
]);
const idArea = ref<number | null>(null);
const areaFormDialog = ref(false);

onMounted(() => {
  findAllByEstatus();
})

async function findAllByEstatus(){
  areaService.findAllByEstatus()
  .then((response) => {
    desserts.value = response.data;
  })
  .catch((e) => {
    console.log("Fatal " + e)
  })
}

function areaChange(){
  areaFormDialog.value = false;
  findAllByEstatus();
}

function agregar() {
  areaFormDialog.value = true;
  idArea.value = null;
}

function edit(item: any) {
  areaFormDialog.value = true;
  idArea.value = item.id;
}
</script>
