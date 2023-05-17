<template>
    <div>
        <label for="file-input" class="custom-file-input">
            <span v-if="selectedFileName">{{ selectedFileName }}</span>
            <span v-else>Ningún archivo seleccionado</span>
        </label>
        <input type="file" id="file-input" ref="input" @change="handleFileChange" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'FileInput',
    setup() {
        const selectedFileName = ref('');

        const handleFileChange = (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                selectedFileName.value = input.files[0].name;
            } else {
                selectedFileName.value = '';
            }
        };

        return {
            selectedFileName,
            handleFileChange,
        };
    },
});
</script>