<template>
    <div v-if="kon !== null">
        <div class="field is-grouped">
            <div class="control submit-button">
                <button v-on:click="handleSubmit" class="button is-link">Submit</button>
            </div>
        </div>
        <div v-if="kon !== null" class="columns is-multiline is-12">
            <div class="column">
                <div class="border">
                    <div v-if="kon !== null" class="columns is-multiline is-12">
                        <div class="column kon-details is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Numer</label>
                                <div class="control">
                                    <input v-model="kon['numer']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left">Klasa</label>
                                <div class="control">
                                    <input v-model="kon['klasa']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left">Nazwa</label>
                                <div class="control">
                                    <input v-model="kon['nazwa']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left">Płeć</label>
                                <div class="control">
                                    <div class="select">
                                        <select v-model="kon['plec']">
                                            <option>kl.</option>
                                            <option>og.</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column kon-details is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Kraj</label>
                                <div class="control">
                                    <input v-model="kon['kraj']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left">Rocznik</label>
                                <div class="control">
                                    <input v-model="kon['rocznik']" class="input" type="text">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left">Masc</label>
                                <div class="control">
                                    <input v-model="kon['masc']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="kon !== null" class="columns is-multiline is-12">
            <div class="column">
                <div class="border">
                    <div v-if="kon !== null" class="columns is-multiline is-12">
                        <div class="column kon-specifics is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Hodowca</label>
                                <label class="label lower-label has-text-left">Nazwa</label>
                                <div class="control lower-input">
                                    <input v-model="kon['hodowca']['nazwa']" class="input" type="text">
                                </div>
                                <label class="label lower-label has-text-left">Kraj</label>
                                <div class="control lower-input">
                                    <input v-model="kon['hodowca']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-specifics is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Właściciel</label>
                                <label class="label lower-label has-text-left">Nazwa</label>
                                <div class="control lower-input">
                                    <input v-model="kon['wlasciciel']['nazwa']" class="input" type="text">
                                </div>
                                <label class="label lower-label has-text-left">Kraj</label>
                                <div class="control lower-input">
                                    <input v-model="kon['wlasciciel']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="kon !== null" class="columns is-multiline is-12">
            <div class="column">
                <div class="border">
                    <label class="label has-text-left label-title">Rodowód</label>
                    <div v-if="kon !== null" class="columns is-multiline is-12">
                        <div class="column kon-specifics is-one-fifth">
                            <div class="field">

                                <label class="label lower-label has-text-left">O</label>
                                <label class="label next-lower-label has-text-left">Nazwa</label>
                                <div class="control next-lower-input">
                                    <input v-model="kon['rodowod']['o']['nazwa']" class="input" type="text">
                                </div>
                                <label class="label next-lower-label has-text-left">Kraj</label>
                                <div class="control next-lower-input">
                                    <input v-model="kon['rodowod']['o']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-specifics is-one-fifth">
                            <div class="field">
                                <label class="label lower-label has-text-left">M</label>
                                <label class="label next-lower-label has-text-left">Nazwa</label>
                                <div class="control next-lower-input">
                                    <input v-model="kon['rodowod']['m']['nazwa']" class="input" type="text">
                                </div>
                                <label class="label next-lower-label has-text-left">Kraj</label>
                                <div class="control next-lower-input">
                                    <input v-model="kon['rodowod']['m']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-specifics is-one-fifth">
                            <div class="field">
                                <label class="label lower-label has-text-left">OM</label>
                                <label class="label next-lower-label has-text-left">Nazwa</label>
                                <div class="control next-lower-input">
                                    <input v-model="kon['rodowod']['om']['nazwa']" class="input" type="text">
                                </div>
                                <label class="label next-lower-label has-text-left">Kraj</label>
                                <div class="control next-lower-input">
                                    <input v-model="kon['rodowod']['om']['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                kon: null,
                loaded: Boolean
            };
        },
        methods: {
            handleSubmit () {
                this.$http
                    .put(
                        "http://localhost:3000/konie/" + this.id, this.kon)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        created () {
            this.$http.get("http://localhost:3000/konie/" + this.id)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    this.kon = data;
                })
                .catch(error => {
                    console.log(error);
                });
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
