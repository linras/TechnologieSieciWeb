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
                            <div class="field">
                                <div class="control">
                                    Komisja:
                                    <div class="select">
                                        <select id="pierwszy" @change="onSelectChange($event)" v-model="komisja[0]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                    <div class="select">
                                        <select id="drugi" @change="onSelectChange($event)" v-model="komisja[1]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                    <div class="select">
                                        <select id="trzeci" @change="onSelectChange($event)" v-model="komisja[2]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                    <div class="select">
                                        <select id="czwarty" @change="onSelectChange($event)" v-model="komisja[3]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                </div>
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
                klasy: {},
                klasa: {
                    //"id": this.$route.params.id,
                    "numer": "",
                    "kat": "",
                    "komisja": [
                    {
                        id: Number,
                        sedzia: String
                    },
                    {
                        id: Number,
                        sedzia: String
                    },
                    {
                        id: Number,
                        sedzia: String
                    },
                    {
                        id: Number,
                        sedzia: String
                    }
                    ]
                },
                komisja: [
                    {
                        id: Number,
                        sedzia: String
                    },
                    {
                        id: Number,
                        sedzia: String
                    },
                    {
                        id: Number,
                        sedzia: String
                    },
                    {
                        id: Number,
                        sedzia: String
                    }
                ]
            };
        },
        methods: {
            handleSubmit () {
                
                this.klasa["komisja"][0] = this.komisja[0]["id"];
                this.klasa["komisja"][1] = this.komisja[1]["id"];
                this.klasa["komisja"][2] = this.komisja[2]["id"];

                this.$http
                    .put(
                        "http://localhost:3000/klasy/" + this.id, this.klasa)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleDelete () {
                this.$http
                    .delete(
                        "http://localhost:3000/klasy/" + this.id, this.klasa)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            fetchSedziowie () {
                this.$http
                    .get("http://localhost:3000/sedziowie")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.sedziowie = data;
                        this.getKomisja();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            Dodaj() {
                console.log(this.klasa);
                this.$store.dispatch("add", {
                    path: "klasy",
                    ob: this.klasa,
                    table: "klasy"
                });
                this.$router.push("/admin/klasy");
            },

            Edytuj() {
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
            },
            getKomisja () {
                let klasa = this.klasa;
                let komisja = this.komisja;
                let sedziowie = this.sedziowie;
                let count = 0;
                klasa["komisja"].forEach(function (kom) {
                    komisja[count]["id"] = kom;
                    sedziowie.forEach(function (sedzia) {
                        if (komisja[count]["id"] === sedzia["id"]) {
                            komisja[count]["sedzia"] = sedzia["sedzia"];
                        }
                    });
                    count++;
                });
            },
            onSelectChange (event) {
                let sedziowie = this.sedziowie;
                let komisja = this.komisja;
                let wyb;
                if (event.srcElement.id === "pierwszy") {
                    wyb = 0;
                } else if (event.srcElement.id === "drugi") {
                    wyb = 1;
                } else if (event.srcElement.id === "trzeci") {
                    wyb = 2;
                } else if (event.srcElement.id === "czwarty") {
                    wyb = 2;
                }

                sedziowie.forEach(function (sedzia) {
                    if (komisja[wyb]["sedzia"] === sedzia["sedzia"]) {
                        komisja[wyb]["id"] = sedzia["id"];
                    }
                });
                //document.getElementById("error-label").style.display = "none";
            }
        },
        created() {
            this.sedziowie = this.$store.getters.getSedziowie;
            this.klasy = this.$store.getters.getKlasy;
            this.klasy.forEach((element) => {
                if (element["$loki"] == this.id)
                    this.klasa = element;
                //fetchsedziowie
            });
            if (this.klasa["numer"] != '')
                this.nowy = false;
            this.getSedzia();
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
