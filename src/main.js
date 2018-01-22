import Vue from 'vue'
import App from './App'
import router from './router'
import center from './service/center'
import store from './store'

Vue.prototype.$center = center;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

