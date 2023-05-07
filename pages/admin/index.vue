<template>
    <title>Dashboard | Capitol Formación Profesional</title>
    <div class="grid grid-cols-12 gap-1 grow items-stretch ">
        <Leftbar />
        <div class="col-span-10 grid grid-cols-4 gap-2 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-600 p-6 ">
            <DashboardContainer span="1" color="red">
                <div class="h-full flex flex-col">
                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Teachers </h1>
                        <DashboardNotifcation id="teacherNumber">error</DashboardNotifcation>
                    </div>
                    <div class="flex w-full items-center justify-between h-1/2">
                        <h1 class="text-xl font-bold "> Students </h1>
                        <DashboardNotifcation id="studentsNumber">error</DashboardNotifcation>
                    </div>
                </div>
            </DashboardContainer>

            <DashboardContainer span="5" color="blue">
                <div class="h-full flex items-center justify-between">
                    <h1 class="text-xl font-bold drop-shadow-xl"> Courses </h1>
                    <DashboardNotifcation>1</DashboardNotifcation>
                </div>
            </DashboardContainer>
            <DashboardContainer span="1" color="yellow">
                <div class="h-full flex items-center justify-between">
                    <h1 class="text-xl font-bold "> Bulletin </h1>
                    <DashboardNotifcation>1</DashboardNotifcation>
                </div>
            </DashboardContainer>
            <DashboardContainer span="1" color="purple">
                <div class="h-full flex items-center justify-between">
                    <h1 class="text-xl font-bold "> Messages </h1>
                    <DashboardNotifcation>1</DashboardNotifcation>
                </div>
            </DashboardContainer>
            <DashboardContainer span="3" color="orange">
                <div class="h-full flex flex-col">
                    <h1 class="text-xl font-bold "> Graphic </h1>
                </div>
            </DashboardContainer>
            <DashboardContainer span="1" color="green">
                <div class="h-full flex flex-col">
                    <h1 class="text-xl font-bold "> Tasks </h1>
                    <div>
                        <h1>TODO: List</h1>
                        <ul>
                            <li>Task 1</li>
                            <li>Task 2</li>
                            <li>Task 3</li>
                        </ul>
                    </div>
                </div>
            </DashboardContainer>
            <DashboardContainer span="2" color="violet">
                <div class="h-full flex flex-col">
                    <h1 class="text-xl font-bold "> Calendar </h1>
                </div>
            </DashboardContainer>

        </div>

    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ["auth"],
    layout: "admin"
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



const { user: { name } } = await me();
const _name = ref();
_name.value = name;



onMounted(async () => {
    const getDashboardData = async () => {

        return await $fetch('/api/getDashboardStats', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then((data: any) => {
            return data;
        }).catch((error) => {
            console.log(error);
        });
    }

    const { statusCode, body } = await getDashboardData();

    const studentsNumber = document.getElementById('studentsNumber');
    const teacherNumber = document.getElementById('teacherNumber');

    studentsNumber.innerHTML = body.students;
    teacherNumber.innerHTML = body.teachers;

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


</script>


