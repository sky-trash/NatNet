<script setup>

</script>
<template>
  <div class="weather">
    <div class="weather__card">
      <div class="weather__card_city">
        <h1>Москва</h1>
      </div>
      <div class="weather__card_text">
        <p>-13°</p>
      </div>
      <div class="weather__card_icons">
        <img src="../../../public/weather/weather.svg" alt="">
      </div>
    </div>
    <div class="weather__card">
      <div class="weather__card_city">
        <h1>Санкт-Петербург</h1>
      </div>
      <div class="weather__card_text">
        <p>-49°</p>
      </div>
      <div class="weather__card_icons">
        <img src="../../../public/weather/Clouds.svg" alt="">
      </div>
    </div>
    <div class="weather__card">
      <div class="weather__card_city">
        <h1>Казань</h1>
      </div>
      <div class="weather__card_text">
        <p>0°</p>
      </div>
      <div class="weather__card_icons">
        <img src="../../../public/weather/Clear.svg" alt="">
      </div>
    </div>
    <div class="weather__card">
      <div class="weather__card_city">
        <h1>Ижевск</h1>
      </div>
      <div class="weather__card_text">
        <p>-23°</p>
      </div>
      <div class="weather__card_icons">
        <img src="../../../public/weather/Rain.svg" alt="">
      </div>
    </div>
    <div class="weather__card">
      <div class="weather__card_city">
        <h1>Самара</h1>
      </div>
      <div class="weather__card_text">
        <p>-9°</p>
      </div>
      <div class="weather__card_icons">
        <img src="../../../public/weather/Snow.svg" alt="">
      </div>
    </div>
  </div>
</template>
<style>
  @import "./weatherCity.scss";
</style>