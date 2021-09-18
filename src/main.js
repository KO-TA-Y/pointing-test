import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD2XKXyhej8hSm0L0sNpw8DQlz2XsAn0zo",
    authDomain: "clicktest-aab82.firebaseapp.com",
    projectId: "clicktest-aab82",
    storageBucket: "clicktest-aab82.appspot.com",
    messagingSenderId: "710644705933",
    appId: "1:710644705933:web:e7f39f47bf527a6ca650c4",
    measurementId: "G-ZW7RE5MXMJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
