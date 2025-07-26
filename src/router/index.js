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
      meta: { title: 'Погода в городе' },
      props: true
    },
    {
      path: '/weatherCard/:name', 
      name: 'WeatherCard',
      component: () => import('@/pages/WeatherCard.vue'),
      meta: { title: 'Карточка погоды' },
      props: (route) => ({ 
        id: route.params.id,
      })
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

// Динамическое изменение title страницы
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Погодное приложение';
  next();
});

export default router;