<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <AdminLeftbar active="teachers" />
        <div class="flex flex-col w-full p-6 bg-gray-100">
            <h1 class="text-2xl font-bold">ID Profesor: {{ teacherID }}</h1>


            <form @submit.prevent="register" class="flex flex-col gap-3 p-6 bg-b-300 mt-3 w-fit rounded-xl shadow-2xl">


                <input class="hidden" type="text" v-model="id" />
                <div class="">
                    <input class="w-full rounded p-2 border-b-2" type="text" v-model="name" placeholder="Nombre" required />
                </div>
                <div class="mt-2">
                    <input class="w-full rounded p-2 border-b-2" type="text" v-model="surname" placeholder="Apellidos"
                        required />
                </div>
                <div class="mt-2">
                    <input class="w-full rounded p-2 border-b-2" type="email" v-model="email"
                        placeholder="Correo electrónico" required />
                </div>
                <div class="mt-2">
                    <input class="w-full rounded p-2 border-b-2" type="password" v-model="password" placeholder="Contraseña"
                        required />
                </div>

                <div class="flex">
                    <input id="tel" class="w-full rounded p-2 border-b-2" type="tel" v-model="phone" placeholder="Teléfono"
                        required ref="telInput" />
                    <button type="button" @click="generateRandom('tel')"
                        class="bg-blue-500 text-white rounded-xl w-24 ml-3 font-semibold">
                        random
                    </button>
                </div>
                <div class="">
                    <label for="birthDate" class="ml-2">Fecha de nacimiento:</label>
                    <div class="flex">
                        <input id="birthDate" class="w-full rounded p-2 border-b-2" type="date" v-model="birthday"
                            placeholder="Fecha de nacimiento" required />
                        <button type="button" @click="generateRandom('fecha')"
                            class="bg-blue-500 text-white rounded-xl w-24 ml-3 font-semibold">
                            random
                        </button>
                    </div>
                </div>
                <div class="">
                    <label for="sex" class="ml-2">Sexo:</label>
                    <select class="w-full rounded p-2 border-b-2" v-model="sex" required>
                        <option value="" disabled selected>
                            -- Selecciona un usuario --
                        </option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="No especificado">No especificado</option>
                    </select>
                </div>
                <div class="mt-2">
                    <button class="bg-green-500 font-semibold p-2 rounded-md w-full mt-2" type="submit">
                        Guardar profesor
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
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
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

const { user } = await me();

const teacherID = useRoute().params.id;

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthday: string;
    sex: string;
}

const id = ref();
const name = ref();
const surname = ref();
const email = ref();
const phone = ref();
const password = ref();
const birthday = ref();
const sex = ref();

const register = async () => {
    await updateUser(id.value, name.value, surname.value, email.value, phone.value, birthday.value, sex.value);
}

const updateUser = async (id: any, name: any, surname: any, email: any, phone: any, birthday: any, sex: any) => {
    const response = await $fetch('/api/users/updateUserByID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, surname, email, phone, birthday, sex })
    });
    return response;
}

async function getUserById(id: string): Promise<User | null> {
    try {
        const response = await $fetch('/api/users/getUserByID', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        if (response) {
            const user: User = {
                id: id,
                name: response[0].name,
                surname: response[0].surname,
                email: response[0].email,
                phone: response[0].phone,
                birthday: new Date(response[0].birthday).toISOString().split('T')[0],
                sex: response[0].sex
            };
            return user;
        } else {
            console.log("No data");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function editUser(idParam: any) {
    const user = await getUserById(idParam);
    if (user) {
        id.value = user.id;
        name.value = user.name;
        surname.value = user.surname;
        email.value = user.email;
        phone.value = user.phone;
        birthday.value = user.birthday;
        sex.value = user.sex
    }
}

// TODO: Implementar botón de 'Clear'

//////////////////////////////////////////////////////////////
////////////////////////// HELPERS //////////////////////////
/////////////////////////////////////////////////////////////

function normalizeDate(date: string) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
}

function generateRandom(campo: string) {
    if (campo === 'tel') {
        const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(10, '6');
        this.phone = randomNumber.substring(0, 9);
    } else if (campo === 'fecha') {
        const randomDate = new Date(+new Date(1970, 0, 1) + Math.random() * (new Date(2002, 0, 1).getTime() - new Date(1970, 0, 1).getTime()));
        this.birthday = randomDate.toISOString().split('T')[0];

    }
}

onMounted(async () => {
    editUser(teacherID);
});



</script>