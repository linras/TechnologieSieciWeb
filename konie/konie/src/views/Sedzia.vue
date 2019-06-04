<template>
    <div class="sedzia">
        <SedziaCrud/>
    </div>
</template>

<script>
// @ is an alias to /src
    import SedziaData from "@/components/SedziaData.vue";

    export default {
        name: "sedzia",
        components: {
            SedziaCrud
        }
    };

</script>
