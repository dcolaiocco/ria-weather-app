import { Weather } from '@/types'

export const getWeatherImageSource = (weather: Weather[]): string => {
  const alternateImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  if (!weather.length) {
    return alternateImage
  }
  return `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`
}
