<template>
    <div v-if="render" id="app">
        <ul v-if="!login" id="nav">
        <li style="float:right"><a href="http://192.168.0.150:4000/login">Zaloguj</a></li></ul>
        <ul v-else id="nav">
            <li class="active"><router-link to="/panel">Panel Kibica </router-link> </li>
            <li class="active"><router-link to="/sedziowie">Sedziowie </router-link> </li>
            <li><router-link to="/konie">Konie </router-link></li>
            <li><router-link to="/klasy">Klasy </router-link></li>
            <li style="float:right"><a href="http://192.168.0.150:4000/logout">Wyloguj</a></li>
            <li style="float:right">Witaj {{user}} </li>
        </ul>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "App",

        data: function () {
            return {
                login: false,
                user: "",
                render: true
            };
        },
        methods: {

        },
        created() {
            this.user = this.$store.getters.getUser;
            console.log(this.user);
        },
        sockets: {
            logEmit: function (data) {
                console.log("ZALOGOWANO" + data.username);
                setTimeout(() => {
                    this.login = true;
                    this.user = data.username;
                    this.render = false;
                }, 5000);
                setTimeout(() => {
                    this.render = true;
                }, 5000);
            },
            logOUTEmit: function (data) {
                console.log("WYLOGOWANO");
                setTimeout(() => {
                    this.login = false;
                    this.render = false;
                }, 500);
                setTimeout(() => {
                    this.render = true;
                }, 500);
            }
            
        }
    };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  display: block;
}

li {
  text-align: center;
  display: block;
  padding: 14px 16px;
  float: left;
  color: antiquewhite;
  text-align: center;
  padding: 5px;
}

li a.router-link-exact-active {
  color: white;
  text-align: center;
  text-decoration: none;
}

li a.router-link-exact-active:hover:not(.active) {

}

#nav {
  padding: 30px;
}


</style>
