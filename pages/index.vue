<script setup lang="ts">
definePageMeta({
    middleware: ["auth"]
});

const _id = ref();
const _name = ref();
const _surname = ref();
const _email = ref();
const _phone = ref();
const _created_at = ref();
const _role = ref();
const _birthday = ref();

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

const logout = async () => {
    let { success } = await $fetch('/auth/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).then((data: any) => {
        return data;
    }).catch((error) => {
        console.log(error);
    });

    if (success) {
        window.location.href = '/';
    }
}

onMounted(async () => {
    //Get user data that was stored in the cookie
    const { user: { id, name, surname, email, phone, created_at, role, birthday } } = await me();

    _id.value = id;
    _name.value = name;
    _surname.value = surname;
    _email.value = email;
    _phone.value = phone;
    _created_at.value = created_at;
    _role.value = role;
    _birthday.value = birthday;

    switch (role) {
        case "0":
            navigateTo("./admin");
            break;
        case "1":
            navigateTo("./teacher");
            break;
        default:
            navigateTo("./student");
            break;

    }
});

</script>


