<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <StudentLeftbar active="absences" />
        <div class="flex flex-col w-full p-6 bg-gray-100">

            <h1 class="text-2xl font-bold">Justificantes</h1>

            <table class="mt-3">
                <thead class="bg-emerald-500 rounded-t-xl border-cyan-600">
                    <th class="p-2 ">Alumno</th>
                    <th class="p-2 ">Fecha</th>
                    <th class="p-2 ">Asignatura</th>
                    <th class="p-2 ">Acciones</th>
                    <th class="p-2 ">Estado</th>
                </thead>
                <tbody>
                    <tr v-for="element in absencesList" class="">
                        <td v-if="!element.justified" class="p-4">
                            <template v-for="student in students">
                                <template v-if="student.id == element.user_id">
                                    {{ student.surname }}, {{ student.name }}, {{ element.id }}
                                </template>
                            </template>
                        </td>
                        <td v-if="!element.justified" class="p-4">{{ normalizeDate(element.date) }}</td>
                        <td v-if="!element.justified" class="p-4">
                            <template v-for="subject in subjects">
                                <template v-if="subject.id == element.subject_id">
                                    {{ subject.name }}
                                </template>
                            </template>
                        </td>
                        <td v-if="!element.justified" class="">
                            <select class="w-full p-2" v-model="element.state" @change="updateState(element.id, $event)">
                                <option disabled selected></option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Aceptado">Aceptado</option>
                                <option value="Revision">En revisión</option>
                                <option value="Rechazado">Rechazado</option>
                            </select>
                        </td>
                        <td v-if="!element.justified" class="p-4 flex justify-center">
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                @click="downloadFile(`${element.id}.pdf`)">
                                Descargar justificante
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex flex-col mt-9">
                <input type="file" @change="handleFileChange" />
                <button @click="uploadFile">Upload File</button>
            </div>

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

async function getAbsencesByTeacherID() {

    return await $fetch('/api/absences/getAbsencesByTeacherID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            teacherID: user.id
        })
    }).then((data: any) => {
        return data.body;
    }).catch((error) => {
        console.log(error);
    });
}

const absencesList = ((await getAbsencesByTeacherID()));

async function getStudents() {
    return await $fetch('/api/users/getUsersByRole', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            role: '2'
        })

    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

const students = ((await getStudents()));

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

const subjects = ((await getSubjects()).body);


async function updateState(absenceID, $event) {
    await $fetch('/api/absences/updateState', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            absenceID: absenceID,
            state: $event.target.value
        })
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}


// TODO: clhna11kz000eg0qo0y3mfg96 -- Alvaro


//////////////////////////////////////////////////////////////
////////////////////////// HELPERS //////////////////////////
/////////////////////////////////////////////////////////////

function normalizeDate(date: string) {
    const d = new Date(date);
    // obtener hora y minutos
    const h24 = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d);
    const m = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye} ${h24}:${m}`;
}


async function downloadFile(name: string) {
    try {
        const response = await fetch(`http://localhost:4000/download/${name}`);

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    }
}

let file = null;

function handleFileChange(event) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
        file = fileInput.files[0];
    }
}

async function uploadFile() {
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

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

</script>




