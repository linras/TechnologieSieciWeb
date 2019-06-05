<template>
    <div v-if="kon !== null && klasa !== null && sedziowieKlasy.length > 0" >
        <table >
            
                <tr>
                    <th>Typ</th>
                    <th>Głowa</th>
                    <th>Kłoda</th>
                    <th>Nogi</th>
                    <th>Ruch</th>
                    <th>Sędziowie</th>
                </tr>
            
                
            
                <tr v-for="(item, index) in kon['wynik']['noty']" v-bind:key="item['id']">
                    <td>
                        <input @change="aktualizuj($event)" :tabindex=1 v-model="item['typ']">
                    </td>
                    <td>
                        <input @change="aktualizuj($event)" :tabindex=2 v-model="item['glowa']">
                    </td>
                    <td>
                        <input @change="aktualizuj($event)" :tabindex=3 v-model="item['kloda']">
                    </td>
                    <td>
                        <input @change="aktualizuj($event)" :tabindex=4 v-model="item['nogi']">
                    </td>
                    <td>
                        <input @change="aktualizuj($event)" :tabindex=5 v-model="item['ruch']">
                    </td>
                    <td>{{ sedziowieKlasy[index] }}</td>
                </tr>
                <tr>
                    <td>{{ typsum }}</td>
                    <td>{{ glowasum }}</td>
                    <td>{{ klodasum }}</td>
                    <td>{{ nogisum }}</td>
                    <td>{{ ruchsum }}</td>
                </tr>
                <tr>
                    <th class="suma">SUMA TYP: {{ typsum }}</th>
                    <th></th><th></th><th></th>
                    <th class="suma">SUMA RUCH: {{ ruchsum }}</th>
                </tr>
                <tr>
                    <th></th><th></th>
                    <th class="suma">SUMA WSZYSTKO: {{ wyniksum }}</th>
                </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "KonOcena",
        props: {},
        data: function () {
            return {
                id: this.$route.params.id,
                kon: null,
                klasa: null,
                sedziowie: null,
                check: 0,
                sedziowieKlasy: [],
                glowasum: Number,
                klodasum: Number,
                nogisum: Number,
                ruchsum: Number,
                typsum: Number,
                wyniksum: Number
            };
        },
        methods: {
            fetchKlasa () {
                this.$http.get("http://localhost:3000/klasy/" + this.kon["klasa"])
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        this.klasa = data;
                        this.fetchSedziowie();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            fetchSedziowie () {
                this.$http.get("http://localhost:3000/sedziowie/")
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        this.sedziowie = data;
                        this.getSedziowie();
                        this.aktualizuj();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getSedziowie () {
                let klasa = this.klasa;
                let sedziowieKlasy = this.sedziowieKlasy;
                let sedziowie = this.sedziowie;
                klasa["komisja"].forEach(function (komisja) {
                    sedziowie.forEach(function (sedzia) {
                        if (komisja === sedzia["id"]) {
                            sedziowieKlasy.push(sedzia["sedzia"]);
                        }
                    });
                });
            },
            aktualizuj () {
                let kon = this.kon;
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
        created () {
            this.$http.get("http://localhost:3000/konie/" + this.id)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    this.kon = data;
                    this.fetchKlasa();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        mounted () {
        }
    };
</script>

<style>

a {
  color: #42b983;
}


</style>
