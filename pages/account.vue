<template>
    <div class="grid grid-cols-12 gap-1 h-full">
        <div class="col-span-2 h-full bg-slate-600">
        </div>
        <div class="col-span-10 h-full ">
            <div class="flex flex-col h-full p-4 ">
                <div class="border h-full w-full">
                    <!-- logout button -->
                    <div class="flex justify-end">
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            @click="logout">Logout</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "teacher"
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


