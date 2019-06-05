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
                    <button class="button is-link">POWRÓT</button>
                    <button v-on:click="handleSubmit" class="button is-link">EDYTUJ</button>
                    <button v-on:click="handleDelete" class="button is-link">USUŃ</button>
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
                klasa: {
                    "id": this.$route.params.id,
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
                sedziowie: null,
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
                document.getElementById("error-label").style.display = "none";
            }
        },
        created () {
            this.$http.get("http://localhost:3000/klasy/" + this.id)
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
        mounted () {
        }
    };
</script>

<style>

a {
  color: #42b983;
}

</style>
