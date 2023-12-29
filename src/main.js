import { createApp } from 'vue'
import App from './App.vue'

//import Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min'

//import router
import router from './router/Index'

const app = createApp(App)

//use vue router
app.use(router)

app.mount('#app')