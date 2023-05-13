<script setup lang="ts">



const credentials = reactive({
    email: '',
    password: '',
});


</script>

<template >
    <title>Simple Season</title>
    <div class="flex flex-col items-center justify-center h-full -mt-9 indexPage">
        <h1> Register </h1>
        <div class="w-full max-w-md">
            <form @submit.prevent="" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <input v-model="credentials.email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" placeholder="email" />
                </div>
                <div class="mb-6">
                    <input v-model="credentials.password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Password" />
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#">Forgot Password?</a>
                </div>
            </form>
        </div>
    </div>
</template>