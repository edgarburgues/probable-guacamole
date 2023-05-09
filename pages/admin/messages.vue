<template>
    <div class="grid grid-cols-12 gap-1">
        <AdminLeftbar />
        <div class="col-span-9 bg-slate-600">
            <!-- TODO: Crear componente de mensajes -->
            <!-- TODO: Función para obtener mensajes por ID de usuario-->
            <!-- TODO: Función para eliminar mensajes por ID de mensaje -->
            <!-- TODO: Función para marcar como leído por ID de mensaje -->
            <!-- TODO: Función para marcar como no leído por ID de mensaje -->
            <!-- TODO: Función para marcar como destacado -->

        </div>



    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
    layout: "admin",
});




</script>