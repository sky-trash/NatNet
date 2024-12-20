<script>

export default {
  name: 'City',
  weather: {
    city: "Москва",
    precipitation: "Облачно с прояснениями",
    degree_text: "-13°",
    degree_img: "../../../public/weather/weather.svg",
    pressure: "756",
    sunset: "18:00"
  },
  methods: {
    addToCart() {
      
    }
  }
};
</script>
<template>
  <div class="back">
    <a href="/">
      <div class="back__left">
        <div class="back__left_img">
          <img src="../../../public/bookmark/chevron_big_left.svg" alt="">
        </div>
        <div class="back__left_text">
          <h1>Назад</h1>
        </div>
      </div>
    </a>
    <div class="back__right" @click="addToCart">
      <img src="../../../public/bookmark/Bookmark_back.svg" alt="">
    </div>
  </div>
  <div class="weather">
    <div class="weather__city">
      <h1>Ижевск</h1>
    </div>
    <div class="weather__precipitation">
      <p>Облано с прояснениями</p>
    </div>
    <div class="weather__degree">
      <div class="weather__degree_text">
        <h1>-13°</h1>
      </div>
      <div class="weather__degree_img">
        <img src="../../../public/weather/Snow.svg" alt="">
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