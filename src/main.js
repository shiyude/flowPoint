// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import { Toast,Indicator } from 'mint-ui';
import 'mint-ui/lib/style.css'
import store from './vuex/store.js';
import Base64 from 'js-base64';
window.Base64 = Base64.Base64;
window.Toast = function(data){
  Toast({
    message: data,
    position: 'bottom',
    duration: 3000
  });
};
window.Indicator = Indicator;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
})
