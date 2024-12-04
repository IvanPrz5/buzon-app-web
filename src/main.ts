/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import axios from "axios";

const app = createApp(App);

axios.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Content-type"] = "Application/json";

    if (localStorage.getItem("token") != null) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

registerPlugins(app);

app.mount("#app");
