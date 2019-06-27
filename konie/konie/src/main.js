import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from "vue-resource"
import VueSocketIO from 'vue-socket.io'

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://192.168.0.150:4001',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
    //options: { path: "/my-app/" } //Optional options
}));

new Vue({
    el: '#app',
    router,
    store,
    created() {
        //initialize store data structure by submitting action.
        this.$store.dispatch('getData');
    },
    sockets: {
        ocenEmit: function (data) {
            this.$store.dispatch('getData');
        },
        klasaChanged: function (data) {
            this.$store.dispatch('getData');
        },
        sedziaChanged: function (data) {
            this.$store.dispatch('getData');
        }
    },
    render: function (h) { return h(App) }
}).$mount('#app')
//new Vue({
//    router,
//  render: function (h) { return h(App) }
//}).$mount('#app')
