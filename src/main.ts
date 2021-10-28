import Vue from 'vue'
import Vuesax from 'vuesax'

import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

Vue.use(Vuesax)
import 'vuesax/dist/vuesax.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
