import Vue from 'vue';
import Router from 'vue-router';
import Widget from '@/components/Widget/Widget';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Widget',
      component: Widget,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
