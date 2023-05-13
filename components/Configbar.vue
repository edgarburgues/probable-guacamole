<template>
    <div class="flex flex-col justify-between h-screen sticky top-0 w-96 shadow-2xl">
        <ul class="">
            <img src="../assets/logo.webp" class="py-6">
            <li
                :class="active === 'dashboard' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <nuxt-link to="/account" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="material-symbols:account-circle-outline" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Configuración de cuenta
                        </span>
                    </p>
                </nuxt-link>
            </li>
            <li
                :class="active === 'courses' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500 '">
                <nuxt-link to="/notification" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="material-symbols:circle-notifications-outline-rounded" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Preferencias de notificación
                        </span>
                    </p>
                </nuxt-link>
            </li>
            <li
                :class="active === 'teachers' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <nuxt-link to="account/privacy" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="material-symbols:key-outline-rounded" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Configuración de privacidad
                        </span>
                    </p>
                </nuxt-link>
            </li>
            <li
                :class="active === 'students' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <nuxt-link to="account/interface" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="tabler:table-options" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Preferencias de interfaz
                        </span>
                    </p>
                </nuxt-link>
            </li>
            <li
                :class="active === 'bulletin' ? 'bg-emerald-500 hover:bg-emerald-600 font-bold' : 'bg-green-200 hover:bg-emerald-500'">
                <nuxt-link to="/security" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="material-symbols:back-hand-outline-rounded" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Configuración de seguridad
                        </span>
                    </p>
                </nuxt-link>
            </li>

        </ul>

        <ul>
            <li class="">
                <NuxtLink to="/" class="flex">
                    <p class="w-full pl-6 p-3">
                        <Icon name="ic:round-arrow-back" class="text-2xl" />
                        <span class="font-bold ml-2">
                            Inicio
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