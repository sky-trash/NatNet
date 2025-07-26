<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const props = defineProps({
  city: { type: String, default: 'Москва' },
  temp: { type: String, default: '-13°' },
  icon: { type: String, default: '/weather/weather.svg' },
  isFavorite: { type: Boolean, default: false },
  lat: { type: Number, default: null },
  lon: { type: Number, default: null }
})

const router = useRouter()

onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('favoriteCities')) || []
  
  if (favorites.length === 0) {
    const defaultCity = {
      name: 'Ижевск',
      lat: 56.8527,
      lon: 53.2115,
      temp: '0°',
      icon: '/weather/cloudy.svg'
    }
    localStorage.setItem('favoriteCities', JSON.stringify([defaultCity]))
  }
})

const navigateToDetail = () => {
  if (!props.lat || !props.lon) {
    console.error('Координаты не определены для города:', props.city)
    const defaultCoords = {
      'Москва': { lat: 55.7558, lon: 37.6176 },
      'Санкт-Петербург': { lat: 59.9343, lon: 30.3351 },
      'Казань': { lat: 55.7961, lon: 49.1064 },
      'Ижевск': { lat: 56.8527, lon: 53.2115 },
      'Грютвикен': { lat: -54.2811, lon: -36.5086 }
    }
    
    const coords = defaultCoords[props.city] || { lat: 55.7558, lon: 37.6176 }
    
    router.push({
      name: 'WeatherCard',
      params: { name: props.city },
      query: { lat: coords.lat, lon: coords.lon }
    })
    return
  }
  
  router.push({
    name: 'WeatherCard',
    params: { name: props.city },
    query: { lat: props.lat, lon: props.lon }
  })
}
</script>

<template>
  <div class="weatherCity" @click="navigateToDetail">
    <div class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>{{ city }}</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>{{ temp }}</p>
      </div>
      <div class="weatherCity__card_icons">
        <img :src="icon" alt="Weather icon">
      </div>
    </div>
  </div>
</template>
<style>
@import "./weatherCity.scss";
</style>