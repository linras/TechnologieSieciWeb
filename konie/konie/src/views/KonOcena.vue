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
            
                <tr v-for="(item, index) in kon['wynik']['noty']"  v-if="(index < dlugosc)" v-bind:key="item['$loki']">
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
                    <td>{{ this.kon["wyniki"]["typsum"] }}</td>
                    <td>{{ this.kon["wyniki"]["glowasum"] }}</td>
                    <td>{{ this.kon["wyniki"]["klodasum"] }}</td>
                    <td>{{ this.kon["wyniki"]["nogisum"] }}</td>
                    <td>{{ this.kon["wyniki"]["ruchsum"] }}</td>
                </tr>
                <tr>
                    <th class="suma">SUMA TYP: {{ this.kon["wyniki"]["typsum"] }}</th>
                    <th></th><th></th><th></th>
                                      <th class="suma">SUMA RUCH: {{ this.kon["wyniki"]["ruchsum"] }}</th>
                </tr>
                <tr>
                    <th></th><th></th>
                             <th class="suma">SUMA WSZYSTKO: {{ this.kon["wyniki"]["wyniksum"] }}</th>
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
                dlugosc: 0, //na przypadkowe noty
                sedziowieKlasy: []
            };
        },
        sockets: {
            customEmit: function (data) {
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }
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
                            this.dlugosc++;
                        }
                    });
                });
                //console.log(this.sedziowieKlasy);
            },
            aktualizuj() {
                console.log("AKTUALIZACJA");
                this.kon["wyniki"]["glowasum"] = 0;
                this.kon["wyniki"]["klodasum"] = 0;
                this.kon["wyniki"]["nogisum"] = 0;
                this.kon["wyniki"]["typsum"] = 0;
                this.kon["wyniki"]["ruchsum"] = 0;
                this.kon["wyniki"]["wyniksum"] = 0;
                this.kon["wynik"]["noty"].forEach((nota) => {
                    this.kon["wyniki"]["typsum"] += parseFloat(nota["typ"]);
                    this.kon["wyniki"]["glowasum"] += parseFloat(nota["glowa"]);
                    this.kon["wyniki"]["klodasum"] += parseFloat(nota["kloda"]);
                    this.kon["wyniki"]["nogisum"] += parseFloat(nota["nogi"]);
                    this.kon["wyniki"]["ruchsum"] += parseFloat(nota["ruch"]);
                });
                this.kon["wyniki"]["wyniksum"] = this.kon["wyniki"]["typsum"] + this.kon["wyniki"]["glowasum"] + this.kon["wyniki"]["klodasum"] + this.kon["wyniki"]["nogisum"] + this.kon["wyniki"]["ruchsum"];
                //TODO: commit konia? Socket?

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
