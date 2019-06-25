<template>
  <div id="app">
    <div id="nav">
      <router-link to="/panel">Panel Kibica</router-link> | 
      <router-link to="/sedziowie">Sedziowie</router-link> |
      <router-link to="/konie">Konie</router-link> |
      <router-link to="/klasy">Klasy</router-link>
    </div>
    <router-view/>
  </div>
</template>

<!--<script>
    import store from "./store";
    export default {
        name: "App",

        data: function () {
            return {};
        },
        
        methods: {
            dodaj: () => {
                store.dispatch("getData");
            }
        },

        created () {
            this.dodaj();
        }
    };
</script>-->

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
