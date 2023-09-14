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
import "aos/dist/aos.css"; // Import the AOS CSS
import AOS from "aos";

Vue.config.productionTip = false;

Vue.use(Vuetify); // Use Vuetify

new Vue({
    created() {
        AOS.init();
    },
    router,
    store,
    vuetify: new Vuetify(), // Initialize Vuetify
    render: (h) => h(App),
}).$mount("#app");
Vue.use(
    AOS.init({
        duration: 200, // Duration of animations
        easing: "ease", // Easing type
        once: true, // Only trigger animations once
        // More options...
    })
);
