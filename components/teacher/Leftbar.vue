<template>
    <div class="flex flex-col justify-between h-screen sticky top-0 w-72 shadow-2xl">
        <ul class="">
            <img src="../../assets/logo.webp" class="py-6">
            <li
                :class="active === 'dashboard' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/" class="">
                    <p class="w-full pl-6 p-3 flex items-center">
                        <Icon name="material-symbols:monitor-outline" class="text-2xl" />
                        <span class="ml-2">
                            Inicio
                        </span>
                    </p>
                </NuxtLink>
            </li>
            <li
                :class="active === 'subjects' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/teacher/subjects" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="material-symbols:menu-book-outline" class="text-2xl" />
                        <span class="ml-2">
                            Mis asignaturas
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'absences' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="maki:doctor" class="text-2xl" />
                        <span class="ml-2">
                            Justificantes
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'bulletin' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="mdi:bulletin-board" class="text-2xl" />
                        <span class="ml-2">
                            Bulletin
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'messages' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/teacher/messages" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="material-symbols:chat-bubble-outline" class="text-2xl" />
                        <span class="ml-2">
                            Messages
                        </span>
                    </p>

                </NuxtLink>
            </li>

        </ul>

        <ul>
            <li class="">
                <NuxtLink to="../account" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="ic:round-personal-video" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Cuenta
                        </span>
                    </p>
                </NuxtLink>
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    active: {
        type: String,
        required: true
    }
})


</script>

