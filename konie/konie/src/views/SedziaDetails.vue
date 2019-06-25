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
                <button v-if="!this.nowy" v-on:click="Edytuj">Edytuj</button>
                <button v-if="!this.nowy" v-on:click="Usun">Usuń</button>
                <button v-if="this.nowy" v-on:click="Dodaj">Dodaj</button>
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
                sedzia: { "id": this.$route.params.id, "sedzia": "", "kraj": "" },
                nowy: true,
                sedziowie: null
            };
        },
        methods: {
            Dodaj() {
                console.log(this.sedzia);
                this.$store.dispatch("add", {
                    path: "sedziowie",
                    ob: this.sedzia,
                    table: "sedziowie"
                });
                this.$router.push("/admin/sedziowie");
            },

            Edytuj() {
                console.log(this.sedzia);
                this.$store.dispatch("edit", {
                    path: "sedziowie",
                    ob: this.sedzia
                });
                this.$router.push("/admin/sedziowie");
            },

            Usun() {
                console.log(this.sedzia);
                this.$store.dispatch("delete", {
                    path: "sedziowie",
                    id: this.sedzia.$loki
                });
                this.$router.push("/admin/sedziowie");
            }
        },
        created() {
            this.sedziowie = this.$store.getters.getSedziowie;
            this.sedziowie.forEach((element) => {
                if (element["$loki"] == this.id)
                    this.sedzia = element;
            });
            if (this.sedzia["sedzia"] != '')
                this.nowy = false;
            console.log(this.sedzia);

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
