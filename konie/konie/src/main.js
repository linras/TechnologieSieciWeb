import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from "vue-resource"

Vue.use(VueResource);
Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    store,
    created() {
        //initialize store data structure by submitting action.
        this.$store.dispatch('getData');
    },
    render: function (h) { return h(App) }
}).$mount('#app')
//new Vue({
//    router,
//  render: function (h) { return h(App) }
//}).$mount('#app')
