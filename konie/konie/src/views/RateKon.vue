<template>
    <div v-if="kon !== null && klasa !== null && sedziowieKlasy.length > 0" class="column is-centered">
        <table class="table is-bordered horse-table is-bordered is-stripped">
            <thead>
                <tr>
                    <th>Głowa</th>
                    <th>Kloda</th>
                    <th>Nogi</th>
                    <th>Ruch</th>
                    <th>Typ</th>
                    <th>Sędzia</th>
                </tr>
            </thead>
            <tfoot>
                <tr class="has-text-centered">
                    <th colspan="6" class="has-text-centered">{{ finalSum }}</th>
                </tr>
            </tfoot>

            <tbody >
                <tr v-for="(item, index) in kon['wynik']['noty']" v-bind:key="item['id']">
                    <td>
                        <input @change="updateScore($event)" :tabindex=1 v-model="item['glowa']">
                    </td>
                    <td>
                        <input @change="updateScore($event)" :tabindex=2 v-model="item['kloda']">
                    </td>
                    <td>
                        <input @change="updateScore($event)" :tabindex=3 v-model="item['nogi']">
                    </td>
                    <td>
                        <input @change="updateScore($event)" :tabindex=4 v-model="item['ruch']">
                    </td>
                    <td>
                        <input @change="updateScore($event)" :tabindex=5 v-model="item['typ']">
                    </td>
                    <td>{{ sedziowieKlasy[index] }}</td>
                </tr>
                <tr>
                    <td>{{ sumaGlowa }}</td>
                    <td>{{ sumaKloda }}</td>
                    <td>{{ sumaNogi }}</td>
                    <td>{{ sumaRuch }}</td>
                    <td>{{ sumaTyp }}</td>
                    <td>Sędzia</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "RateKon",
        props: {},
        data: function () {
            return {
                id: this.$route.params.id,
                kon: null,
                klasa: null,
                sedziowie: null,
                check: 0,
                sedziowieKlasy: [],
                sumaGlowa: Number,
                sumaKloda: Number,
                sumaNogi: Number,
                sumaRuch: Number,
                sumaTyp: Number,
                finalSum: Number
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
            },
            fetchKlasa () {
                this.$http.get("http://localhost:3000/klasy/" + this.kon["klasa"])
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
            fetchSedziowie () {
                this.$http.get("http://localhost:3000/sedziowie/")
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        this.sedziowie = data;
                        this.getSedziowie();
                        this.updateScore();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getSedziowie () {
                let klasa = this.klasa;
                let sedziowieKlasy = this.sedziowieKlasy;
                let sedziowie = this.sedziowie;
                klasa["komisja"].forEach(function (komisja) {
                    sedziowie.forEach(function (sedzia) {
                        if (komisja === sedzia["id"]) {
                            sedziowieKlasy.push(sedzia["sedzia"]);
                        }
                    });
                });
            },
            updateScore () {
                let kon = this.kon;
                this.sumaGlowa = 0;
                this.sumaKloda = 0;
                this.sumaNogi = 0;
                this.sumaTyp = 0;
                this.sumaRuch = 0;
                this.finalSum = 0;
                let self = this;
                kon["wynik"]["noty"].forEach(function (nota) {
                    self.sumaGlowa = parseFloat(self.sumaGlowa) + parseFloat(nota["glowa"]);
                    self.sumaKloda = parseFloat(self.sumaKloda) + parseFloat(nota["kloda"]);
                    self.sumaNogi = parseFloat(self.sumaNogi) + parseFloat(nota["nogi"]);
                    self.sumaTyp = parseFloat(self.sumaTyp) + parseFloat(nota["typ"]);
                    self.sumaRuch = parseFloat(self.sumaRuch) + parseFloat(nota["ruch"]);
                });
                self.finalSum = self.sumaGlowa + self.sumaKloda + self.sumaNogi + self.sumaTyp + self.sumaRuch;
            }
        },
        created () {
            this.$http.get("http://localhost:3000/konie/" + this.id)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    this.kon = data;
                    this.fetchKlasa();
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
  background-color: #23272a;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.label-title {
  margin-left: 140px;
}
.horse-table {
  margin-left: auto;
  margin-right: auto;
}
table {
  background-color: #1e2024;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
table thead tr th {
  color: white;
  font-size: 18px;
}
table tfoot tr th {
  color: white;
  font-size: 18px;
}
table tbody tr td {
  color: white;
  font-size: 16px;
}
input {
    font-size: 15px;
}
.sum {
    text-align: center;
}

</style>
