// Utilities
import { loadCSV, CSVIndexer } from '@/util/csvIndexer'
import { City, DailyForecast, Forecast, HourlyForecast } from '@/types'
import { defineStore } from 'pinia'

const API_KEY = '482944e26d320a80bd5e4f23b3de7d1f'

interface AppState {
  csvCityData: CSVIndexer | null
  loadingCityData: boolean
  loadedCities: City[]
  selectedCityIndex: number
  loadingWeatherData: boolean
  defaultForecastTimezone: string
  forecastUpdatedAt: Date | null
  forecast: Forecast | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      csvCityData: null,
      loadingCityData: false,
      loadedCities: [
        {
          city_id: '3451190',
          city_name: 'Rio de Janeiro',
          state_code: '21',
          country_code: 'BR',
          country_full: 'Brazil',
          lat: '-22.90278',
          lon: '-43.2075',
        },
        {
          city_id: '1816670',
          city_name: 'Beijing',
          state_code: '22',
          country_code: 'CN',
          country_full: 'Paracel Islands',
          lat: '39.9075',
          lon: '116.39723',
        },
        {
          city_id: '5368361',
          city_name: 'Los Angeles',
          state_code: 'CA',
          country_code: 'US',
          country_full: 'United States',
          lat: '34.05223',
          lon: '-118.24368',
        },
      ],
      selectedCityIndex: 0,
      loadingWeatherData: false,
      defaultForecastTimezone: 'America/Chicago',
      forecastUpdatedAt: null,
      forecast: null
    }
  },
  getters: {
    getSelectedCity: (state) => {
      return state.loadedCities[state.selectedCityIndex]
    }
  },
  actions: {
    citySearch(search: string): City[] {
      console.table(this.csvCityData?.search(search, 30))
      if (this.csvCityData) {
        return this.csvCityData.search(search, 30)
      }
      return []
    },
    loadCitySearchData() {
      this.loadingCityData = true
      loadCSV('/cities_20000.csv').then((csvData) => {
        this.csvCityData = csvData
      }).catch((error) => {
        console.error('Error fetching city data', error)
      }).finally(() => {
        this.loadingCityData = false
      })
    },
    setCityIndex(index: number) {
      this.selectedCityIndex = index
    },
    async fetchWeatherData (city: City) {
      const currentWeatherRequest = new Request(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`)
      try {
        this.loadingWeatherData = true
        const response = await fetch(currentWeatherRequest)
        const jsonResponse = await response.json() as Forecast
        this.forecast = jsonResponse
        this.forecastUpdatedAt = new Date()
      } catch (e) {
        console.error(e)
      } finally {
        this.loadingWeatherData = false
      }
    }
  }
})
