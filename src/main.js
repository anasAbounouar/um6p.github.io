import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify"; // Import Vuetify
import "vuetify/dist/vuetify.min.css"; // Import Vuetify CSS
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/framework.css";
import "normalize.css";
import "./scss/main.scss";
import "./scss/all.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify); // Use Vuetify

new Vue({
    router,
    store,
    vuetify: new Vuetify(), // Initialize Vuetify
    render: (h) => h(App),
}).$mount("#app");
