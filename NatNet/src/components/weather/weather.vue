<script setup>

</script>
<template>
  <div class="weather">
    <div class="weather__city">
      <h1>Москва</h1>
    </div>
    <div class="weather__precipitation">
      <p>Облачно с просянениями</p>
    </div>
    <div class="weather__degree">
      <div class="weather__degree_text">
        <h1>-13°</h1>
      </div>
      <div class="weather__degree_img">
        <img src="../../../public/weather/weather.svg" alt="">
      </div>
    </div>
    <div class="weather__pressure">
      <div class="weather__pressure_img">
        <img src="../../../public/weather/barometer 1.svg" alt="">
      </div>
      <div class="weather__pressure_text">
        <p>756 мм рт.ст.</p>
      </div>
    </div>
    <div class="weather__sunset">
      <h1>Закат в 18:00</h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "./weather.scss";
</style>