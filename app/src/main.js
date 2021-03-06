// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Import BootstrapVue and css
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Init BootstrapVue Plugin
Vue.use(BootstrapVue);

import store from './service/store'
import api from './service/backend-api'
import appUtil from './service/app-util'
Vue.use(require("vue-moment"));

window.Store = store
Vue.prototype.api = api
Vue.prototype.appUtil = appUtil

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
  },
  // Register App Component
  components: {
    app: App
  }
});
