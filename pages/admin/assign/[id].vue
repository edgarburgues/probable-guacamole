<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <AdminLeftbar active="teachers" />
        <div class="flex flex-col w-full p-6 bg-gray-100">
            <h1 class="text-2xl font-bold">ID Profesor: {{ teacherID }}</h1>


            <table class="rounded-xl bg-emerald-400 flex flex-col shadow-xl w-1/3 mt-3">
                <thead class="bg-emerald-500 rounded-t-xl">
                    <tr class="flex justify-around">
                        <th class="">Curso</th>
                        <th class="">Asignar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(course, index) in courses" :key="course.id" class=" flex justify-around"
                        :class="index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'">
                        <td class="flex items-center justify-start py-2">{{ course.name }}</td>
                        <td class="p-2 flex items-center ">
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
        user_id: teacherID
    })
}).then((data: any) => {
    return data.body;
}).catch((error) => {
    console.log(error);
});



</script>