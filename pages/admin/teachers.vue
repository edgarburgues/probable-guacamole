<template>
    <title>Teacher Management | Capitol Formación Profesional </title>
    <div class="flex min-h-full">
        <AdminLeftbar active="teachers" />

        <div class="flex flex-col w-full p-6 bg-gray-100">
            <div class="p-4">
                <form @submit.prevent="register" class="bg-emerald-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mt-2">
                        <input id="id" class="hidden" type="text" v-model="id" placeholder="id" />
                    </div>
                    <div class="mt-2">
                        <input id="name" class="w-full rounded p-2" type="text" v-model="name" placeholder="Name"
                            required />
                    </div>
                    <div class="mt-2">
                        <input id="surname" class="w-full rounded p-2" type="text" v-model="surname" placeholder="Surname"
                            required />
                    </div>
                    <div class="mt-2">
                        <input id="email" class="w-full rounded p-2" type="email" v-model="email" placeholder="Email"
                            required />
                    </div>
                    <div class="mt-2">
                        <input id="phone" class="w-full rounded p-2" type="tel" v-model="phone" placeholder="Phone"
                            required />
                    </div>
                    <div class="mt-2">
                        <input id="birthday" class="w-full rounded p-2" type="date" v-model="birthday"
                            placeholder="Birthday" required />
                    </div>
                    <div class="mt-2">
                        <button class="w-full rounded p-2 " type="submit">
                            Save Teacher
                        </button>
                    </div>
                </form>
            </div>
            <div class="p-4">
                <table class="rounded-xl bg-emerald-400 flex flex-col">
                    <thead class="bg-emerald-500 rounded-t-xl">
                        <tr class="flex justify-between">
                            <th class="px-4 py-2 hidden">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Surname</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Phone</th>
                            <th class="px-4 py-2">Birthday</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(teacher, index) in teachers" :key="teacher.id" class=" flex justify-between"
                            :class="index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'">
                            <td class=" px-4 py-2 hidden">{{ teacher.id }}</td>
                            <td class="flex items-center px-4 py-2">{{ teacher.name }}</td>
                            <td class="flex items-center px-4 py-2">{{ teacher.surname }}</td>
                            <td class="flex items-center px-4 py-2">{{ teacher.email }}</td>
                            <td class="flex items-center px-4 py-2">{{ teacher.phone }}</td>
                            <td class="flex items-center px-4 py-2">{{ normalizeDate(teacher.birthday) }}</td>
                            <td class="flex items-center grid gap-2 grid-cols-2 p-2">
                                <button class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded"
                                    @click="editUser(teacher.id)">
                                    <Icon name="fa6-solid:pencil" />
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                                    @click="deleteUser(teacher.id)">
                                    <Icon name="fa6-solid:trash-can" />
                                </button>
                            </td>
                        </tr>
                        <tr class="w-full bg-emerald-500 flex h-9 rounded-b-xl " />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

definePageMeta({
    middleware: ["auth"],
    // layout: "admin"
});

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthday: string;
}

const id = ref();
const name = ref();
const surname = ref();
const email = ref();
const phone = ref();
const birthday = ref();
const teachers = ref([]);

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

const getUsersByRole = async () => {
    try {
        const response = await fetch("/api/users/getUsersByRole", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role: "1",
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id: any, name: any, surname: any, email: any, phone: any) => {
    const response = await $fetch('/api/users/updateUserByID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, surname, email, phone })
    });
    return response;
}

const createUser = async (name: any, surname: any, email: any, phone: any, birthday: any) => {
    const response = await $fetch('/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            surname,
            email,
            phone,
            password: 'changemeImaTeacher',
            birthday,
            role: '1'
        })
    });
    return response;
}

const register = async () => {
    if (id.value) {
        const response = await updateUser(id.value, name.value, surname.value, email.value, phone.value);
        if (response) {
            console.log(response);
            teachers.value = await getUsersByRole();
        } else {
            console.log('error');
        }
    } else {
        const response = await createUser(name.value, surname.value, email.value, phone.value, birthday.value);
        if (response.success) {
            teachers.value = await getUsersByRole();
        } else {
            console.log(response.error);
        }
    }
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
                birthday: new Date(response[0].birthday).toISOString().split('T')[0]
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

async function editUser(idParam: string) {
    const user = await getUserById(idParam);
    if (user) {
        id.value = user.id;
        name.value = user.name;
        surname.value = user.surname;
        email.value = user.email;
        phone.value = user.phone;
        birthday.value = user.birthday;
    }
}
async function deleteUser(id: string) {
    const shouldDelete = confirm("Are you sure you want to delete this teacher?");
    if (shouldDelete) {
        try {
            await $fetch('/api/users/deleteUserByID', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            teachers.value = await getUsersByRole();
        } catch (error) {
            console.log(error);
        }
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

onMounted(async () => {
    teachers.value = await getUsersByRole();
});

</script>
