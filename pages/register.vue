<template>
    <title>Index | Capitol Formación Profesional</title>
    <div class="grid grid-cols-5 w-screen h-screen">
        <div class="w-full h-full relative col-span-4">
            <img src="../assets/bg_login.webp" class="absolute w-full h-full object-cover">
        </div>
        <div class="">
            <div class="flex flex-col justify-center items-center h-full p-6">
                <h1 class="text-2xl font-bold">Registro</h1>
                <div class="">
                    <form @submit.prevent="register" class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mt-2">
                            <input class="w-full rounded p-2 border-b-2" type="text" v-model="name" placeholder="Nombre"
                                required />
                        </div>
                        <div class="mt-2">
                            <input class="w-full rounded p-2 border-b-2" type="text" v-model="surname"
                                placeholder="Apellidos" required />
                        </div>
                        <div class="mt-2">
                            <input class="w-full rounded p-2 border-b-2" type="email" v-model="email"
                                placeholder="Correo electrónico" required />
                        </div>
                        <div class="mt-2">
                            <input class="w-full rounded p-2 border-b-2" type="tel" v-model="phone" placeholder="Teléfono"
                                required />
                        </div>
                        <div class="mt-2">
                            <input class="w-full rounded p-2 border-b-2" type="password" v-model="password"
                                placeholder="Contraseña" required />
                        </div>
                        <div class="mt-2">
                            <input class="w-full rounded p-2 border-b-2" type="date" v-model="birthday"
                                placeholder="Fecha de nacimiento" required />
                        </div>
                        <div class="mt-2">
                            <label for="sex">Rol:</label>
                            <select class="w-full rounded p-2 border-b-2" v-model="role" required>
                                <option value="" disabled selected>Seleccione una opción</option>
                                <option value="0">Administrador</option>
                                <option value="1">Profesor</option>
                                <option value="2">Alumno</option>
                            </select>
                        </div>
                        <div class="mt-2">
                            <label for="sex">Sexo:</label>
                            <select class="w-full rounded p-2 border-b-2" v-model="sex" required>
                                <option value="" disabled selected>Seleccione una opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="No especificado">No especificado</option>
                            </select>
                        </div>
                        <div class="mt-2">
                            <button class="bg-emerald-500 p-2 rounded-md w-full mt-2" type="submit">Registrarse</button>
                        </div>
                        <div class="mt-3">
                            <a href="/login" class="text-green-600">¿Ya tienes una cuenta? Inicia sesión</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["not-auth"],
});

const name = ref();
const surname = ref();
const email = ref();
const phone = ref();
const password = ref();
const birthday = ref();
const role = ref();
const sex = ref();

const register = async () => {
    await $fetch('/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // data to be sent
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            birthday: birthday.value,
            role: role.value,
            sex: sex.value
        })
    }).then((data: any) => {

        if (data.success) {
            //Reset Input fields
            name.value = '';
            surname.value = '';
            email.value = '';
            phone.value = '';
            password.value = '';
            birthday.value = '';

        } else {
            // Login failed
            console.log(data);
        }
    }).catch((error) => {
        console.log(error);
    });
}
</script>

