<template>
    <title>Student Management | Capitol Formación Profesional </title>

    <div class="flex min-h-full">
        <AdminLeftbar active="courses" />

        <div class="flex flex-col w-full bg-gray-100">

            <div class="p-4 grid grid-cols-2 gap-3 items-end">
                <form @submit.prevent="createCourse" class=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-green-300 h-fit">
                    <input class="hidden" type="text" v-model="idCourse" placeholder="id" />
                    <div class="mt-2">
                        <input class="w-full rounded p-2 " type="text" v-model="nameCourse" placeholder="Nombre" required />
                    </div>
                    <button class="mt-4 w-full rounded p-2 bg-emerald-500 font-semibold" type="submit">
                        Crear curso
                    </button>
                </form>


                <form @submit.prevent="createSubject" class=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-green-300">

                    <Input class="hidden" type="text" v-model="idSubject" placeholder="id" />

                    <div class="mt-2">
                        <input class="w-full rounded p-2 " type="text" v-model="nameSubject" placeholder="Nombre"
                            required />
                    </div>

                    <div class="mt-2">
                        <select class="w-full rounded p-2   " v-model="idCourseSubject" required>
                            <option value="" disabled selected>Selecciona un curso</option>
                            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
                        </select>
                    </div>

                    <button class="mt-4 w-full rounded p-2 bg-emerald-500 font-semibold" type="submit">
                        Crear asignatura
                    </button>

                </form>

            </div>



            <div class="p-4 grid grid-cols-2 gap-3">
                <table class="rounded-xl flex flex-col shadow-xl h-fit">
                    <thead class="bg-emerald-500 rounded-t-xl">
                        <tr class="flex justify-between">
                            <th class="px-4 py-2 w-1/3 flex justify-start">Curso</th>
                            <th class="px-4 py-2 w-1/3 flex justify-center">Nº de asignaturas</th>
                            <th class="px-4 py-2 w-1/3 flex justify-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr v-for="(course, index) in courses" :key="course.id" class=" flex justify-between"
                            :class="index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'">
                            <td class="px-4 py-2 flex items-center w-1/3">{{ course.name }}</td>
                            <td class="px-4 py-2 flex items-center justify-center w-1/3">
                                <span v-if="subjects.length > 0">
                                    {{ getCount(course.id) }}
                                </span>
                            </td>
                            <td class="gap-2 flex p-2 w-1/3 justify-end">
                                <button class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded"
                                    @click="editCourse(course.id)">
                                    <Icon name="fa6-solid:pencil" />
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded "
                                    @click="deleteCourse(course.id)">
                                    <Icon name="fa6-solid:trash-can" />
                                </button>
                            </td>
                        </tr>
                        <tr class="w-full bg-emerald-500 flex h-9 rounded-b-xl " />
                    </tbody>
                </table>

                <table class="rounded-xl  flex flex-col">
                    <thead class="bg-emerald-500 rounded-t-xl">
                        <tr class="flex justify-between">
                            <th class="px-4 py-2 w-1/2 flex justify-start">Asignatura</th>
                            <th class="px-4 py-2 w-1/4 flex justify-start">Curso</th>
                            <th class="px-4 py-2 w-1/4 flex justify-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(subject, index) in subjects" :key="subject.id" class="flex w-full justify-between"
                            :class="index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'">
                            <td class="px-4 py-2 w-1/2 flex items-center">{{ subject.name }}</td>
                            <td class="px-4 py-2 w-1/4 flex justify-start items-center">
                                <template v-for="course in courses">
                                    <template v-if="course.id == subject.course_id">
                                        {{ course.name }}
                                    </template>
                                </template>
                            </td>
                            <td class="p-2 w-1/4 flex gap-2 items-center justify-end">
                                <button class="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded"
                                    @click="editSubject(subject.body.id)">
                                    <Icon name="fa6-solid:pencil" />
                                </button>
                                <button class="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                                    @click="deleteSubject(subject.id)">
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
//<td class="px-4 py-2"> {{ subject.course_id }}</td>

definePageMeta({
    middleware: ["auth"],

});
var subjects = ref([]);
const courses = ref([]);

// -------------------------------------------
// ----------------courses--------------------
// -------------------------------------------

const idCourse = ref("");
const nameCourse = ref("");


async function createCourse() {

    let data = {
        name: nameCourse.value
    };

    let response = await fetch("/api/courses/insertCourse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // const result = await response.json();
    getCourses();

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

async function deleteCourse(idCourse) {
    let data = {
        id: idCourse
    };

    let response = await fetch("/api/courses/deleteCourseByID", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    getCourses();
}

async function editCourse(idCourse) {
    let data = {
        id: idCourse,
        name: nameCourse.value
    };

    let response = await fetch("/api/courses/getCourseByID", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();


    idCourse.value = result.body.id;
    nameCourse.value = result.body.name;
}


// -------------------------------------------
// ----------------subjects--------------------
// -------------------------------------------

const idSubject = ref("");
const nameSubject = ref("");
const idCourseSubject = ref("");

async function createSubject() {

    let data = {
        name: nameSubject.value,
        idCourse: idCourseSubject.value
    };

    let response = await fetch("/api/courses/insertSubjects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    getSubjects();
}

async function getSubjects() {
    const response = await fetch("/api/courses/getSubjects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });

    let result = await response.json();
    subjects.value = result.body;

}

async function deleteSubject(idSubject) {
    let data = {
        id: idSubject
    };

    let response = await fetch("/api/courses/deleteSubjectByID", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();

    getSubjects();
}

async function editSubject(idSubject) {
    let data = {
        id: idSubject,
        name: nameSubject.value
    };

    let response = await fetch("/api/courses/getSubjectByID", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let result = await response.json();

    idSubject.value = result.body.id;
    nameSubject.value = result.body.name;
}


// -------------------------------------------
// ------------------all----------------------
// -------------------------------------------


onMounted(async () => {
    await getCourses();
    await getSubjects();
});

function getCount(courseId) {
    this.count = 0; // Reiniciar el contador
    for (let i = 0; i < this.subjects.length; i++) {
        if (this.subjects[i].course_id == courseId) {
            this.count++; // Aumentar el contador si se cumple la condición
        }
    }
    return this.count; // Devolver el valor final del contador
}

</script>