<template>
    <div v-if="klasa !== null">
        <div v-if="klasa !== null">
            <div class="column">
                <div class="border">
                    <div v-if="klasa !== null">
                            <div class="field">
                                <div class="control">
                                    Numer<input v-model="klasa['numer']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    Kategoria<input v-model="klasa['kat']" class="input" type="text">
                                </div>
                            </div>
                        <div>
                            <div class="field"> Komisja:
                                <div v-for="sedzia in sedziowie">
                                    <input type="checkbox" :id="sedzia.sedzia" :value="sedzia.$loki" v-model="checkedSedzia">
                                    <label for="sedzia['$loki']">{{sedzia['sedzia']}}</label>
                                </div>
                                <!--<div class="control">
                                    Komisja: <div v-for="item in klasa['sedziowie']"> {{item}} </div>
                                    <div class="select" @change="onSelectChange($event)">
                                        <select  v-for="item in klasa['komisja']" id="item[$loki]"  v-model="item['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['$loki']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <router-link to="/klasy">
                    <button>Powrót</button>
                    <button v-if="!this.nowy" v-on:click="Edytuj">Edytuj</button>
                    <button v-if="!this.nowy" v-on:click="Usun">Usuń</button>
                    <button v-if="this.nowy" v-on:click="Dodaj">Dodaj</button>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "KlasaDetails",
        props: {},
        data: function () {
            return {
                id: this.$route.params.id,
                nowy: true,
                sedziowie: {},
                checkedSedzia: [],
                klasy: {},
                klasa: {
                    "id": this.id,
                    "numer": "",
                    "kat": "",
                    "komisja": []
                },
                komisja: []
            };
        },
        methods: {
            Dodaj() {
                this.klasa["komisja"] = [];
                this.checkedSedzia.forEach((element, index) => {
                    this.klasa["komisja"][index] = element;
                });
                console.log(this.klasa);
                this.$store.dispatch("add", {
                    path: "klasy",
                    ob: this.klasa,
                    table: "klasy"
                });
                this.$router.push("/admin/klasy");
            },

            Edytuj() {
                this.klasa["komisja"] = [];
                this.checkedSedzia.forEach((element, index) => {
                    this.klasa["komisja"][index] = element;
                });
                console.log(this.klasa);
                this.$store.dispatch("edit", {
                    path: "klasy",
                    ob: this.klasa
                });
                this.$router.push("/admin/klasy");
            },

            Usun() {
                console.log(this.klasa);
                this.$store.dispatch("delete", {
                    path: "klasy",
                    id: this.klasa.$loki
                });
                this.$router.push("/admin/klasy");
            },
            //onSelectChange (event) {
            //    let sedziowie = this.sedziowie;
            //    let komisja = this.komisja;
            //    let wyb;
            //    if (event.srcElement.id === "pierwszy") {
            //        wyb = 0;
            //    } else if (event.srcElement.id === "drugi") {
            //        wyb = 1;
            //    } else if (event.srcElement.id === "trzeci") {
            //        wyb = 2;
            //    } else if (event.srcElement.id === "czwarty") {
            //        wyb = 2;
            //    }

            //    sedziowie.forEach(function (sedzia) {
            //        if (komisja[wyb]["sedzia"] === sedzia["sedzia"]) {
            //            komisja[wyb]["id"] = sedzia["$loki"];
            //        }
            //    });
            //    document.getElementById("error-label");//.style.display = "none";
            //}
        },
        created() {
            this.sedziowie = this.$store.getters.getSedziowie;
            this.klasy = this.$store.getters.getKlasy;
            this.klasy.forEach((element) => {
                if (element["$loki"] == this.id)
                    this.klasa = element;
            });
            //nowa klasa nie ma nr
            if (this.klasa["numer"] != '')
                this.nowy = false;
            this.klasa["komisja"].forEach((element, index) => {
                this.komisja[index] = element;
                this.checkedSedzia[index] = element;
            });
        },
        mounted () {
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
