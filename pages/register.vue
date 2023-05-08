<template >
    <title>Simple Season</title>
    <div class="flex flex-col items-center justify-center h-full -mt-9 indexPage">
        <h1> Register </h1>
        <div class="w-full max-w-md">
            <form @submit.prevent="register" class="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mt-2">
                    <input id="name" class="w-full rounded p-2 text-slate-900" type="text" v-model="name" placeholder="Name"
                        required />
                </div>
                <div class="mt-2">
                    <input id="surname" class="w-full rounded p-2 text-slate-900" type="text" v-model="surname"
                        placeholder="Surname" required />
                </div>
                <div class="mt-2">
                    <input id="email" class="w-full rounded p-2 text-slate-900" type="email" v-model="email"
                        placeholder="Email" required />
                </div>
                <div class="mt-2">
                    <input id="phone" class="w-full rounded p-2 text-slate-900" type="tel" v-model="phone"
                        placeholder="Phone" required />
                </div>
                <div class="mt-2">
                    <input id="password" class="w-full rounded p-2 text-slate-900" type="password" v-model="password"
                        placeholder="Password" required />
                </div>
                <div class="mt-2">
                    <input id="confirm-password" class="w-full rounded p-2 text-slate-900" type="password"
                        v-model="confirm_password" placeholder="Confirm Password" required />
                </div>
                <div class="mt-2">
                    <input id="birthday" class="w-full rounded p-2 text-slate-900" type="date" v-model="birthday"
                        placeholder="Birthday" required />
                </div>
                <div class="mt-2">
                    <input id="role" class="w-full rounded p-2 text-slate-900" type="text" v-model="role" placeholder="Role"
                        required />
                </div>
                <div class="mt-2">
                    <button
                        class="w-full rounded p-2 bg-slate-200 hover:bg-slate-300 border dark:border-none dark:bg-slate-700 dark:hover:bg-slate-500"
                        type="submit">Register</button>
                </div>

            </form>
            <button @click="navigateTo('/login')"
                class="w-full rounded p-2 bg-slate-200 hover:bg-slate-300 border dark:border-none dark:bg-slate-700 dark:hover:bg-slate-500">
                Go to Login
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["not-auth"],
    layout: "debug"
});

const name = ref();
const surname = ref();
const email = ref();
const phone = ref();
const password = ref();
const confirm_password = ref();
const register_message = ref();
const register_button_label = ref("REGISTER");
const birthday = ref();
const role = ref();

const register = async () => {
    register_button_label.value = "Loading...";

    await $fetch('/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            birthday: birthday.value,
            role: role.value
        })
    }).then((data: any) => {
        //On registration success
        if (data.success) {
            //Reset HTML elements
            register_button_label.value = "REGISTER";
            register_message.value = "Your Registration was Successful"

            //Reset Input fields
            name.value = null;
            surname.value = null;
            email.value = null;
            phone.value = null;
            password.value = null;
            confirm_password.value = null;
            birthday.value = null;
            role.value = null;
        } else {
            // Login failed
            register_button_label.value = "REGISTER";

            register_message.value = data.message;
        }
    }).catch((error) => {
        console.log(error);
        //Error
        register_button_label.value = "REGISTER";
    });
}
</script>

