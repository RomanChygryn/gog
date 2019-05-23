import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';
import App from './App.vue'
import store from './store'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource);




new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
