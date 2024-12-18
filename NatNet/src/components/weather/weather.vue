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
  // {
  //   id: 2,
  //   city: "Ижевск",
  //   precipitation: "Облачно",
  //   degree_text: "-17°",
  //   degree_img: "../../../public/weather/Clouds.svg",
  //   pressure: "758",
  //   sunset: "19:00"
  // },
  // {
  //   id: 3,
  //   city: "Самара",
  //   precipitation: "Дождь",
  //   degree_text: "-20°",
  //   degree_img: "../../../public/weather/Rain.svg",
  //   pressure: "760",
  //   sunset: "19:00"
  // },
  // {
  //   id: 4,
  //   city: "Санкт-Петербург",
  //   precipitation: "Слабый снег",
  //   degree_text: "-3°",
  //   degree_img: "../../../public/weather/Snow.svg",
  //   pressure: "757",
  //   sunset: "20:00"
  // },
  // {
  //   id: 5,
  //   city: "Казань",
  //   precipitation: "Солнечно",
  //   degree_text: "-10°",
  //   degree_img: "../../../public/weather/Clear.svg",
  //   pressure: "759",
  //   sunset: "18:00"
  // },
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
      <h1>{{ city }}</h1>
    </div>
    <div class="weather__precipitation">
      <p>{{ precipitation }}</p>
    </div>
    <div class="weather__degree">
      <div class="weather__degree_text">
        <h1>{{ degree_text }}</h1>
      </div>
      <div class="weather__degree_img">
        <img :src="degree_img" alt="">
      </div>
    </div>
    <div class="weather__pressure">
      <div class="weather__pressure_img">
        <img src="../../../public/weather/barometer 1.svg" alt="">
      </div>
      <div class="weather__pressure_text">
        <p>{{ pressure }} мм рт.ст.</p>
      </div>
    </div>
    <div class="weather__sunset">
      <h1>Закат в {{ sunset }}</h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./weather.scss";
</style>