import WeatherCard from "../pages/WeatherCard.vue"
import Index from "../pages/Index.vue"

export const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/WeatherCard",
    component: WeatherCard,
  }
]