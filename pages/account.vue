<template>
    <title>My profile</title>
    <div class="grid grid-cols-12 gap-1 h-full">


        <div class="bg-slate-800 text-slate-100">
            <Configbar />
        </div>
        <div class="col-span-3 p-4">
            <p class="text-slate-100 m-4">You are logged in as <span class="font-bold">{{ user?.email }}</span>.</p>

            <button class="p-2 border w-36 rounded m-4 hover:bg-slate-500" @click="toggleColorTheme"> {{ currentTheme ===
                'light' ? 'Dark' :
                'Light' }} </button>
            <button class="p-2 border w-36 rounded m-4 hover:bg-slate-500 " @click="logout">Logout</button>
        </div>

    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"],
});

const me = async () => {
    const token = useCookie('token').value || "";

    return await $fetch('/auth/me', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: token
        })
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

const { user } = await me();

const logout = async () => {
    let { success } = await $fetch('/auth/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
    if (success) {
        window.location.href = '/';
    }
}



</script>

<script>
export default {
    computed: {
        currentTheme() {
            return this.$colorMode.preference;
        },
    },
    methods: {
        toggleColorTheme() {
            const newTheme = this.currentTheme === "light" ? "dark" : "light";
            this.$colorMode.preference = newTheme;
        },
    },

};
</script>




