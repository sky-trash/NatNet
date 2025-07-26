<script setup>
import { ref, onMounted } from 'vue'
import Header from "../layout/header/header.vue"
import Searth from "../searth/searth.vue"
import City from "../city/city.vue"
import Bookmarks from "../bookmarks/bookmarks.vue"
import WeatherCity from "../weatherCity/weatherCity.vue"

const favoriteCities = ref([])

const defaultCoords = {
  'Москва': { lat: 55.7558, lon: 37.6176 },
  'Санкт-Петербург': { lat: 59.9343, lon: 30.3351 },
  'Казань': { lat: 55.7961, lon: 49.1064 },
  'Ижевск': { lat: 56.8527, lon: 53.2115 },
  'Грютвикен': { lat: -54.2811, lon: -36.5086 }
}

// Загрузка избранных городов из localStorage
onMounted(() => {
  const savedCities = localStorage.getItem('favoriteCities')
  if (savedCities) {
    // Добавляем координаты, если их нет в сохраненных данных
    favoriteCities.value = JSON.parse(savedCities).map(city => ({
      ...city,
      lat: city.lat || defaultCoords[city.name]?.lat || 55.7558,
      lon: city.lon || defaultCoords[city.name]?.lon || 37.6176
    }))
  }
})

const toggleFavorite = (city) => {
  const index = favoriteCities.value.findIndex(c => c.name === city.name)
  if (index === -1) {
    favoriteCities.value.push({
      ...city,
      lat: city.lat || defaultCoords[city.name]?.lat || 55.7558,
      lon: city.lon || defaultCoords[city.name]?.lon || 37.6176
    })
  } else {
    favoriteCities.value.splice(index, 1)
  }
  localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value))
}
</script>

<template>
  <Header />
  <Searth />

  <div v-if="favoriteCities.length > 0" class="favorites-container">
    <div class="favorites-container-flex">
      <WeatherCity 
        v-for="city in favoriteCities" 
        :key="city.name" 
        :city="city.name" 
        :temp="city.temp" 
        :icon="city.icon"
        :lat="city.lat"
        :lon="city.lon"
        :isFavorite="true" 
        @toggle-favorite="toggleFavorite(city)" 
      />
    </div>
  </div>

  <template v-else>
    <City />
    <Bookmarks />
  </template>
</template>

<style>
.favorites-container {
  padding: 55px 140px;
  display: flex;
  justify-content: center;
}
.favorites-container-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: flex-start;
}
</style>