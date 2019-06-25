<template>
    <!--<div v-if="kon !== null && klasa !== null && sedziowieKlasy.length > 0" >-->
    <div >
        <table >
            
                <tr>
                    <th>Typ</th>
                    <th>Głowa</th>
                    <th>Kłoda</th>
                    <th>Nogi</th>
                    <th>Ruch</th>
                    <th>Sędziowie</th>
                </tr>
            
                <tr v-for="(item, index) in kon['wynik']['noty']" v-bind:key="item['$loki']">
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
                kon: {},
                klasa: {},
                klasy: {},
                konie: {},
                sedziowie: {},
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
            getKlasy() {
                //this.kon = this.$store.getters.getKon(this.id);
                //this.klasy = this.$store.getters.getKlasy;
                //this.konie = this.$store.getters.getKonie;
                //this.sedziowie = this.$store.getters.getSedziowie;
                this.konie.forEach((element) => {

                });
                console.log(this.konie);
                console.log(this.klasy);
                console.log(this.kon);
                this.klasy.forEach((element) => {
                    if (element["numer"] == this.kon["klasa"])
                        this.klasa = element;
                });
                this.klasa.getSedziowie();
                this.aktualizuj();
            },
            getSedziowie() {
                //funkcja do wyswietlania sedziow obok not
                this.sedziowieKlasy = [];//= this.sedziowieKlasy;
                let sedziowie = this.sedziowie;
                //console.log(this.klasa);
                this.klasa["komisja"].forEach((element) => {
                    sedziowie.forEach((sedzia) => {
                        if (element === sedzia["$loki"]) {
                            this.sedziowieKlasy.push(sedzia["sedzia"]);
                        }
                    });
                });
                //console.log(this.sedziowieKlasy);
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
                //tutaj zalacz do konia wyniki[suma, typsum, ruchsum, rozjemca?]

            }
        },
        created() {
            this.klasy = this.$store.getters.getKlasy;
            this.konie = this.$store.getters.getKonie;
            this.sedziowie = this.$store.getters.getSedziowie;
            this.konie.forEach((element) => {
                if (element["$loki"] == this.id)
                    this.kon = element;
            });
            this.klasy.forEach((element) => {
                if (element["numer"] == this.kon["klasa"])
                    this.klasa = element;
            });
            this.getSedziowie();
            this.aktualizuj();
            //this.getKlasy();
        }
    };
</script>

<style>

a {
  color: #42b983;
}


</style>
