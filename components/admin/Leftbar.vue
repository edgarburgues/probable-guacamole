<template>
    <div class="flex flex-col justify-between h-screen sticky top-0 w-72 shadow-2xl">
        <ul class="">
            <img src="../../assets/logo.webp" class="py-6">
            <li
                :class="active === 'dashboard' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/admin" class="">
                    <p class="w-full pl-6 p-3 flex items-center">
                        <Icon name="material-symbols:monitor-outline" class="text-2xl" />
                        <span class="ml-2">
                            Inicio
                        </span>
                    </p>
                </NuxtLink>
            </li>
            <li
                :class="active === 'courses' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500 '">
                <NuxtLink to="/admin/courses" class="flex">
                    <!-- <p class="w-full pl-6 p-3 hover:shadow-green-900 hover:shadow-inner"> -->
                    <p class="w-full pl-6 p-3">
                        <Icon name="material-symbols:door-front-outline" class="text-2xl" />
                        <span class="ml-2">
                            Cursos
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'teachers' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/admin/teachers" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="material-symbols:menu-book-outline" class="text-2xl" />
                        <span class="ml-2">
                            Profesorado
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'students' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/admin/students" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="material-symbols:school-outline" class="text-2xl" />
                        <span class="ml-2">
                            Estudiantes
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'bulletin' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/admin/bulletin" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="mdi:bulletin-board" class="text-2xl" />
                        <span class="ml-2">
                            Boletín
                        </span>
                    </p>

                </NuxtLink>
            </li>
            <li
                :class="active === 'messages' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <NuxtLink to="/admin/messages" class="flex">
                    <p class=" w-full pl-6 p-3">
                        <Icon name="material-symbols:chat-bubble-outline" class="text-2xl" />
                        <span class="ml-2">
                            Mensajes
                        </span>
                    </p>

                </NuxtLink>
            </li>

        </ul>

        <ul>
            <li class="">
                <NuxtLink to="/account" class="flex">
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

