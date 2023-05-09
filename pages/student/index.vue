<template>
    <div class="grid grid-cols-12 gap-1 h-full">
        <studentLeftbar />
        <div class="col-span-9 bg-slate-600 flex justify-center items-center">
            <h1 class="text-2xl text-center">Welcome,<br /> <span class="font-bold">{{ user?.email }} </span></h1>
        </div>
    </div>
</template>

<script setup lang="ts">


definePageMeta({

    layout: "student",
});
</script>


