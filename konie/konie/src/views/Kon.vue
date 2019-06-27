<template>
    <div class="kon">
        <KonData v-if="render"/>
    </div>
</template>

<script>
// @ is an alias to /src
    import KonData from "@/components/KonData.vue";

    export default {
        name: "Kon",
        components: {
            KonData
        },
        data: function () {
            return {
                render: true
            };
        },
        sockets: {
            ocenEmit: function (data) {
                //console.log('this method was fired by ("ocenEmit", data)')
                setTimeout(() => {
                    this.render = false;
                }, 500);
                this.render = false;
                setTimeout(() => {
                    this.render = true;
                }, 500);
            }
        }
        //data: function () {
        //    return {
        //        theComponent: "KonData"
        //    };
        //},
        //methods: {
        //    handleSwitchComponent (kon) {
        //        this.theComponent = "KonDetails";
        //        console.log(kon);
        //    }
        //}
    };

</script>
