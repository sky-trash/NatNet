<script setup>

</script>
<template>
  <div class="weatherCity">
    <a href="/WeatherCard" class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>Москва</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>-13°</p>
      </div>
      <div class="weatherCity__card_icons">
        <img src="../../../public/weather/weather.svg" alt="">
      </div>
    </a>
    <a href="/WeatherCard" class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>Санкт-Петербург</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>-49°</p>
      </div>
      <div class="weatherCity__card_icons">
        <img src="../../../public/weather/Clouds.svg" alt="">
      </div>
    </a>
    <a href="/WeatherCard" class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>Казань</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>0°</p>
      </div>
      <div class="weatherCity__card_icons">
        <img src="../../../public/weather/Clear.svg" alt="">
      </div>
    </a>
    <a href="/WeatherCard" class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>Ижевск</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>-23°</p>
      </div>
      <div class="weatherCity__card_icons">
        <img src="../../../public/weather/Rain.svg" alt="">
      </div>
    </a>
    <a href="/WeatherCard" class="weatherCity__card">
      <div class="weatherCity__card_city">
        <h1>Самара</h1>
      </div>
      <div class="weatherCity__card_text">
        <p>-9°</p>
      </div>
      <div class="weatherCity__card_icons">
        <img src="../../../public/weather/Snow.svg" alt="">
      </div>
    </a>
  </div>
</template>
<style>
  @import "./weatherCity.scss";
</style>