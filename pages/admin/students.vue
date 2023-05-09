<template>
    <title>Student Management | Capitol Formación Profesional</title>
    <div class="grid grid-cols-12 gap-1">
        <AdminLeftbar />
        <div class="col-span-10 bg-slate-600 grid grid-cols-3 p-2 gap-2">
            <div class="p-4">
                <form @submit.prevent="register" class="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mt-2">
                        <input id="id" class="hidden" type="text" v-model="id" placeholder="id" />
                    </div>
                    <div class="mt-2">
                        <input id="name" class="w-full rounded p-2 text-slate-900 placeholder-slate-100 dark:text-slate-100"
                            type="text" v-model="name" placeholder="Name" required />
                    </div>
                    <div class="mt-2">
                        <input id="surname"
                            class="w-full rounded p-2 text-slate-900 placeholder-slate-100 dark:text-slate-100" type="text"
                            v-model="surname" placeholder="Surname" required />
                    </div>
                    <div class="mt-2">
                        <input id="email"
                            class="w-full rounded p-2 text-slate-900 placeholder-slate-100 dark:text-slate-100" type="email"
                            v-model="email" placeholder="Email" required />
                    </div>
                    <div class="mt-2">
                        <input id="phone"
                            class="w-full rounded p-2 text-slate-900 placeholder-slate-100 dark:text-slate-100" type="tel"
                            v-model="phone" placeholder="Phone" required />
                    </div>

                    <div class="mt-2">
                        <input id="birthday"
                            class="w-full rounded p-2 text-slate-900 placeholder-slate-100 dark:text-slate-100" type="date"
                            v-model="birthday" placeholder="Birthday" required />
                    </div>

                    <div class="mt-2">
                        <select id="course_id" v-model="idCourseSubject"
                            class="w-full rounded p-2 text-slate-900 placeholder-slate-100 dark:text-slate-100"
                            placeholder="Course" required>
                            <option value="" disabled selected>Select a course</option>
                            <option v-for="course in courses" :key="course.id" :value="course.id">
                                {{ course.name }} - {{ course.id }}
                            </option>
                        </select>
                    </div>

                    <div class="mt-2">
                        <button
                            class="w-full rounded p-2 bg-slate-200 hover:bg-slate-300 border dark:border-none dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-slate-100"
                            type="submit">
                            Save student
                        </button>
                    </div>
                </form>
            </div>

            <div class="p-4 col-span-2">
                <table class="">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 hidden">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Surname</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Phone</th>
                            <th class="px-4 py-2">Birthday</th>
                            <th class="px-4 py-2">Course</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) in students" :key="student.id"
                            :class="index % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'" class="hover:bg-slate-900">
                            <td class="px-4 py-2 hidden">{{ student.id }}</td>
                            <td class="px-4 py-2">{{ student.name }}</td>
                            <td class="px-4 py-2">{{ student.surname }}</td>
                            <td class="px-4 py-2">{{ student.email }}</td>
                            <td class="px-4 py-2">{{ student.phone }}</td>
                            <td class="px-4 py-2">{{ normalizeDate(student.birthday) }}</td>
                            <td class="px-4 py-2">
                                <template v-for="course in courses">
                                    <template v-if="course.id == student.coursesId">
                                        {{ course.name }}
                                    </template>
                                </template>
                            </td>
                            <td class="grid gap-2 grid-cols-2 p-2">
                                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    @click="editUser(student.id)">
                                    <Icon name="fa6-solid:pencil" />
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    @click="deleteUser(student.id)">
                                    <Icon name="fa6-solid:trash-can" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
    layout: "admin",
});

const me = async () => {
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
};

const students = ref([]);
const coursesData: any = ref([]);
var courses = ref([]);

onMounted(async () => {
    students.value = await me();

    coursesData.value = await fetch("/api/courses/getCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    });
    courses.value = await coursesData.value.json().then((data: any) => {
        return data.body;
    });
});

function normalizeDate(date: string) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
}

const id = ref();
const name = ref();
const surname = ref();
const email = ref();
const phone = ref();
const birthday = ref();
const idCourseSubject = ref("");

const register = async () => {
    if (id.value !== "" && id.value !== undefined) {
        await $fetch("/api/users/updateUserByID", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id.value,
                name: name.value,
                surname: surname.value,
                email: email.value,
                phone: phone.value,
            }),
        }).then(async (data: any) => {
            if (data) {
                students.value = await me();
            } else {
                console.log("error");
            }
        });
    } else {
        await $fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.value,
                surname: surname.value,
                email: email.value,
                phone: phone.value,
                password: "changemeImaStudent",
                birthday: birthday.value,
                role: "2",
                coursesId: idCourseSubject.value,
            }),
        })
            .then(async (data: any) => {
                if (data.success) {
                    students.value = await me();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

async function editUser(idParam: string) {
    await $fetch("/api/users/getUserByID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: idParam,
        }),
    })
        .then((data: any) => {
            if (data) {
                id.value = idParam;
                name.value = data[0].name;
                surname.value = data[0].surname;
                email.value = data[0].email;
                phone.value = data[0].phone;
                birthday.value = new Date(data[0].birthday).toISOString().split("T")[0];
            } else {
                console.log("No data");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

async function deleteUser(id: string) {
    if (confirm("Are you sure you want to delete this student?")) {
        await $fetch("/api/users/deleteUserByID", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then(async () => {
                students.value = await me();
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// BUG: Course no se añade al alumno
</script>
