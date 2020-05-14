import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'; //為了使用bootstrap的套件
import $ from 'jquery';
import Vuex from 'vuex';
import store from './store'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
