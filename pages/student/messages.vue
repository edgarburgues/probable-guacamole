<template>
    <div class="grid grid-cols-12 gap-1">
        <AdminLeftbar />
        <div class="col-span-10 bg-slate-600 p-4">

            <div class="grid grid-cols-12 gap-2">
                <button class="bg-green-500 text-white rounded-md w-full" @click="displayNew">New</button>
                <input type="text" placeholder="Buscar mensaje"
                    class=" w-full bg-s late-600 text-white p-2 rounded-md bg-slate-700 col-span-11 ">
            </div>

            <form id="newMessage" @submit.prevent="sendMessage" class="py-4">
                <select class="w-full bg-s late-600 text-white p-2 rounded-md bg-slate-700 col-span-11"
                    v-model="userSelected">
                    <option class="text-xl" value="" disabled selected>-- Selecciona un usuario --</option>
                    <option class="text-xl" v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.role }} - {{ user.name }} - {{ user.email }} - {{ user.id }}
                    </option>
                </select>
                <textarea v-model="messageContent" type="text" placeholder="Escribe tu mensaje"
                    class=" w-full bg-s late-600 text-white p-2 rounded-md bg-slate-700 mt-2" />
                <button type="submit" class="bg-green-500 text-white p-2 rounded-md w-full mt-2">Enviar</button>
            </form>

            <div class="w-full mt-4">
                <div v-for="message in messages" class="p-4 mt-3 bg-slate-900 rounded-xl w-full grid grid-cols-12 gap-2">
                    <div class="col-span-2 flex items-center ">
                        <template v-for="user in users">
                            <template v-if="user.id == message.from_id">
                                {{ user.name }}
                            </template>
                        </template>
                    </div>
                    <div class="col-span-2 flex items-center">
                        {{ normalizeDate(message.created_at) }}
                    </div>

                    <div class="col-span-7 flex bg-slate-700 rounded-xl px-3 py-2">
                        {{ message.text }}
                    </div>
                    <div class="col-span-1 flex justify-around items-center p-2">
                        <button @click="markAsRead(message.id)"
                            class="bg-blue-400 text-white p-2 rounded-md w-12 h-11 flex items-center justify-center">
                            <Icon name="fa6-solid:envelope-circle-check" />
                        </button>
                        <button @click="deleteMessage(message.id)"
                            class="bg-red-500 text-white p-2 rounded-md w-12 h-11 flex items-center justify-center">
                            <Icon name="fa6-solid:trash-can" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    middleware: ["auth"],
    layout: "student",
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

onMounted(async () => {
    displayNew();
    const usersData = await getUsers();
    users.value = usersData.body;
    const messagesData = await getMessages();
    messages.value = messagesData.body;
});

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


async function displayNew() {
    const newMessage = document.getElementById('newMessage');
    newMessage.classList.toggle('hidden');
}

// TODO: Cambiar los divs a una tabla
// TODO: Cambiar el select por un input de busqueda
// TODO: Implementar el buscador
// TODO: Marcar como leido

</script>
