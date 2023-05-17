<template>
    <title>Mis faltas | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <StudentLeftbar active="absences" />
        <div class="flex flex-col w-full p-6 bg-gray-100">

            <h1 class="text-2xl font-bold">Mis faltas</h1>

            <table class="mt-3">
                <thead class="bg-emerald-500 rounded-t-xl border-cyan-600">
                    <th class="p-2 ">Asignatura</th>
                    <th class="p-2 ">Fecha</th>
                    <th class="p-2 ">Estado</th>
                    <th class="p-2 ">Justificante</th>
                </thead>
                <tbody class="">
                    <tr v-for="absence in absencesList" class="border">
                        <td v-if="!absence.justified" class="p-4 ">
                            <template v-for="subject in subjects">
                                <template v-if="subject.id == absence.subject_id">
                                    {{ subject.name }}
                                </template>
                            </template>
                        </td>
                        <td v-if="!absence.justified" class="p-4">{{ normalizeDate(absence.date) }}</td>
                        <td v-if="!absence.justified" class="">
                            {{ absence.state }}
                        </td>
                        <td v-if="!absence.justified" class="p-4 w-1">
                            <div v-if="!absence.file_uploaded">
                                <input type="file" @change="handleFileChange($event, absence.id)" class="border w-fit" />
                            </div>
                            <div v-else class="flex justify-center">
                                <p>Justificante subido</p>
                            </div>
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





async function getSubjects() {
    return await $fetch('/api/courses/getSubjects', {
        method: "POST",
        headers: { "Content-Type": "application/json" },

    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

async function getAbsencesByStudentID() {
    return await $fetch('/api/absences/getAbsencesByStudentID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            studentID: user.id
        })
    }).then((data: any) => {
        return data.body;
    }).catch((error) => {
        console.log(error);
    });
}

const absencesList = ((await getAbsencesByStudentID()));

const subjects = ((await getSubjects()).body);

//////////////////////////////////////////////////////////////
////////////////////////// HELPERS //////////////////////////
/////////////////////////////////////////////////////////////

function normalizeDate(date: string) {
    const d = new Date(date);
    const h24 = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d);
    const m = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye} ${h24}:${m}`;
}

let file = null;

async function handleFileChange(event, absenceID) {
    console.log(absenceID);
    const fileInput = await event.target;
    try {
        file = fileInput.files[0];
        await uploadFile(absenceID);
        await updateFileUploaded(absenceID);
        await getAbsencesByStudentID();
    } catch (error) {
        console.log(error);
    }

}

async function uploadFile(absenceID) {
    if (file) {
        const formData = new FormData();
        formData.append('file', file, `${absenceID}`);
        try {
            await $fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData
            });
            console.log('File uploaded successfully.');
        } catch (error) {
            // console.error('File upload failed:', error);
        }
    }
}

async function updateFileUploaded(absenceID) {
    await $fetch('/api/absences/updateFileUploaded', {
        method: 'POST',
        body: JSON.stringify({
            absenceID: absenceID
        })
    });
}





</script>




