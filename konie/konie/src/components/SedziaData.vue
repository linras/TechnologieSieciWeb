<template>
    <div >
        <h1 >
            Sędziowie
        </h1>
         <router-link :to="{ name: 'sedzia', params: { id: lastIndex }}"> dodaj sedziego </router-link>
        <table >
                <tr>
                    <th>Numer</th>
                    <th>Sedzia</th>
                    <th>Kraj</th>
                    <th>Szczegóły</th>
                </tr>
                <tr v-for="item in sedzia" v-bind:key="item['id']">
                    <td>{{ item['id'] }}</td>
                    <td>{{ item['sedzia'] }}</td>
                    <td>{{ item['kraj'] }}</td>
                    <td>
                        <router-link :to="{ name: 'sedzia', params: { id: item['id'] }}">Edytuj</router-link>
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
                sedzia: null,
                lastIndex: 'new'
            };
        },
        methods: {
            fetchData: function () {
                this.$http.get("http://localhost:3000/sedziowie")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.sedzia = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        mounted () {
            this.fetchData();
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
