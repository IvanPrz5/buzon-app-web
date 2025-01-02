<template>
  <v-container class="container-loader">
    <div class="text-center">
      <v-progress-circular
      :size="50"
      :width="10"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
  </v-container>
</template>

<script lang="ts" setup></script>

<style scoped>
.container-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>