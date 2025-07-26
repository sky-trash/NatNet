<script setup></script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <a href="/" class="header__logo">
          <div class="header__logo_img">
            <svg class="icon chevron-icon">
              <use href="/sprite.svg#logo"></use>
            </svg>
          </div>
          <div class="header__logo_text">
            <h1>WeatherCheck</h1>
          </div>
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "../../../assets/iconmoon/style.css";
@import "header.scss";
</style>