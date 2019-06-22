<template>
    <div>
        <h1>
            <a v-on:click="klasa > 1 ? klasa -= 1 : klasa">poprzednia</a>
            Klasa {{ klasa }}
            <a v-on:click="klasa += 1">nastepna</a>
        </h1>
        
        <router-link to="/konie/new"> dodaj konia </router-link>
        <table>
                <tr>
                    <th>Nr</th>
                    <th>Nazwa</th>
                    <th>Kraj</th>
                    <th>Rocznik</th>
                    <th>Maść</th>
                    <th>Płeć</th>
                    <th></th>
                </tr>
                <tr v-for="item in kon" v-bind:key="item['id']">
                    <td v-if="item['klasa'] == klasa">{{ item['numer'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['nazwa'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['kraj'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['rocznik'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['masc'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['plec'] }}</td>
                    <td v-if="item['klasa'] == klasa">
                        <router-link :to="{ name: 'kon', params: { id: item['id'] }}">Edytuj |</router-link>
                        <router-link :to="{ name: 'konocena', params: { id: item['id'] }}">| Noty</router-link>
                    </td>
                </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "KonData",
        props: {
            msg: String
        },
        data: function () {
            return {
                component: "KonData",
                kon: null,
                klasa: 1
            };
        },
        methods: {
            fetchData: function () {
                this.$http
                    .get("http://localhost:3000/konie")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.kon = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        mounted () {
            this.fetchData();
        },
        component: {}
    };
</script>

<style>

a {
  color: #42b983;
}

table {
    margin: auto;
}

</style>
