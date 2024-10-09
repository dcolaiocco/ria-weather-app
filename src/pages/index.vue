<template>
  <Toolbar :refresh="refresh" />

  <v-spacer />
  <Tabs />

  <v-spacer />
  <HoursCard
    :hourly="appStore.forecast?.hourly"
    :loading="appStore.loadingWeatherData"
    :timezone="appStore.forecast ? appStore.forecast.timezone : appStore.defaultForecastTimezone"
  />

  <v-text-field @update:modelValue="citySearch"></v-text-field>

  <v-spacer />
  <DaysCard
    :daily="appStore.forecast?.daily"
    :loading="appStore.loadingWeatherData"
    :timezone="appStore.forecast ? appStore.forecast.timezone : appStore.defaultForecastTimezone"
  />

  <v-footer class="pa-0 d-flex justify-end">
    <div class="pa-0 text-right smol-text text-disabled">
      Last updated {{ appStore.forecastUpdatedAt ? appStore.forecastUpdatedAt.toISOString(): '-' }}
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app';

  const appStore = useAppStore()
  appStore.fetchWeatherData(appStore.getSelectedCity).then(()=>{
    console.log('FetchWeather succeded')
  }).catch((error) => {
    console.error(error)
  })
  async function refresh () {
    await appStore.fetchWeatherData(appStore.getSelectedCity)
  }

  appStore.loadCitySearchData()
  function citySearch(search: string) {
    const searchResults = appStore.citySearch(search)
    console.table(searchResults)
  }
</script>

<style scoped lang="css">
.smol-text {
  font-size: 12px;
}
</style>
