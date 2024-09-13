<template>
  <v-tabs
    align-tabs="start"
    center-active
    :disabled="loading"
    :model-value="selectedCityIdx"
  >
    <v-tab
      v-for="[i, city] of cities.entries()"
      :key="i"
      :i-selected="selectedCityIdx === i"
      :value="i"
      @click="changeCity(cities[i])"
    >
      {{ city.city_name }}
    </v-tab>
  </v-tabs>

</template>

<script setup lang="ts">
  import { City } from '@/types'

  defineProps<{
    cities: City[]
    selectedCityIdx: number;
    loading: boolean;
    changeCity: Function;
  }>()
</script>

<style scoped lang="sass">

</style>
