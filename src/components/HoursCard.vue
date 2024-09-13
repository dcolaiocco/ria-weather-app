<template>
  <v-card
    class="mx-4 my-2"
    hover
  >
    <v-card-item>
      <v-card-title>
        Next hours
      </v-card-title>
    </v-card-item>
    <v-skeleton-loader v-if="loading" type="card" />
    <!-- <div class="dimensions"></div> -->
    <v-sheet
      v-else
      class="mx-auto"
    >
      <v-slide-group
        center-active
        class="pa-1"
      >
        <v-slide-group-item
          v-for="[n, hourlyForecast] of hourly.slice(0, 10).entries()"
          :key="n"
        >
          <v-card
            height="110"
            width="75"
          >
            <div class="d-flex flex-column fill-height align-center justify-center">
              <div>{{ Math.round(hourlyForecast.temp) }}°</div>
              <div>{{ Math.round(hourlyForecast.humidity) }}%</div>
              <v-avatar :image="getWeatherImageSource(hourlyForecast.weather)" />
              <div>{{ formatter.format(new Date(hourlyForecast.dt* 1000)) }}</div>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
  import { HourlyForecast } from '@/types'
  import { getWeatherImageSource } from '@/util'

  const props = defineProps<{
    hourly: HourlyForecast[];
    timezone: string;
    loading: boolean;
  }>()

  const formatter: ComputedRef<Intl.DateTimeFormat> = computed(() => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: props.timezone,
    }
    return new Intl.DateTimeFormat('en-US', options)
  })
</script>

<style scoped lang="css">
.v-slide-group__prev {
  min-width: 0px;
}
</style>
