<template>
    <div class="rounded-xl p-4 shadow-xl" :class="'bg-' + color + '-400 col-span-' + span">
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    color: string;
    span: string;
}>();
</script>