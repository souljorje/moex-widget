import Vue from 'vue';
import Router from 'vue-router';
import Widget from '@/components/Widget/Widget';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Widget',
      component: Widget,
    },
  ],
});
