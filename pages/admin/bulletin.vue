<template>
    <div class="grid grid-cols-12 gap-1">
        <AdminLeftbar />
        <div class="col-span-9 bg-slate-600">
            Bulletin
        </div>



    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
    layout: "admin",
});





</script>