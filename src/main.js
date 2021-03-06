import Vue from 'vue';
import VueResource from 'vue-resource';
import VueCarousel from 'vue-carousel';
import App from './App';
import router from './router';
import './polyfills/after';
import store from './store/store';


Vue.use(VueCarousel);
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.http.options.root = 'https://iss.moex.com/iss/engines/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
