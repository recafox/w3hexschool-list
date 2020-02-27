import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'; //為了使用bootstrap的套件
import $ from 'jquery';



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
