<template>
    <div class="panel">
        <PanelData/>
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
                theComponent: "KonData"
            };
        },
        methods: {
            handleSwitchComponent (kon) {
                this.theComponent = "KonDetails";
                console.log(kon);
            }
        }
    };

</script>
