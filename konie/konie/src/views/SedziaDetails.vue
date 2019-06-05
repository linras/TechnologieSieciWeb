<template>
        
        <div v-if="sedzia !== null">
            <div class="column">
                <div class="border">
                    <div v-if="sedzia !== null">
                        <div >
                            <div class="field">
                                <div class="control">
                                    Sędzia<input v-model="sedzia['sedzia']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div >
                            <div class="field">
                                <div class="control">
                                    Kraj<input v-model="sedzia['kraj']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            
        <router-link to="/sedziowie">
                <button>Powrót</button>
                <button v-on:click="handleSubmit">Edytuj</button>
                <button v-on:click="handleDelete">Usuń</button>
                <button v-on:click="handleCreate">Dodaj</button>
        </router-link>
    </div>
    
</template>

<script>
    export default {
        name: "SedzieDetails",
        props: {},
        data: function () {
            return {
                id: this.$route.params.id,
                sedzia: {"id":this.$route.params.id, "sedzia": "", "kraj": ""},
                sedziowie: null,
                loaded: Boolean
            };
        },
        methods: {
            handleSubmit () {
                this.$http
                    .put(
                        "http://localhost:3000/sedziowie/" + this.id, this.sedzia)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleCreate () {
                this.sedzia.id = this.sedziowie.lastIndex;
                this.$http
                    .post(
                        "http://localhost:3000/sedziowie", this.sedzia)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleDelete () {
                this.$http
                    .delete(
                        "http://localhost:3000/sedziowie/" + this.id, this.sedzia)
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
            this.$http.get("http://localhost:3000/sedziowie/" + this.id)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    this.sedzia = data;
                })
                .catch(error => {
                    console.log(error);
                });
            this.$http.get("http://localhost:3000/sedziowie/")
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    this.sedziowie = data;
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
