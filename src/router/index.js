import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Index.vue'),
      meta: { title: 'Погода - Главная' }
    },
    {
      path: '/weatherCity',
      name: 'WeatherCity',
      component: () => import('@/pages/WeatherCity.vue'),
      meta: { title: 'Погода в городе' }
    },
    {
      path: '/weatherCard/:name',
      name: 'WeatherCard',
      component: () => import('@/pages/WeatherCard.vue'),
      meta: { title: 'Карточка погоды' },
      props: (route) => ({
        name: route.params.name,
        lat: parseFloat(route.query.lat),
        lon: parseFloat(route.query.lon)
      })
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Погодное приложение';
  next();
});

export default router;