<script setup>
import Back from "../back/back.vue"
import Header from "../layout/header/header.vue"
import Weather from "../weather/weather.vue"
</script>
<template>
  <Header/>
  <Weather/>
</template>
<style lang="scss" scoped>
  template {
    background: radial-gradient(80.36% 80.36% at 237.79% 0%, #5a607c 0%, #161b30 100%);
  }
  @media screen and (width: 360px) {
    Header {
      display: none
    } 
  }
</style>