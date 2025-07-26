<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToIzhevsk = () => {
  const izhevskCoords = { lat: 56.8527, lon: 53.2115 } // Координаты Ижевска

  router.push({
    name: 'WeatherCard',
    params: { name: 'Ижевск' },
    query: {
      lat: izhevskCoords.lat,
      lon: izhevskCoords.lon
    }
  })
}
</script>

<template>
  <div class="city">
    <div class="city__img">
      <svg class="icon chevron-icon">
        <use href="/sprite.svg#arrow"></use>
      </svg>
    </div>
    <div class="city__text">
      <h1>Начните вводить город, например, <a @click="goToIzhevsk" class="city-link">Ижевск</a></h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./city.scss";
</style>