<template>
  <v-toolbar
    color="#00FFFF"
  >
    <v-toolbar-title>
      Simple Weather
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon @click="refresh">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
  defineProps<{
    refresh: Function;
  }>()
</script>
