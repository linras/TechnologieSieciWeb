<template>
    <div v-if="kon !== null">
        <div class="field is-grouped">
        </div>
        <div v-if="kon !== null">
            <div class="column">
                <div class="border">
                    <div v-if="kon !== null">
                        
                                <h3>Koń</h3>
                        <div >
                            <div class="field">
                                <div class="control">
                                    Numer <input v-model="kon['numer']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    Klasa <input v-model="kon['klasa']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    Nazwa <input v-model="kon['nazwa']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    Płeć <input v-model="kon['plec']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="field">
                                <div class="control">
                                    Kraj <input v-model="kon['kraj']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    Rocznik <input v-model="kon['rocznik']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    Masc <input v-model="kon['masc']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="kon !== null">
            <div class="column">
                <div class="border">
                    <div v-if="kon !== null" >
                            <div class="field">
                                <h3>Hodowca</h3>
                                <div class="control">
                                    Nazwa<input v-model="kon['hodowca']['nazwa']" class="input" type="text">
                                </div>
                                <div class="control">
                                    Kraj<input v-model="kon['hodowca']['kraj']" class="input" type="text">
                            </div>
                        </div>
                        <div>
                            <div class="field">
                                <h3>Właściciel</h3>
                                <div class="control">
                                    Nazwa<input v-model="kon['wlasciciel']['nazwa']" class="input" type="text">
                                </div>
                                <div class="control">
                                    Kraj<input v-model="kon['wlasciciel']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="kon !== null">
            <div class="column">
                <div class="border">
                    <h3>Rodowód</h3>
                    <div v-if="kon !== null">
                        <div>
                            <div class="field">
                                <div class="control">
                                    O nazwa <input v-model="kon['rodowod']['o']['nazwa']" class="input" type="text">
                                </div>
                                <div class="control">
                                    O kraj<input v-model="kon['rodowod']['o']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-specifics is-one-fifth">
                            <div class="field">
                                <div class="control">
                                     M nazwa<input v-model="kon['rodowod']['m']['nazwa']" class="input" type="text">
                                </div>
                                <div class="control">
                                    M kraj<input v-model="kon['rodowod']['m']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-specifics is-one-fifth">
                            <div class="field">
                                <div class="control">
                                    OM nazwa<input v-model="kon['rodowod']['om']['nazwa']" class="input" type="text">
                                </div>
                                <div class="control">
                                    OM kraj<input v-model="kon['rodowod']['om']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>
        <router-link to="/konie">
            <button class="button is-link">Powrót</button>
            <button v-if="!this.nowy" v-on:click="Edytuj">Edytuj</button>
            <button v-if="!this.nowy" v-on:click="Usun">Usuń</button>
            <button v-if="this.nowy" v-on:click="Dodaj">Dodaj</button>
        </router-link>
    </div>
    </div>
</template>

<script>
    export default {
        name: "KonDetails",
        props: {},
        data: function () {
            return {
                id: this.$route.params.id,
                konie: null,
                nowy:true,
                kon: {
                    "id": this.$route.params.id,
                    "numer": "",
                    "klasa": "",
                    "nazwa": "",
                    "kraj": "",
                    "rocznik": "",
                    "masc": "",
                    "plec": "",
                    "hodowca": {
                        "nazwa": "",
                        "kraj": ""
                    },
                    "wlasciciel": {
                        "nazwa": "",
                        "kraj": ""
                    },
                    "rodowod": {
                        "o": {
                            "nazwa": "",
                            "kraj": ""
                        },
                        "m": {
                            "nazwa": "",
                            "kraj": ""
                        },
                        "om": {
                            "nazwa": "",
                            "kraj": ""
                        }
                    },
                    "wynik": {
                        "noty": [
                            {
                                "typ": 0,
                                "glowa": 0,
                                "kloda": 0,
                                "nogi": 0,
                                "ruch": 0
                            },
                            {
                                "typ": 0,
                                "glowa": 0,
                                "kloda": 0,
                                "nogi": 0,
                                "ruch": 0
                            },
                            {
                                "typ": 0,
                                "glowa": 0,
                                "kloda": 0,
                                "nogi": 0,
                                "ruch": 0
                            },
                            {
                                "typ": 0,
                                "glowa": 0,
                                "kloda": 0,
                                "nogi": 0,
                                "ruch": 0
                            },
                            {
                                "typ": 0,
                                "glowa": 0,
                                "kloda": 0,
                                "nogi": 0,
                                "ruch": 0
                            },
                            {
                                "typ": 0,
                                "glowa": 0,
                                "kloda": 0,
                                "nogi": 0,
                                "ruch": 0
                            }
                        ]
                    }
                }//kon?
            };
        },
        methods: {
            Dodaj() {
                this.$store.dispatch("add", {
                    path: "konie",
                    ob: this.kon,
                    table: "konie"
                });
                this.$router.push("/admin/konie");
            },

            Edytuj() {
                this.$store.dispatch("edit", {
                    path: "konie",
                    ob: this.kon
                });
                this.$router.push("/admin/konie");
            },

            Usun() {
                console.log(this.kon);
                this.$store.dispatch("delete", {
                    path: "konie",
                    id: this.kon.$loki
                });
                this.$router.push("/admin/konie");
            }
        },
        computed: {
            lista() {

            }
        },
        created () {
            this.konie = this.$store.getters.getKonie;
            this.konie.forEach((element) => {
                if (element["$loki"] == this.id)
                    this.kon = element;
            });
            if (this.kon["nazwa"] != '')
                this.nowy = false;
            console.log(this.kon);
        },
        mounted () {
            console.log(this.$http);
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
