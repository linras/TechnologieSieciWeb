<template>
    <div v-if="sedzia !== null">
        <div class="field is-grouped">
            <div class="control submit-button">
                <button v-on:click="handleSubmit" class="button is-link">Submit</button>
            </div>
        </div>
        <div v-if="sedzia !== null" class="columns is-multiline is-12">
            <div class="column">
                <div class="border">
                    <div v-if="sedzia !== null" class="columns is-multiline is-12">
                        <div class="column kon-details is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Sędzia</label>
                                <div class="control">
                                    <input v-model="sedzia['sedzia']" class="input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="column kon-details is-one-third">
                            <div class="field">
                                <label class="label has-text-left">Kraj</label>
                                <div class="control">
                                    <input v-model="sedzia['kraj']" class="input" type="text">
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
        name: "SedzieDetails",
        props: {},
        data: function () {
            return {
                id: this.$route.params.id,
                sedzia: null,
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
