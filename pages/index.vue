
<template>
    <title>Index | Capitol Formación Profesional</title>
    <div class="grid grid-cols-5 h-full">
        <div class="col-span-4 flex justify-center items-center">
            <h1 class="text-5xl font-bold">Simple Season</h1>
        </div>
        <div class="bg-slate-200 dark:bg-slate-600">
            <div class="flex flex-col justify-center items-center h-full">
                <h1 class="text-2xl font-bold">Login</h1>
                <div class=" w-5/6">
                    <div class="mt-2">
                        <input v-model="credentials.email" class="w-full rounded p-2 text-slate-900" type="email"
                            placeholder="email" />
                    </div>
                    <div class="mt-2">
                        <input v-model="credentials.password" class="w-full rounded p-2 text-slate-900" type="password"
                            placeholder="password" />
                    </div>
                    <div class="mt-2">
                        <button @click="login"
                            class="w-full rounded p-2 bg-slate-200 hover:bg-slate-300 border dark:border-none dark:bg-slate-700 dark:hover:bg-slate-500"
                            type="submit">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script setup lang="ts">

definePageMeta({
    layout: 'default',
})

const credentials = reactive({
    email: '',
    password: ''
})



</script>
 