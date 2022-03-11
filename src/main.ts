import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
// eslint-disable-next-line import/extensions
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
