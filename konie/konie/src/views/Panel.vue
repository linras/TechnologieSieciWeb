<template>
    <div class="panel">
        <PanelCrud/>
    </div>
</template>

<script>
// @ is an alias to /src
    import PanelData from "@/components/PanelData.vue";

    export default {
        name: "panel",
        components: {
            PanelCrud
        },
        data: function () {
            return {
                theComponent: "KonData",
                somethingWeWantToPass: {
                    test: "xd"
                }
            };
        },
        methods: {
            handleSwitchComponent (kon) {
                this.theComponent = "KonDetails";
                this.somethingWeWantToPass["kon"] = kon;
                console.log(kon);
            }
        }
    };

</script>
