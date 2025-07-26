<script setup>
import { ref, onMounted } from 'vue'
import Header from "../layout/header/header.vue"
import Searth from "../searth/searth.vue"
import City from "../city/city.vue"
import Bookmarks from "../bookmarks/bookmarks.vue"
import WeatherCity from "../weatherCity/weatherCity.vue"

const favoriteCities = ref([])

// Загрузка избранных городов из localStorage
onMounted(() => {
  const savedCities = localStorage.getItem('favoriteCities')
  if (savedCities) {
    favoriteCities.value = JSON.parse(savedCities)
  }
})

// Добавьте эту функцию для обработки переключения избранного
const toggleFavorite = (city) => {
  const index = favoriteCities.value.findIndex(c => c.name === city.name)
  if (index === -1) {
    favoriteCities.value.push(city)
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
    <WeatherCity 
      v-for="city in favoriteCities" 
      :key="city.name" 
      :city="city.name" 
      :temp="city.temp" 
      :icon="city.icon"
      :isFavorite="true" 
      @toggle-favorite="toggleFavorite(city)" 
    />
  </div>

  <template v-else>
    <City />
    <Bookmarks />
  </template>
</template>

<style>
.favorites-container {
  padding: 55px 140px;
  gap: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>