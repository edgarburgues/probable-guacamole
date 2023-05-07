<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
    layout: "admin",
});


</script>

<template>
    <title>Student Management | Capitol Formación Profesional </title>
    <div class="grid grid-cols-12 gap-1 ">
        <Leftbar />
        <div class="col-span-10 bg-slate-600 grid grid-cols-2 p-2 gap-2">
            <div class="p-4">




            </div>

            <div class="p-4">
                <!-- list every teacher in a table -->
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">First Name</th>
                            <th class="px-4 py-2">Last Name</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Birthday</th>
                            <th class="px-4 py-2">Phone</th>
                            <th class="px-4 py-2">Address</th>
                            <th class="px-4 py-2">City</th>

                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>