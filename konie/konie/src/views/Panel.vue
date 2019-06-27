<template>
    <div class="panel">
        <PanelData v-if="render"/>
    </div>
</template>

<script>
// @ is an alias to /src
    import PanelData from "@/components/PanelData.vue";

    export default {
        name: "panel",
        components: {
            PanelData
        },
        data: function () {
            return {
                render: true
            };
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            //dobry timeout
            ocenEmit: function (data) {
                console.log('this method was fired by ("ocenEmit", data)')
                setTimeout(() => {
                    this.render = false;
                }, 500);
                setTimeout(() => {
                    this.render=true;
                }, 500);
            },
            pointsEmit: function (data) {
                console.log('this method was fired by ("pointsEmit", data)')
                this.render = false;
                this.$nextTick(() => {
                    this.render = true;
                });
            }
        }//,
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
