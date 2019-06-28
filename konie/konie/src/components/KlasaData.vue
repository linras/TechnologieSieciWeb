<template>
    <div>
        <h1>
            Klasy
        </h1>
        <router-link :to="{ name: 'klasyEdit', params: { id: lastIndex }}"> dodaj klasę </router-link>
        <table>
            <tr>
                <th>Numer</th>
                <th>Kategoria</th>
                <th>Komisja</th>
                <th></th>
            </tr>
            <tr v-for="item in klasy" v-bind:key="item['$loki']">
                <td>{{ item['numer'] }}</td>
                <td>{{ item['kat'] }}</td>
                <td>
                    <span v-for="sedzia in item['sedziowie']" v-bind:key="sedzia">
                {{ sedzia }}  </span>
                </td>
                <td>
                    <router-link :to="{ name: 'klasa', params: { id: item['$loki'] }}">Edytuj</router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "KlasaData",
        props: {
            msg: String
        },
        data: function () {
            return {
                klasy: null,
                lastIndex: 'new',
                sedziowie: null
            };
        },
        methods: {
            show: function () {
                this.sedziowie = this.$store.getters.getSedziowie;
                this.klasy = this.$store.getters.getKlasy;
                this.getSedzia();
            },
            getSedzia() {
                let sedziowie = this.sedziowie;
                this.klasy.forEach(function (klasa) {
                    klasa["sedziowie"] = [];
                    klasa["komisja"].forEach(function (komisja) {
                        sedziowie.forEach(function (sedzia) {
                            if (komisja === sedzia["$loki"] ) {
                                klasa["sedziowie"].push(sedzia["sedzia"]);
                            }
                        });
                    });
                });
            }
        },

        computed: {
            lista() {
                return this.sedziowie;
            }
        },

        created() {
            this.show();
        }
    };
</script>

<style>
    a {
        color: #42b983;
        padding: 20px;
    }

    table, td, th {
        border: 1px solid #ddd;
        text-align: left;
    }

    table {
        margin: auto;
        border-collapse: collapse;
        width: 90%;
    }

    th, td {
        padding: 15px;
    }
</style>
