<template>
    <title>Teacher Management | Capitol Formación Profesional </title>
    <div class="grid grid-cols-12 gap-1 ">
        <Leftbar />
        <div class="col-span-10 bg-slate-600 grid grid-cols-3 p-2 gap-2">
            <div class="p-4">
                <form @submit.prevent="" class="grid grid-cols-2 gap-3">

                </form>
            </div>

            <div class="p-4 col-span-2">
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 hidden">ID</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Surname</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Phone</th>
                            <th class="px-4 py-2">Birthday</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
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
    return await $fetch('/api/getUsersByRole', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            role: "1"
        })
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

onMounted(async () => {
    const teachers = await me();

    const table = document.querySelector("tbody");
    table.innerHTML = "";

    // for each teacher
    teachers.forEach((teacher: any) => {
        const row = document.createElement("tr");

        // id
        const id = document.createElement("td");
        id.classList.add("border", "px-4", "py-2", "hidden");
        id.innerText = teacher.id;
        row.appendChild(id);

        // name
        const name = document.createElement("td");
        name.classList.add("border", "px-4", "py-2");
        name.innerText = teacher.name;
        row.appendChild(name);

        // surname
        const surname = document.createElement("td");
        surname.classList.add("border", "px-4", "py-2");
        surname.innerText = teacher.surname;
        row.appendChild(surname);

        // email
        const email = document.createElement("td");
        email.classList.add("border", "px-4", "py-2");
        email.innerText = teacher.email;
        row.appendChild(email);

        // phone
        const phone = document.createElement("td");
        phone.classList.add("border", "px-4", "py-2");
        phone.innerText = teacher.phone;
        row.appendChild(phone);

        // birthday
        const birthday = document.createElement("td");
        birthday.classList.add("border", "px-4", "py-2");
        birthday.innerText = normalizeDate(teacher.birthday);
        row.appendChild(birthday);

        // actions
        const actions = document.createElement("td");
        actions.classList.add("border", "px-4", "py-2");
        actions.innerHTML = `
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
        `;
        row.appendChild(actions);

        // append row to table
        document.querySelector("tbody").appendChild(row);


    });
});

function normalizeDate(date: string) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
}




</script> 