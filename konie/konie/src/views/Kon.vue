<template>
    <div class="kon">
        <KonCrud/>
    </div>
</template>

<script>
// @ is an alias to /src
    import KonData from "@/components/KonData.vue";

    export default {
        name: "Kon",
        components: {
            KonCrud
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
