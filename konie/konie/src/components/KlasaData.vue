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
                <td>{{ sedzia }} </td> </span>
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
                            if (komisja === sedzia["$loki"] && klasa["sedziowie"].length < 4) {
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

table thead tr th {
  color: white;
  font-size: 18px;
}
table tfoot tr th {
  color: white;
  font-size: 18px;
}
table tbody tr td {
  color: white;
  font-size: 16px;
}

table {
    margin: auto;
}
</style>
