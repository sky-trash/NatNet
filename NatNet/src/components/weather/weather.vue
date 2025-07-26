<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'City',
  setup() {
    const route = useRoute();
    const weather = ref({
      city: "Загрузка...",
      precipitation: "Загрузка...",
      degree_text: "--°",
      degree_img: "",
      pressure: "--",
      sunset: "--:--"
    });

    const isFavorite = ref(false);
    const API_KEY = import.meta.env.VITE_APP_OWM_KEY;

    const checkFavoriteStatus = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
      isFavorite.value = favorites.some(fav => fav.name === weather.value.city);
    };

    const toggleFavorite = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
      const cityIndex = favorites.findIndex(fav => fav.name === weather.value.city);

      if (cityIndex === -1) {
        favorites.push({
          name: weather.value.city,
          temp: weather.value.degree_text,
          icon: weather.value.degree_img,
          lat: route.query.lat,
          lon: route.query.lon
        });
      } else {
        favorites.splice(cityIndex, 1);
      }

      localStorage.setItem('favoriteCities', JSON.stringify(favorites));
      isFavorite.value = !isFavorite.value;
    };

    const fetchWeatherData = async () => {
      try {
        const { lat, lon } = route.query;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: lat,
              lon: lon,
              appid: API_KEY,
              units: 'metric',
              lang: 'ru'
            }
          }
        );

        const data = response.data;

        // Преобразование времени заката
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const sunsetHours = sunsetTime.getHours().toString().padStart(2, '0');
        const sunsetMinutes = sunsetTime.getMinutes().toString().padStart(2, '0');

        // Определение иконки погоды
        const getLocalIcon = (iconCode) => {
          const iconMap = {
            '01': 'Clear',
            '02': 'Clouds',
            '03': 'Clouds',
            '04': 'Clouds',
            '09': 'Rain',
            '10': 'Rain',
            '11': 'Rain',
            '13': 'Snow',
            '50': 'weather'
          };
          const prefix = iconCode.replace(/(d|n)$/, '');
          return iconMap[prefix] || 'weather';
        };

        weather.value = {
          city: data.name,
          precipitation: data.weather[0].description,
          degree_text: `${Math.round(data.main.temp)}°`,
          degree_img: `/weather/${getLocalIcon(data.weather[0].icon)}.svg`,
          pressure: Math.round(data.main.pressure * 0.750064),
          sunset: `${sunsetHours}:${sunsetMinutes}`
        };

        checkFavoriteStatus();
      } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        weather.value.city = "Ошибка загрузки";
      }
    };

    onMounted(() => {
      fetchWeatherData();
    });

    return {
      weather,
      isFavorite,
      toggleFavorite
    };
  }
};
</script>

<template>
  <div class="background">
    <div class="back">
      <a href="/">
        <div class="back__left">
          <div class="back__left_img">
            <svg class="icon">
              <use href="/sprite.svg#chevron-left"></use>
            </svg>
          </div>
          <div class="back__left_text">
            <h1>Назад</h1>
          </div>
        </div>
      </a>
      <div class="back__right">
        <button @click="toggleFavorite" class="favorite-btn">
          <svg class="icon">
            <use href="/sprite.svg#bookmark-back"></use>
          </svg>
          <svg class="icon-fill" :class="{ 'active': isFavorite }">
            <use href="/sprite.svg#bookmark-fill"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="weather">
      <div class="weather__city">
        <h1>{{ weather.city }}</h1>
      </div>
      <div class="weather__precipitation">
        <p>{{ weather.precipitation }}</p>
      </div>
      <div class="weather__degree">
        <div class="weather__degree_text">
          <h1>{{ weather.degree_text }}</h1>
        </div>
        <div class="weather__degree_img">
          <img :src="weather.degree_img" :alt="weather.precipitation">
        </div>
      </div>
      <div class="weather__pressure">
        <div class="weather__pressure_img">
          <svg class="icon">
            <use href="/sprite.svg#barometer"></use>
          </svg>
        </div>
        <div class="weather__pressure_text">
          <p>{{ weather.pressure }} мм рт.ст.</p>
        </div>
      </div>
      <div class="weather__sunset">
        <h1>Закат в {{ weather.sunset }}</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./weather.scss";
</style>