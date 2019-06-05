<template>
    <div class="kon">
        <KonData/>
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
