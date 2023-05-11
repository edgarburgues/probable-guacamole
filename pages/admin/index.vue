<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="flex min-h-full">
        <AdminLeftbar active="dashboard" />



        <div class="flex flex-col w-full p-6 bg-gray-100">
            <DashboardContainer class="bg-emerald-300 mb-3">
                <div class="h-full flex flex-col">
                    <h1 class="text-2xl font-bold "> Welcome {{ _name }} </h1>
                    <p class="mt-2">
                        Quote of the day
                    </p>
                </div>
            </DashboardContainer>

            <!--
            <DashboardContainer class="bg-red-300 ">
                <h1 class="text-2xl font-bold "> Notifications </h1>
                <br />
                <div class="flex">
                    <div class="flex w-full items-center justify-between h-1/2 ">
                        <h1 class="text-xl font-bold  "> Teachers </h1>
                        <DashboardNotifcation id="teacherNumber"></DashboardNotifcation>
                    </div>
                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Students </h1>
                        <DashboardNotifcation id="studentsNumber"></DashboardNotifcation>
                    </div>

                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Courses </h1>
                        <DashboardNotifcation id="coursesNumber"></DashboardNotifcation>
                    </div>
                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Subjects </h1>
                        <DashboardNotifcation id="subjectsNumber"></DashboardNotifcation>
                    </div>
                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Bulletin </h1>
                        <DashboardNotifcation id="bulletinNumber"></DashboardNotifcation>
                    </div>
                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Messages </h1>
                        <DashboardNotifcation id="messagesNumber"></DashboardNotifcation>
                    </div>
                </div>

            </DashboardContainer>
            -->

            <div class="flex mt-3 gap-3">
                <DashboardContainer class="bg-blue-400 h-full w-full relative">
                    <div>
                        <DashboardCalendar />
                    </div>
                </DashboardContainer>


                <DashboardContainer class="bg-green-300 h-fit w-96">
                    <div class="flex flex-col">
                        <h1 class="text-xl font-bold "> Tasks </h1>
                        <div>
                            <ul class="flex flex-col w-full">
                                <li v-for="task in todos" class="w-full p-1">
                                    <label class="w-full grid grid-cols-9  font-bold">
                                        <button class="text-white rounded-md" @click="deleteTask(task.id)">X</button>
                                        <p class="col-span-8 shadow-2xl">
                                            {{ task.text.length > 33 ? task.text.substring(0, 30) + '...' : task.text }}
                                        </p>
                                    </label>
                                </li>

                                <li class="border-b-2">
                                    <form @submit.prevent="addTask" class="w-full flex">
                                        <input type="text" class="w-full p-2 bg-transparent outline-none "
                                            v-model="taskText" />
                                        <button class="text-white rounded-md py-2 px-3 ">
                                            <Icon name="fa6-solid:arrow-right-from-bracket" />
                                        </button>
                                    </form>
                                </li>
                                <div id="taskError" class="text-red-500 py-1">
                                    <p>
                                        {{ taskErrorMsg }}
                                    </p>

                                </div>

                            </ul>
                        </div>
                    </div>
                </DashboardContainer>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ["auth"],
    // layout: "admin"
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


const { user: { id, name } } = await me();
const _name = ref();
_name.value = name;
const todos = ref();
const taskText = ref();
const taskErrorMsg = ref();

const getDashboardData = async () => {
    return await $fetch('/api/dashboard/getDashboardStats', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
        })
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

async function deleteTask(id: number) {
    const { success } = await $fetch('/api/dashboard/deleteTask', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
        })
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log('error', error);
    });

    if (success) {
        const { body } = await getDashboardData();
        todos.value = body.todos;
    }
}

function displayError() {
    document.getElementById('taskError').style.display = "block";
}

async function addTask() {
    if (!taskText.value) {
        taskErrorMsg.value = "Text is required";
        return;
    }
    if (taskText.value.length < 3) {
        taskErrorMsg.value = "Task text must be more than 3 characters";
        return;
    }

    taskErrorMsg.value = "";

    const { success } = await $fetch('/api/dashboard/addTask', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
            text: taskText.value
        })
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log('error', error);
    });

    if (success) {
        const { body } = await getDashboardData();
        todos.value = body.todos;
        taskText.value = "";
    }
}


onMounted(async () => {

    const { body } = await getDashboardData();

    // const studentsNumber = document.getElementById('studentsNumber');
    // const teacherNumber = document.getElementById('teacherNumber');
    // const coursesNumber = document.getElementById('coursesNumber');
    // const subjectsNumber = document.getElementById('subjectsNumber');
    // const messagesNumber = document.getElementById('messagesNumber');
    // const bulletinNumber = document.getElementById('bulletinNumber');
    // 
    // studentsNumber.innerHTML = body.students;
    // teacherNumber.innerHTML = body.teachers;
    // coursesNumber.innerHTML = body.courses;
    // subjectsNumber.innerHTML = body.subjects;
    // messagesNumber.innerHTML = body.messages;


    todos.value = body.todos;


})

// const logout = async () => {
//     let { success } = await $fetch('/auth/logout', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//     }).then((data: any) => {
//         return data;
//     }).catch((error) => {
//         console.log(error);
//     });
//
//     if (success) {
//         window.location.href = '/';
//     }
// }


// TODO: Bulletin sync
// TODO: Messages sync
// TODO: Tasks sync
// TODO: Calendar sync
// TODO: Graphic sync

</script>


