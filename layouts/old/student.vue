<script setup lang="ts">

const accountPage = () => {
    navigateTo('../account');
}

</script>


<template>
    <div class="h-screen max-h-screen flex flex-col dark:bg-slate-900 dark:text-white adminLayout">
        <nav class="p-4 flex justify-between items-center ">
            <img class="w-52" src="~/assets/logo.webp" alt="Nuxt.js" />
            <h1 class="text-2xl font-bold">Student Panel</h1>

            <button @click="accountPage">
                Configuración
            </button>

        </nav>
        <hr>
        <main class="h-full">
            <slot />
        </main>
    </div>
</template>