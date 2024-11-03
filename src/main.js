import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { router } from './router'
import { firebase } from './firebase.js'
import { store } from './store.js'

loadFonts()
createApp(App)
  .use(firebase)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
