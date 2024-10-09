<template>
  <v-card
    class="mx-4 my-2"
  >
    <v-card-item>
      <v-card-title>
        Next 5 days
      </v-card-title>
    </v-card-item>

    <v-skeleton-loader v-if="!daily || loading" type="card" />
    <v-list
      v-else
      lines="two"
    >
      <v-list-item
        v-for="[i, item] of items.entries()"
        :key="i"
        class="py-0"
      >
        <template #prepend>
          <v-avatar
            color="#00FFFFAA"
            rounded="2"
            :image="item.prependAvatar"
          />
        </template>
        <template #title>
          <div>{{ item.title }}</div>
        </template>
        <template #subtitle>
          <div class="text-capitalize">{{ item.subtitle }}</div>
        </template>

        <template #append>
          <span class="mr-2">{{ Math.round(item.tempHigh) }}°</span>
          <span>{{ Math.round(item.tempLow) }}°</span>
        </template>
      </v-list-item>

    </v-list>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { DailyForecast } from '@/types'
  import { getWeatherImageSource } from '@/util'

  interface ListItemProps {
    prependAvatar: string;
    title: string;
    subtitle: string;
    tempHigh: number;
    tempLow: number;
  }

  const props = defineProps<{
    daily: DailyForecast[] | undefined
    timezone: string;
    loading: boolean;
  }>()

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: props.timezone,
  }
  const formatter = new Intl.DateTimeFormat('en-US', options)

  const items: ComputedRef<ListItemProps[]> = computed(() => {
    const processedListItems: ListItemProps[] = []
    if (!props.daily) {
      return processedListItems
    }
    for (const dailyForecast of props.daily.slice(0, 5)) {
      const newItem = {
        prependAvatar: getWeatherImageSource(dailyForecast.weather),
        title: `${formatter.format(new Date(dailyForecast.dt * 1000))}`,
        subtitle: `${dailyForecast.weather[0].description}`,
        tempHigh: dailyForecast.temp.day,
        tempLow: dailyForecast.temp.min,
      }
      processedListItems.push(newItem)
    }
    return processedListItems
  })
</script>

<style scoped lang="css">

</style>
