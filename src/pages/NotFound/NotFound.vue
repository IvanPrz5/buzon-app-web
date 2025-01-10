<template>
  <v-container class="containerNotFound">
    <div>
      <v-row>
        <v-col>
          <div class="control-not-found-text">
            <v-icon color="error" size="100">mdi-alert-circle-outline</v-icon>
            <h1 class="display-2">404</h1>
            <p style="text-align: center" class="text-h6">
              La página que estás buscando ya no existe.
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup></script>

<style scooped>
.containerNotFound {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-not-found-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
