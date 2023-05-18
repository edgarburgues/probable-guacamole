<template>
    <title>Index | Capitol Formación Profesional</title>
    <div class="grid grid-cols-5 w-screen h-screen">
        <div class="w-full h-full relative col-span-4">
            <img src="../assets/bg_login.webp" class="absolute w-full h-full object-cover">
        </div>
        <div class="">
            <div class="flex flex-col justify-center items-center h-full p-6">
                <h1 class="text-2xl font-bold">Login</h1>
                <div class="w-full">
                    <div class="">
                        <input id="email" class="w-full rounded p-2 " type="email" autocomplete="username" v-model="email"
                            placeholder="Email" required />

                    </div>
                    <div class="mt-2">
                        <input id="password" class="w-full rounded p-2" type="password" autocomplete="current-password"
                            v-model="password" placeholder="Password" required />

                    </div>
                    <div class="mt-2">
                        <button @click="login" class="w-full rounded p-2 border" type="submit">Login</button>
                    </div>
                    <br />
                    <button @click="navigateTo('/register')" class="w-full rounded p-2 border">
                        Go to Register
                    </button>


                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    middleware: ["not-auth"],
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
