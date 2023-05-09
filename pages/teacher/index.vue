<template>
    <div class="grid grid-cols-12 gap-1 h-full">
        <TeacherLeftbar />
        <div class="col-span-10 bg-slate-600 flex justify-center items-center">
            <h1 class="text-2xl text-center">Welcome, <span class="font-bold">{{ user?.name }} </span></h1>
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


</script>


