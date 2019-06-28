import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

function builder() {
    return new Vuex.Store({
        state: {
            sedziowie: [],
            konie: [],
            klasy: [],
            user: {}
        },

        mutations: {
            loadData(state) {
                axios
                    .get("http://192.168.0.150:4000/sedziowie")
                    .then(response => {
                        state.sedziowie = response.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });

                axios
                    .get("http://192.168.0.150:4000/klasy")
                    .then(response => {
                        state.klasy = response.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });

                axios
                    .get("http://192.168.0.150:4000/konie")
                    .then(response => {
                        state.konie = response.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });

                axios
                    .get('http://192.168.0.150:4000/kto')
                    .then(response => {
                        state.user = response.data;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            edit: (state, a) => {
                axios
                    .put(`http://192.168.0.150:4000/${a.path}`, a.ob)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            add: (state, a) => {
                axios
                    .post(`http://192.168.0.150:4000/${a.path}`, a.ob)
                    .then(response => {
                        console.log(response => {
                            state[`${a.table}`].push(response.data);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            delete: (state, a) => {
                axios
                    .delete(`http://192.168.0.150:4000/${a.path}/${a.id}`)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        },

        actions: {
            getData({commit}) {
                commit("loadData");
            },
            edit({ commit }, a)
            {
                commit("edit", a);
            },
            add({ commit }, a) {
                commit("add", a);
            },
            delete({ commit }, a) {
                commit("delete", a);
            }

        },

        getters: {
            getSedziowie: (state) => {
                return state.sedziowie;
            },
            getKlasy: (state) => {
                return state.klasy;
            },
            getKonie: (state) => {
                return state.konie;
            },
            getUser: (state) => {
                return state.user;
            },
            getSedzia: (state) => (id) => {
                return state.sedziowie.filter(e => {
                    if (e["$loki"] === id) {
                        return true;
                    } else {
                        return false;
                    }
                });
            },
            getKlasa: (state) => (id) => {
                return state.klasy.filter(e => {
                    if (e["$loki"] === id) {
                        return true;
                    } else {
                        return false;
                    }
                });
            },
            getKon: (state) => (id) => {
                return state.konie.filter(e => {
                    if (e["$loki"] === id) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

        }
    });
}

export default builder;