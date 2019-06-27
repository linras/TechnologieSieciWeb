<template>
    <div class="klasy">
        <KlasaData v-if="render"/>
    </div>
</template>

<script>
// @ is an alias to /src
    import KlasaData from "@/components/KlasaData.vue";

    export default {
        name: "klasy",
        components: {
            KlasaData
        },
        data: function () {
            return {
                render: true
            };
        },
        sockets: {
            klasaChanged: function (data) {
                setTimeout(() => {
                    this.render = false;
                }, 500);
                setTimeout(() => {
                    this.render = true;
                }, 500);
            }
        }
    };

</script>
