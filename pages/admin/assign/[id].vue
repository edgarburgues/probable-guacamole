<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <AdminLeftbar active="teachers" />
        <div class="flex flex-col w-full p-6 bg-gray-100">
            <h1 class="text-2xl font-bold">ID Profesor: {{ teacherID }}</h1>

            <table class=" mt-3 w-1/2">
                <thead class="bg-emerald-300">
                    <tr>
                        <th class="border">Nombre</th>
                        <th class="border">Apellidos</th>
                        <th class="border">Email</th>
                        <th class="border">asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" :key="course.id">
                        <td>{{ course.name }}</td>
                        <td>
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600"
                                @change="assignTeacher(teacherID, course.id, $event)"
                                :checked="userCourses.some(userCourse => userCourse.course.id === course.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>




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

const courses = await $fetch('/api/courses/getCourses', {
    method: "POST",
    headers: { "Content-Type": "application/json" }
}).then((data: any) => {
    return data.body;
}).catch((error) => {
    console.log(error);
});


async function assignTeacher(teacherID: any, courseID: string, event: Event) {
    const target = event.target as EventTarget & { checked: boolean };
    if (target.checked) {
        return await $fetch('/api/assign/create', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: teacherID,
                courseID: courseID
            })
        }).then(async (data: any) => {
            return await data;
        }).catch((error) => {
            console.log(error);
        });
    } else {
        return await $fetch('/api/assign/delete', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: teacherID,
                courseID: courseID
            })
        }).then(async (data: any) => {
            return await data;
        }).catch((error) => {
            console.log(error);
        });
    }
}

const userCourses = await $fetch('/api/courses/getCoursesByTeacherID', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        id: teacherID
    })
}).then((data: any) => {
    return data.body;
}).catch((error) => {
    console.log(error);
});


console.log(userCourses);


</script>