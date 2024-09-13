<template>
  <Toolbar :refresh="refresh" />

  <v-spacer />
  <Tabs
    :change-city="fetchWeatherData"
    :cities="cities"
    :loading="loading"
    :selected-city-idx="selectedCityIdx"
  />

  <v-spacer />
  <HoursCard :hourly="hourlyData" :loading="loading" :timezone="forecastTimezone" />

  <v-spacer />
  <DaysCard :daily="dailyData" :loading="loading" :timezone="forecastTimezone" />

  <v-footer class="pa-0 d-flex justify-end">
    <div class="pa-0 text-right smol-text text-disabled">
      Last updated {{ lastUpdatedAt ? lastUpdatedAt.toISOString(): '-' }}
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { City, DailyForecast, HourlyForecast } from '@/types'
  const API_KEY = '482944e26d320a80bd5e4f23b3de7d1f'

  const cities: City[] = [
    {
      city_id: 3451190,
      city_name: 'Rio de Janeiro',
      state_code: '21',
      country_code: 'BR',
      country_full: 'Brazil',
      lat: -22.90278,
      lon: -43.2075,
    },
    {
      city_id: 1816670,
      city_name: 'Beijing',
      state_code: '22',
      country_code: 'CN',
      country_full: 'Paracel Islands',
      lat: 39.9075,
      lon: 116.39723,
    },
    {
      city_id: 5368361,
      city_name: 'Los Angeles',
      state_code: 'CA',
      country_code: 'US',
      country_full: 'United States',
      lat: 34.05223,
      lon: -118.24368,
    },
  ]

  const selectedCityIdx = ref(2)
  const dailyData: Ref<DailyForecast[]> = ref([])
  const hourlyData: Ref<HourlyForecast[]> = ref([])
  const lastUpdatedAt: Ref<Date | null> = ref(null)
  const loading = ref(false)
  const forecastTimezone: Ref<string> = ref('America/Chicago')

  // Fetch weather data from an API
  fetchWeatherData(cities[selectedCityIdx.value])

  async function fetchWeatherData (city: City) {
    const currentWeatherRequest = new Request(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`)
    try {
      loading.value = true
      const response = await fetch(currentWeatherRequest)
      const jsonResponse = await response.json()
      dailyData.value = jsonResponse.daily
      hourlyData.value = jsonResponse.hourly
      forecastTimezone.value = jsonResponse.timezone
      lastUpdatedAt.value = new Date()
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function refresh () {
    await fetchWeatherData(cities[selectedCityIdx.value])
  }

</script>

<style scoped lang="css">
.smol-text {
  font-size: 12px;
}
</style>
