<template>
    <div v-if="klasa !== null">
        <div class="field is-grouped">
            <div class="control submit-button">
                <button v-on:click="handleSubmit" class="button is-link">Submit</button>
            </div>
        </div>
        <div v-if="klasa !== null" class="columns is-multiline is-12">
            <div class="column">
                <div class="border">
                    <div v-if="klasa !== null" class="columns is-multiline is-12">
                        <div class="column kon-details is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Numer</label>
                                <div class="control">
                                    <input v-model="klasa['numer']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-details is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Kategoria</label>
                                <div class="control">
                                    <input v-model="klasa['kat']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-details is-two-third">
                            <div class="field">
                                <label class="label has-text-left">Komisja</label>
                                <div class="control">
                                    <div class="select">
                                        <select id="sedzia-first" @change="onSelectChange($event)" v-model="komisja[0]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                    <div class="select">
                                        <select id="sedzia-second" @change="onSelectChange($event)" v-model="komisja[1]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                    <div class="select">
                                        <select id="sedzia-third" @change="onSelectChange($event)" v-model="komisja[2]['sedzia']">
                                            <option v-for="sedzia in sedziowie" v-bind:key="sedzia['id']">{{ sedzia['sedzia'] }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <label id="error-label" class="label has-text-left has-text-danger" style="display: none;">Nie może byc dwóch takich samych sędziów w komisji!</label>
                        </div>
                    </div>
                </div>
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
                if (event.srcElement.id === "sedzia-first") {
                    choice = 0;
                } else if (event.srcElement.id === "sedzia-second") {
                    choice = 1;
                } else if (event.srcElement.id === "sedzia-third") {
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
label {
    color: white;
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
    border: 1px solid black;
    margin-left: 100px;
    margin-right: 100px;
    padding: 15px;
    background-color: #23272A;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.label-title {
    margin-left: 140px;
}
</style>
