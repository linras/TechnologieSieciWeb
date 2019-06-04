<template>
    <div class="klasy">
        <KlasaCrud/>
    </div>
</template>

<script>
// @ is an alias to /src
    import KlasaData from "@/components/KlasaData.vue";

    export default {
        name: "klasy",
        components: {
            KlasaCrud
        }
    };

</script>
