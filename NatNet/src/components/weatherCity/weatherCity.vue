<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  city: { type: String, default: 'Москва' },
  temp: { type: String, default: '-13°' },
  icon: { type: String, default: '/weather/weather.svg' },
  isFavorite: { type: Boolean, default: false }, // Флаг избранного
  lat: { type: Number, default: null },
  lon: { type: Number, default: null }
})

const router = useRouter()
const emit = defineEmits(['toggle-favorite']) // Событие для переключения избранного

// Переключение избранного (вызывает родительский компонент)
const toggleFavorite = (e) => {
  e.stopPropagation()
  emit('toggle-favorite') // Генерируем событие
}

// Переход на страницу города
const navigateToDetail = () => {
  router.push({
    path: '/WeatherCard/:name',
    query: { name: props.city, lat: props.lat, lon: props.lon }
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
        <!-- Кнопка избранного (иконка меняется в зависимости от isFavorite) -->
        <button @click="toggleFavorite" class="favorite-btn">
          <svg class="icon" :class="{ 'hidden': isFavorite }">
            <use href="/sprite.svg#bookmark-back"></use>
          </svg>
          <svg class="icon-fill" :class="{ 'active': isFavorite }">
            <use href="/sprite.svg#bookmark-fill"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  position: relative;
}

.icon, .icon-fill {
  width: 24px;
  height: 24px;
}

.icon-fill {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon-fill.active {
  opacity: 1;
}

.icon.hidden {
  opacity: 0;
}

.weatherCity__card_icons {
  display: flex;
  align-items: center;
}
</style>

<style>
@import "./weatherCity.scss";
</style>