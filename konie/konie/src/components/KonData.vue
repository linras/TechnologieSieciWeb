<template>
    <div>
        <h1>
            <a v-on:click="klasa > 1 ? klasa -= 1 : klasa; show();">poprzednia</a>
            Klasa {{ klasa }}
            <a v-on:click="klasa += 1; show();">nastepna</a>
        </h1>


        <router-link :to="{ name: 'konieEdit', params: { id: lastIndex }}"> dodaj konia </router-link>
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
            <tr v-for="item in konie" v-bind:key="item['$loki']">
                <td v-if="item['klasa'] == klasa">{{ item['numer'] }}</td>
                <td v-if="item['klasa'] == klasa">{{ item['nazwa'] }}</td>
                <td v-if="item['klasa'] == klasa">{{ item['kraj'] }}</td>
                <td v-if="item['klasa'] == klasa">{{ item['rocznik'] }}</td>
                <td v-if="item['klasa'] == klasa">{{ item['masc'] }}</td>
                <td v-if="item['klasa'] == klasa">{{ item['plec'] }}</td>
                <td v-if="item['klasa'] == klasa">
                    <router-link :to="{ name: 'kon', params: { id: item['$loki'] }}">Edytuj |</router-link>
                    <router-link :to="{ name: 'konocena', params: { id: item['$loki'] }}">| Noty</router-link>
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
                lastIndex: 'new',
                klasy: {},
                konie: [],
                klasa: 1
            };
        },
        methods: {
            show: function () {
                this.klasy = this.$store.getters.getKlasy;
                let test = this.$store.getters.getKonie;
                this.konie = [];
                test.forEach((element) => {
                    if (element["klasa"] == this.klasa)
                        this.konie.push(element);
                });
                this.konie.forEach((element, index) => {
                    element.numer = index + 1;
                });
            //show: function () {
            //    this.konie = this.$store.getters.getKonie;
            }
        },

        computed: {
            lista() {
                this.klasy = this.$store.getters.getKlasy;
                let test = this.$store.getters.getKonie;
                this.konie = [];
                test.forEach((element) => {
                    if (element["klasa"] == this.klasa)
                        this.konie.push(element);
                });
                this.konie.forEach((element, index) => {
                    element.numer = index + 1;
                });
            }
        },

        created() {
            this.show();
        },
        mounted() {
            this.show();
        }
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
