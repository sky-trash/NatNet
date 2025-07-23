<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import debounce from 'lodash/debounce';

const router = useRouter();
const emit = defineEmits(['city-selected']);
const searchQuery = ref('');
const suggestions = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Проверка API ключа
const API_KEY = import.meta.env.VITE_APP_OWM_KEY;
console.log('Using API Key:', API_KEY ? '***' + API_KEY.slice(-4) : 'NOT FOUND!');

onMounted(() => {
  if (!API_KEY) {
    error.value = 'API ключ не настроен. Проверьте .env файл';
  }
});

// Поиск городов с debounce
const fetchCities = debounce(async (query) => {
  if (!API_KEY || query.length < 3) {
    suggestions.value = [];
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/find`,
      {
        params: {
          q: query,
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

    suggestions.value = response.data?.list || [];
    if (!suggestions.value.length) {
      error.value = 'Город не найден';
    }
  } catch (err) {
    error.value = err.response?.status === 401 
      ? 'Ошибка авторизации. Проверьте API ключ в .env' 
      : 'Ошибка соединения с сервером';
    console.error('API Error:', err);
  } finally {
    isLoading.value = false;
  }
}, 300);

// Обработчик ввода
const handleInput = (e) => {
  if (e.key === 'Enter') e.preventDefault();
  searchQuery.value = e.target.value;
  fetchCities(searchQuery.value);
};

// Переход на экран города
const goToCity = (city) => {
  router.push({
    name: 'WeatherCard',
    params: { 
      id: city.id,
      name: city.name 
    },
    query: {
      lat: city.coord.lat,
      lon: city.coord.lon
    }
  });
};
</script>

<template>
  <div class="search">
    <form class="search__form" @submit.prevent>
      <input
        v-model="searchQuery"
        type="text"
        name="text"
        class="search__form_input"
        placeholder="Укажите город"
        @input="handleInput"
        @keydown="handleInput"
        @keydown.enter.prevent
      />

      <div v-if="isLoading" class="search__loading">Поиск городов...</div>
      <div v-else-if="error" class="search__error">
        {{ error }}
        <p v-if="error.includes('API')" class="help-text">
          Проверьте ключ в файле .env
        </p>
      </div>

      <ul v-if="suggestions.length" class="search__suggestions">
        <li
          v-for="city in suggestions"
          :key="city.id"
          @click="goToCity(city)"
        >
          <span class="city-name">{{ city.name }}, {{ city.sys?.country }}</span>
          <span class="city-temp">{{ Math.round(city.main?.temp) }}°C</span>
        </li>
      </ul>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "./searth.scss";
</style>