<template>
    <div v-if="klasa !== null">
        <div v-if="klasa !== null">
            <div class="column">
                <div class="border">
                    <div v-if="klasa !== null">
                            <div class="field">
                                <label>Numer</label>
                                <div class="control">
                                    <input v-model="klasa['numer']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left">Kategoria</label>
                                <div class="control">
                                    <input v-model="klasa['kat']" class="input" type="text">
                                </div>
                            </div>
                        <div>
                            <div class="field">
                                <label>Komisja</label>
                                <div class="control">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <router-link to="/klasy">
                    <button v-on:click="handleSubmit" class="button is-link">OK</button>
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
                klasa: null,
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
                    }
                ]
            };
        },
        methods: {
            handleSubmit () {
                if (this.komisja[0]["id"] === this.komisja[1]["id"] || this.komisja[0]["id"] === this.komisja[2]["id"] || this.komisja[1]["id"] === this.komisja[2]["id"]) {
                    document.getElementById("error-label").style.display = "block";
                }
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
                let choice;
                if (event.srcElement.id === "pierwszy") {
                    choice = 0;
                } else if (event.srcElement.id === "drugi") {
                    choice = 1;
                } else if (event.srcElement.id === "trzeci") {
                    choice = 2;
                }

                sedziowie.forEach(function (sedzia) {
                    if (komisja[choice]["sedzia"] === sedzia["sedzia"]) {
                        komisja[choice]["id"] = sedzia["id"];
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.judge-table {
  margin-left: auto;
  margin-right: auto;
}
.kon-details,
.submit-button {
  margin-left: 15vh;
}
.kon-specifics {
  margin-left: 15vh;
}
.lower-label {
  font-size: 0.9rem;
}
.lower-input,
.lower-label {
  margin-left: 5px;
  margin-top: 5px;
}
.next-lower-label {
  font-size: 0.85rem;
}
.next-lower-input,
.next-lower-label {
  margin-left: 10px;
  margin-top: 5px;
}
.border {
    margin-left: 100px;
    margin-right: 100px;
    padding: 15px;
}
.label-title {
    margin-left: 140px;
}
</style>
