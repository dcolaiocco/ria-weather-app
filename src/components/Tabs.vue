<template>
  <v-tabs
    align-tabs="start"
    center-active
    :disabled="appStore.loadingWeatherData"
  >
    <v-tab
      v-for="[i, city] of appStore.loadedCities.entries()"
      :key="i"
      :i-selected="appStore.selectedCityIndex === i"
      :value="i"
      @click="changeCity(i)"
    >
      {{ city.city_name }}
    </v-tab>
    <v-tab min-width="10px" hide-slider @click.disable="console.log">
      <v-icon>mdi-plus</v-icon>
    </v-tab>
  </v-tabs>

</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app';

  const appStore = useAppStore()
  async function changeCity(index: number) {
    appStore.setCityIndex(index)
    await appStore.fetchWeatherData(appStore.getSelectedCity)
  }
</script>

<style scoped lang="sass">

</style>
