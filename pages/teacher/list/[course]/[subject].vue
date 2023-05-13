<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <TeacherLeftbar active="subjects" />
        <div class="flex flex-col w-full p-6 bg-gray-100">
            <h1 class="text-2xl font-bold">ID Curso: {{ courseID }}</h1>
            <h1 class="text-2xl font-bold">ID Asignatura: {{ subjectID }}</h1>

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
                    <tr v-for="student in students" :key="student.id">
                        <td>{{ student.name }}</td>
                        <td>{{ student.surname }}</td>
                        <td>{{ student.email }}</td>
                        <td>
                            <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600"
                                @change="sendAbsence(student.id, $event)" />
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
const courseID = useRoute().params.course;
const subjectID = useRoute().params.subject;



async function getStudentsByCourseID() {
    return await $fetch('/api/courses/getStudentsByCourseID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: courseID
        })
    }).then(async (data: any) => {
        return await data;
    }).catch((error) => {
        console.log(error);
    });
}

const students = ((await getStudentsByCourseID()).body[0].users);



async function sendAbsence(studentId: number, event: Event) {
    const target = event.target as EventTarget & { checked: boolean };
    if (target.checked) {
        return await $fetch('/api/absences/create', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: studentId,
                subjectID: subjectID
            })
        }).then(async (data: any) => {
            return await data;
        }).catch((error) => {
            console.log(error);
        });


    } else {
        return await $fetch('/api/absences/delete', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: studentId,
                subjectID: subjectID
            })
        }).then(async (data: any) => {
            return await data;
        }).catch((error) => {
            console.log(error);
        });
    }
}

</script>