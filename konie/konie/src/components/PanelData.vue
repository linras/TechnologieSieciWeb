<template>
    <div>
        <h1>
            <a  v-on:click="klasa > 1 ? klasa -= 1 : klasa; show(); ">poprzednia </a>
            Klasa {{ klasa }}
            <a v-on:click="klasa += 1; show();">natępna</a>
        </h1>
        <table>
                <tr>
                    <th>Miejsce</th>
                    <th>Nr</th>
                    <th>Klasa</th>
                    <th>Nazwa</th>
                    <th>Kraj</th>
                    <th>Rocznik</th>
                    <th>Maść</th>
                    <th>Płeć</th>
                    <th>Oceny</th>
                </tr>
                <tr v-for="(item, index) in konie" v-bind:key="item['$loki']">
                    <td v-if="item['klasa'] == klasa">{{ item['numer'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['numer'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['klasa'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['nazwa'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['kraj'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['rocznik'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['masc'] }}</td>
                    <td v-if="item['klasa'] == klasa">{{ item['plec'] }}</td>
                    <td @load="aktualizuj(item)" v-if="item['klasa'] == klasa">
                        Typ: {{ item['wynik']['noty'][1]['typ']+ item['wynik']['noty'][2]['typ']}}
                        <!-- {{ item['wynik'] }} -->
                    <!-- <td>{{ typsum }}</td> -->
                        Głowa: {{ item['wynik']['noty'][1]['glowa'] }}
                        Kłoda: {{ item['wynik']['noty'][1]['kloda'] }}
                        Nogi: {{ item['wynik']['noty'][1]['nogi'] }}
                        Ruch: {{ item['wynik']['noty'][1]['ruch']}}
                    </td>
                </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "PanelData",
        props: {
            msg: String
        },
        data: function () {
            return {
                klasy: {},
                component: "PanelData",
                konie: {},
                klasa: 1,
                glowasum: 0,
                klodasum: 0,
                nogisum: 0,
                ruchsum: 0,
                typsum: 0,
                wyniksum: 0
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
                        element.numer=index+1;
                });
            },
            aktualizuj(kon) {
                //let kon = this.kon;
                this.glowasum = 0;
                this.klodasum = 0;
                this.nogisum = 0;
                this.typsum = 0;
                this.ruchsum = 0;
                this.wyniksum = 0;
                let wyniki = this;
                kon["wynik"]["noty"].forEach(function (nota) {
                    wyniki.typsum = parseFloat(wyniki.typsum) + parseFloat(nota["typ"]);
                    wyniki.glowasum = parseFloat(wyniki.glowasum) + parseFloat(nota["glowa"]);
                    wyniki.klodasum = parseFloat(wyniki.klodasum) + parseFloat(nota["kloda"]);
                    wyniki.nogisum = parseFloat(wyniki.nogisum) + parseFloat(nota["nogi"]);
                    wyniki.ruchsum = parseFloat(wyniki.ruchsum) + parseFloat(nota["ruch"]);
                });
                wyniki.wyniksum = wyniki.glowasum + wyniki.klodasum + wyniki.nogisum + wyniki.typsum + wyniki.ruchsum;
            }
        },

        computed: {
            lista() {
                return this.klasy;
            }
        },

        created() {
            this.show();
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
