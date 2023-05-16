<template>
    <title>Student Management | Capitol Formación Profesional </title>
    <div class="flex min-h-full">
        <AdminLeftbar active="students" />

        <div class="flex flex-col w-full p-6 bg-gray-100">
            <div class="p-4">

                <div class="flex">
                    <button @click="displayForm"
                        class="bg-green-500 rounded-xl w-24 mr-3 font-semibold shadow-xl">Nuevo</button>
                    <input @keyup="searchStudent" id="searchText" type="text" placeholder="Buscar alumno"
                        class=" w-full p-2 rounded-xl pl-3 shadow-xl">
                </div>

                <div id="newStudentForm">
                    <form @submit.prevent="register" class="flex flex-col bg-emerald-300 shadow-md rounded-xl p-4 mt-5">
                        <div class="flex gap-3 ">
                            <div class="w-full flex flex-col justify-between">
                                <input class="hidden" type="text" v-model="id" />
                                <div class="">
                                    <input class="w-full rounded p-2 border-b-2" type="text" v-model="name"
                                        placeholder="Nombre" required />
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
                                    <input class="w-full rounded p-2 border-b-2" type="password" v-model="password"
                                        placeholder="Contraseña" required />
                                </div>

                            </div>

                            <div class="w-full flex flex-col">
                                <div class="flex">
                                    <input id="tel" class="w-full rounded p-2 border-b-2" type="tel" v-model="phone"
                                        placeholder="Teléfono" required ref="telInput" />
                                    <button type="button" @click="generateRandom('tel')"
                                        class="bg-blue-500 text-white rounded-xl w-24 ml-3 font-semibold">
                                        random
                                    </button>
                                </div>
                                <div class="">
                                    <label for="birthDate" class="ml-2">Fecha de nacimiento:</label>
                                    <div class="flex">
                                        <input id="birthDate" class="w-full rounded p-2 border-b-2" type="date"
                                            v-model="birthday" placeholder="Fecha de nacimiento" required />
                                        <button type="button" @click="generateRandom('fecha')"
                                            class="bg-blue-500 text-white rounded-xl w-24 ml-3 font-semibold">
                                            random
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-2">
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
                                    <label for="course" class="ml-2">Curso:</label>
                                    <select class="w-full rounded p-2 border-b-2" v-model="courseSelected">
                                        <option value="" disabled selected> -- Seleccione una opción -- </option>
                                        <option v-for="course in courses" :key="course.id" :value="course.id">
                                            {{ course.name }}
                                        </option>
                                    </select>
                                </div>


                            </div>

                        </div>
                        <div class="mt-2">
                            <button class="bg-green-500 font-semibold p-2 rounded-md w-full mt-2" type="submit">Guardar
                                alumno</button>
                        </div>
                    </form>
                </div>

            </div>
            <div class="p-4">
                <table class="rounded-xl bg-emerald-400 flex flex-col">
                    <thead class="bg-emerald-500 rounded-t-xl">
                        <tr class="flex justify-between">
                            <th class="hidden">ID</th>
                            <th class="flex items-center w-1/7 p-2 ml-2">Nombre</th>
                            <th class="flex items-center w-1/7 p-2">Email</th>
                            <th class="flex items-center w-1/7 p-2">Teléfono</th>
                            <th class="flex items-center w-1/7 p-2">Fecha de nacimiento</th>
                            <th class="flex items-center w-1/7 p-2 justify-between">
                                <div>
                                    Sexo
                                </div>
                                <div>
                                    Curso
                                </div>
                            </th>
                            <th class="flex items-center w-1/12 p-2 justify-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        <tr v-for="(student, index) in students" :key="student.id" class=" flex justify-between"
                            :class="index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'">
                            <td class="hidden">{{ student.id }}</td>
                            <td class="flex items-center w-1/7 p-2 ml-2"> {{ student.surname }}, {{ student.name }} </td>
                            <td class="flex items-center w-1/7 p-2">{{ student.email }}</td>
                            <td class="flex items-center w-1/7 p-2">{{ student.phone }}</td>
                            <td class="flex items-center w-1/7 p-2">{{ normalizeDate(student.birthday) }}</td>
                            <td class="flex items-center w-1/7 p-2 justify-between">
                                <div>{{ student.sex }}</div>
                                <div>{{ student.student_courses.length > 0 ? student.student_courses[0].name : '' }}</div>
                            </td>
                            <td class="flex justify-end w-1/12 gap-2 p-2">
                                <NuxtLink :to="'/admin/edit/student/' + student.id"
                                    class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded">
                                    <Icon name="fa6-solid:pencil" />
                                </NuxtLink>
                                <button class="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                                    @click="deleteUser(student.id)">
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
import { s } from '@fullcalendar/core/internal-common';


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
    sex: string;
    student_courses: string;
}

const id = ref();
const name = ref();
const surname = ref();
const email = ref();
const phone = ref();
const password = ref();
const birthday = ref();
const sex = ref();
const students = ref([]);
const courses = ref([]);
const courseSelected = ref();

const register = async () => {

    if (id.value === '' || id.value === undefined || id.value === null) {
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
                role: '2',
                sex: sex.value,
                course: courseSelected.value
            })
        }).then(async (data: any) => {

            if (data.success) {
                //Reset Input fields
                name.value = '';
                surname.value = '';
                email.value = '';
                phone.value = '';
                password.value = '';
                birthday.value = '';

                students.value = await getUsersByRole();
            } else {
                console.log('error', data);
            }
        }).catch((error) => {
            console.log(error);
        });
    } else {
        await updateUser(id.value, name.value, surname.value, email.value, phone.value, birthday.value, sex.value, courseSelected.value);
    }

}

async function getCourses() {
    let response = await fetch("/api/courses/getCourses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });

    let result = await response.json();
    courses.value = result.body;
}



const getUsersByRole = async () => {
    try {
        const response = await fetch("/api/users/getUsersByRole", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role: "2",
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id: any, name: any, surname: any, email: any, phone: any, birthday: any, sex: any, student_courses: any) => {
    const response = await $fetch('/api/users/updateUserByID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, surname, email, phone, sex, student_courses })
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
                sex: response[0].sex,
                student_courses: response[0].student_courses[0].id
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
    displayForm();
    if (user) {
        id.value = user.id;
        name.value = user.name;
        surname.value = user.surname;
        email.value = user.email;
        phone.value = user.phone;
        birthday.value = user.birthday;
        sex.value = user.sex;
        courseSelected.value = user.student_courses;
    }
}
async function deleteUser(id: string) {
    const shouldDelete = confirm("Are you sure you want to delete this student?");
    if (shouldDelete) {
        try {
            await $fetch('/api/users/deleteUserByID', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            students.value = await getUsersByRole();
        } catch (error) {
            console.log(error);
        }
    }
}


// TODO: Implementar botón de 'Clear'

//////////////////////////////////////////////////////////////
////////////////////////// HELPERS //////////////////////////
/////////////////////////////////////////////////////////////

function searchStudent() {
    const input = document.getElementById("searchText") as HTMLInputElement;
    const tbody = document.getElementById("tbody");
    if (input && tbody) {
        const filter = input.value.toUpperCase();
        const tr = tbody.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            const td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                const txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}


async function displayForm() {
    const form = document.getElementById("newStudentForm");
    await form.classList.toggle('hidden');
}

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
    students.value = await getUsersByRole();
    displayForm();

    await getCourses();


});

</script>
