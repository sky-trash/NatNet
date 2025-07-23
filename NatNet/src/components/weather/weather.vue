<script>
import axios from 'axios';

this.$router.push({
  name: 'WeatherCard',
  params: { id: city.id }  // где city.id - ID из OpenWeatherMap
});

export default {
  name: 'City',
  data() {
    return {
      weather: {
        city: "Загрузка...",
        precipitation: "Загрузка...",
        degree_text: "--°",
        degree_img: "../../../public/weather/weather.svg",
        pressure: "--",
        sunset: "--:--"
      },
      isLoading: true,
      error: null
    };
  },
  methods: {
    async fetchWeatherData(cityId) {
      try {
        const API_KEY = import.meta.env.VITE_APP_OWM_KEY;
        if (!API_KEY) {
          throw new Error('API ключ не настроен');
        }

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              id: cityId,
              appid: API_KEY,
              units: 'metric',
              lang: 'ru'
            },
            validateStatus: (status) => status < 500
          }
        );

        if (response.status === 401) {
          throw new Error('Неверный API ключ');
        }

        this.updateWeatherData(response.data);
      } catch (err) {
        this.error = err.response?.status === 401 
          ? 'Ошибка авторизации. Проверьте API ключ' 
          : err.message || 'Ошибка загрузки данных';
        console.error('Ошибка:', err);
      } finally {
        this.isLoading = false;
      }
    },
    updateWeatherData(data) {
      const weatherMain = data.weather?.[0]?.main || 'default';
      const weatherDesc = data.weather?.[0]?.description || 'Нет данных';
      
      this.weather = {
        city: data.name || 'Неизвестный город',
        precipitation: weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1),
        degree_text: `${Math.round(data.main?.temp || 0)}°`,
        degree_img: this.getWeatherIcon(weatherMain),
        pressure: data.main?.pressure ? Math.round(data.main.pressure * 0.75006) : '--',
        sunset: data.sys?.sunset 
          ? new Date(data.sys.sunset * 1000).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
          : '--:--'
      };
    },
    getWeatherIcon(weatherType) {
      const icons = {
        'Clear': 'Sun.svg',
        'Clouds': 'Cloudy.svg',
        'Rain': 'Rain.svg',
        'Snow': 'Snow.svg',
        'Thunderstorm': 'Thunder.svg',
        'default': 'weather.svg'
      };
      return `../../../public/weather/${icons[weatherType] || icons.default}`;
    }
  },
  mounted() {
    const cityId = this.$route.params.id || this.$route.query.id;
    if (!cityId) {
      this.error = "ID города не указан в URL";
      this.isLoading = false;
      return;
    }
    this.fetchWeatherData(cityId);
  }
};
</script>

<template>
  <div class="back">
    <router-link to="/">
      <div class="back__left">
        <div class="back__left_img">
          <img src="../../../public/bookmark/chevron_big_left.svg" alt="Назад">
        </div>
        <div class="back__left_text">
          <h1>Назад</h1>
        </div>
      </div>
    </router-link>
    <div class="back__right">
      <img src="../../../public/bookmark/Bookmark_back.svg" alt="Закладка">
    </div>
  </div>

  <div v-if="isLoading" class="loading">Загрузка данных о погоде...</div>
  <div v-else-if="error" class="error">
    {{ error }}
    <p v-if="error.includes('API')" class="help-text">
      Проверьте ключ в файле .env
    </p>
  </div>
  
  <div v-else class="weather">
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
        <img src="../../../public/weather/barometer 1.svg" alt="Давление">
      </div>
      <div class="weather__pressure_text">
        <p>{{ weather.pressure }} мм рт.ст.</p>
      </div>
    </div>
    <div class="weather__sunset">
      <h1>Закат в {{ weather.sunset }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./weather.scss";

.loading, .error {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #ff3333;
}

.help-text {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}
</style>