<template>
    <title>Messages | Capitol Formación Profesional </title>
    <div class="flex min-h-full">
        <AdminLeftbar active="messages" />

        <div class="flex flex-col w-full p-6 bg-gray-100">
            <div class="">
                <div class="flex">
                    <button @click="displayForm" class="bg-green-500 rounded-xl w-24 mr-3 font-semibold">Nuevo</button>
                    <input @keyup="searchTeacher" id="searchText" type="text" placeholder="Buscar profesor"
                        class=" w-full p-2 rounded-xl pl-3 shadow-2xl">
                </div>
                <div id="newMessage">
                    <form @submit.prevent="sendMessage" class="py-4">
                        <select class="w-full p-2 rounded-md" v-model="userSelected">
                            <option class="text-xl" value="" disabled selected>-- Selecciona un usuario --</option>
                            <option class="text-xl" v-for="user in users" :key="user.id" :value="user.id">
                                {{ user.surname + ', ' + user.name }} - {{ user.email }}
                            </option>
                        </select>
                        <textarea v-model="messageContent" type="text" placeholder="Escribe tu mensaje"
                            class=" w-full p-2 rounded-md  mt-2" />
                        <button type="submit" class="bg-green-500 p-2 rounded-md w-full mt-2">Enviar</button>
                    </form>
                </div>
            </div>

            <div class="py-3">
                <table class="rounded-xl bg-emerald-400 flex flex-col">

                    <thead class="bg-emerald-500 rounded-t-xl">
                        <tr class="flex justify-between">
                            <th class="px-4 py-3 w-28">De</th>
                            <th class="px-4 py-3">Fecha</th>
                            <th class="px-4 py-3 w-3/5">Mensaje</th>
                            <th class="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(message, index) in messages" class=" flex justify-between"
                            :class="index % 2 === 0 ? 'bg-emerald-300' : 'bg-emerald-200'">
                            <td class="flex items-center px-4 py-2 w-28">
                                <template v-for="user in users">
                                    <template v-if="user.id == message.from_id">
                                        {{ user.name }}
                                    </template>
                                </template>
                            </td>
                            <td class="flex items-center px-4 py-2">{{ normalizeDate(message.created_at) }}</td>
                            <td class="flex items-center px-4 py-2 w-3/5">{{ message.text }}</td>
                            <td class="items-center grid gap-2 grid-cols-2 p-2">
                                <button @click="markAsRead(message.id)"
                                    class="bg-green-500 hover:bg-green-700 font-bold rounded h-11 w-12">
                                    <Icon name="fa6-solid:envelope-circle-check" />
                                </button>
                                <button @click="deleteMessage(message.id)"
                                    class="bg-red-500 hover:bg-green-700 font-bold rounded h-11 w-12">
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

<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "admin",
});
onMounted(async () => {

    const usersData = await getUsers();
    users.value = usersData.body;
    const messagesData = await getMessages();
    messages.value = messagesData.body;
    displayForm();
});


const me = async () => {
    const token = useCookie('token').value || "";

    return await $fetch('/auth/me', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            token: token
        })
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}
const { user: { id } } = await me();

const users = ref([]);
const userSelected = ref("");
const messageContent = ref("");
const messages = ref([]);

async function getUsers() {

    return await $fetch('/api/users/getAllUsers', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}



async function sendMessage() {
    const newMessage = {
        sender: id,
        receiver: userSelected.value,
        message: messageContent.value
    }
    return await $fetch('/api/messages/createMessage', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage)
    }).then(() => {
        userSelected.value = "";
        messageContent.value = "";
    }).catch((error) => {
        console.log(error);
    });
}

async function getMessages() {
    return await $fetch('/api/messages/getMessagesByID', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id
        })
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });
}

function normalizeDate(date) {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
}

async function markAsRead(idMessage) {
    console.log('readed' + idMessage);
}

async function deleteMessage(idMessage) {
    await $fetch('/api/messages/deleteMessage', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: idMessage
        })
    })
    const messagesData = await getMessages();
    messages.value = messagesData.body;
}


function displayForm() {
    const form = document.getElementById("newMessage");
    if (form) {
        form.classList.toggle("hidden");
    }
}

// TODO: Cambiar el select por un input de busqueda
// TODO: Marcar como leido

</script>
