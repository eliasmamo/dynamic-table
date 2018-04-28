// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import InputTag from 'vue-input-tag';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.component('InputTag', InputTag);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
