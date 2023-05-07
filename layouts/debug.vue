<template>
    <div class="h-screen max-h-screen flex flex-col dark:bg-slate-900 dark:text-white adminLayout">
        <nav class="p-4 flex justify-between items-center ">
            <img class="w-52" src="~/assets/logo.webp" alt="Nuxt.js" />

            <h1 class="font-bold text-3xl">DEBUG</h1>

            <div>
                <!-- TODO: Add config button -->
                <h1 class="font-bold text-3xl">Config button</h1>
            </div>

        </nav>
        <hr>
        <main class="h-full">
            <slot />
        </main>
    </div>
</template>