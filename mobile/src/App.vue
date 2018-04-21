<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import store from './service/store'
import api from './service/backend-api'
import appUtil from './service/app-util'
Vue.use(require("vue-moment"));

window.Store = store
Vue.prototype.api = api
Vue.prototype.appUtil = appUtil

 
export default {
  name: 'App'
}
</script>

<style>
</style>
