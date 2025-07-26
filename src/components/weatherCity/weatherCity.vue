<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const props = defineProps({
  city: { type: String, default: '' },
  temp: { type: String, default: '' },
  icon: { type: String, default: '' },
  isFavorite: { type: Boolean, default: false },
  lat: { type: Number, default: null },
  lon: { type: Number, default: null }
})

const router = useRouter()
const currentCity = ref({
  name: props.city || 'Москва',
  temp: props.temp || '-13°',
  icon: props.icon || '/weather/weather.svg',
  lat: props.lat || 55.7558,
  lon: props.lon || 37.6176
})

// Устанавливаем дефолтный город в избранное при первом посещении
onMounted(() => {
  if (props.isFavorite) {
    if (!localStorage.getItem('favoriteCities')) {
      const defaultCity = {
        name: 'Ижевск',
        lat: 56.8527,
        lon: 53.2115,
        temp: '0°',
        icon: '/weather/cloudy.svg'
      }
      localStorage.setItem('favoriteCities', JSON.stringify([defaultCity]))
    }
    
    // Если это компонент избранного, загружаем данные из localStorage
    if (!props.city && !props.temp && !props.icon) {
      const favorites = JSON.parse(localStorage.getItem('favoriteCities')) || []
      if (favorites.length > 0) {
        currentCity.value = favorites[0]
      }
    }
  }
})

const navigateToDetail = () => {
  router.push({
    name: 'WeatherCard',
    params: { name: currentCity.value.name },
    query: { 
      lat: currentCity.value.lat, 
      lon: currentCity.value.lon 
    }
  })
}
</script>

<template>
  <div class="weatherCity" @click="navigateToDetail">
    <div class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>{{ currentCity.name }}</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>{{ currentCity.temp }}</p>
      </div>
      <div class="weatherCity__card_icons">
        <img :src="currentCity.icon" alt="Weather icon">
      </div>
    </div>
  </div>
</template>

<style>
@import "./weatherCity.scss";
</style>