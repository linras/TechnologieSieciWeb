<template>
    <div >
        <h1 >
            Sędziowie
        </h1>
         <router-link :to="{ name: 'sedziowieEdit', params: { id: lastIndex }}"> dodaj sedziego </router-link>
        <table >
                <tr>
                    <th>Numer</th>
                    <th>Sedzia</th>
                    <th>Kraj</th>
                    <th></th>
                </tr>
                <tr v-for="item in lista" v-bind:key="item['$loki']">
                    <td>{{ item['$loki'] }}</td>
                    <td>{{ item['sedzia'] }}</td>
                    <td>{{ item['kraj'] }}</td>
                    <td>
                        <router-link :to="{ name: 'sedzia', params: { id: item['$loki'] }}">Details</router-link>
                    </td>
                </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "SedziaData",
        props: {
            msg: String
        },
        data: function () {
            return {
                sedziowie: {},
                lastIndex: 'new'
            };
        },
        methods: {
            show: function () {
                this.sedziowie = this.$store.getters.getSedziowie;
            }
        },

        computed: {
            lista() {
                return this.sedziowie;
            }
        },

        created() {
            this.show();
        }
    };
</script>

<style>
a {
  color: #42b983;
}
table {
    margin: auto;
}
</style>
