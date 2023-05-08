<template>
    <div class="col-span-2 bg-slate-300 dark:bg-slate-600 dark:text-white text-slate-900 h-full">
        <ul class="p-4">
            <li class="p-1">
                <NuxtLink to="/admin" class="font-bold">
                    <p
                        class="w-full bg-slate-200 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500 pl-6 p-3 rounded-full">
                        Dashboard</p>
                </NuxtLink>
            </li>
            <li class="p-1">
                <NuxtLink to="/admin/courses">
                    <p
                        class="w-full bg-slate-200 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500 pl-6 p-3 rounded-full">
                        Courses</p>
                </NuxtLink>
            </li>
            <li class="p-1">
                <NuxtLink to="/admin/teachers">
                    <p
                        class="w-full bg-slate-200 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500 pl-6 p-3 rounded-full">
                        Teachers</p>
                </NuxtLink>
            </li>
            <li class="p-1">
                <NuxtLink to="/admin/students">
                    <p
                        class="w-full bg-slate-200 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500 pl-6 p-3 rounded-full">
                        Students</p>
                </NuxtLink>
            </li>
            <li class="p-1">
                <NuxtLink to="/admin/bulletin">
                    <p
                        class="w-full bg-slate-200 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500 pl-6 p-3 rounded-full">
                        Bulletin</p>
                </NuxtLink>
            </li>
            <li class="p-1">
                <NuxtLink to="/admin/messages">
                    <p
                        class="w-full bg-slate-200 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-500 pl-6 p-3 rounded-full">
                        Messages</p>
                </NuxtLink>
            </li>

        </ul>
    </div>
</template>

<script setup lang="ts">




</script>

