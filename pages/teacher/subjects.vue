<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <TeacherLeftbar active="subjects" />
        <div class="flex flex-col w-full p-6 bg-gray-100">

            <h1 class="text-2xl font-bold">Mis asignaturas</h1>

            <div v-for="element in coursesList" class="flex flex-col border mt-3 bg-emerald-300 p-2 rounded-xl">
                <div class="flex mt-3 items-center">
                    <h1 class="text-xl font-semibold ml-4 w-full">{{ element.course.name }}</h1>
                    <button @click="showDiv('DIV' + element.course.id)"
                        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full mr-4 ">+</button>
                </div>


                <div :id="'DIV' + element.course.id" class="flex flex-col p-2">
                    <div v-for="subject in element.course.subjects"
                        class="bg-emerald-200 rounded-full p-4 mt-3 flex items-center justify-between">
                        <h2>{{ subject.name }}</h2>
                        <div class="flex items-center">

                            <NuxtLink :to="'/teacher/list/' + element.course.id + '/' + subject.id"
                                class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-4 ">
                                Pasar lista
                            </NuxtLink>
                            <button
                                class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full mr-4 ">
                                Crear actividad
                            </button>
                            <button
                                class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full mr-4 ">
                                Ver asignatura
                            </button>
                        </div>
                    </div>
                </div>

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

async function getCoursesByTeacherID() {
    return await $fetch('/api/courses/getCoursesByTeacherID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: user.id
        })
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}
const { user } = await me();
const coursesList = ((await getCoursesByTeacherID()).body);




//////////////////////////////////////////////////////////////
////////////////////////// HELPERS //////////////////////////
/////////////////////////////////////////////////////////////

function showDiv(divID) {
    var x = document.getElementById(divID);
    if (x.style.display === "none") {
        x.style.display = "flex";
    }
    else {
        x.style.display = "none";
    }
}

</script>




