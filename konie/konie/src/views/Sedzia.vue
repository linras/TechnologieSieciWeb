<template>
    <div class="sedzia">
        <SedziaData v-if="render"/>
    </div>
</template>

<script>
// @ is an alias to /src
    import SedziaData from "@/components/SedziaData.vue";

    export default {
        name: "sedzia",
        components: {
            SedziaData
        },
        data: function () {
            return {
                render: true
            };
        },
        sockets: {
            sedziaChanged: function (data) {
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
