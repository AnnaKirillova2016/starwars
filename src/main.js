import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import './assets/sass/style.sass'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilter)
library.add(faTimesCircle)

createApp(App)
    .use(store)
    .use(router)
    .use(moshaToast)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

