import ArcoVue from "@arco-design/web-vue";
// import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ArcoVue);
    // nuxtApp.vueApp.use(ArcoVueIcon);
});