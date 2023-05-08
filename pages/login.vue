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
                        <input id="email" class="w-full rounded p-2 text-slate-900 dark:text-slate-100" type="email"
                            autocomplete="username" v-model="email" placeholder="Email" required />

                    </div>
                    <div class="mt-2">
                        <input id="password" class="w-full rounded p-2 text-slate-900 dark:text-slate-100" type="password"
                            autocomplete="current-password" v-model="password" placeholder="Password" required />

                    </div>
                    <div class="mt-2">
                        <button @click="login"
                            class="w-full rounded p-2 bg-slate-200 hover:bg-slate-300 border dark:border-none dark:bg-slate-700 dark:hover:bg-slate-500"
                            type="submit">Login</button>
                    </div>
                    <br />
                    <button @click="navigateTo('/register')"
                        class="w-full rounded p-2 bg-slate-200 hover:bg-slate-300 border dark:border-none dark:bg-slate-700 dark:hover:bg-slate-500">
                        Go to Register
                    </button>



                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    middleware: ["not-auth"]
});




const email = ref();
const password = ref();
const login_message = ref();
const login_button_label = ref("SIGN IN");

const login = async () => {
    login_button_label.value = "Loading...";

    await $fetch('/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }).then((data: any) => {
        if (data.success) {
            window.location.href = "/";
        } else {
            login_button_label.value = "SIGN IN";

            login_message.value = data.message;
        }
    }).catch((error) => {
        console.log(error);
        login_button_label.value = "Loading...";
    });
}
</script>
