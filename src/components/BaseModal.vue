<template>
    <teleport to='body'>
        <div v-show="modalActive" class="absolute w-full bg-zinc-900 bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
        <div v-if="modalActive" class="p-8 bg-white self-start mt-32 max-w rounded-sm">
            <slot />
            <button  @click="$emit('close-modal')" class="text-white mt-8 bg-weather-primary py-2 px-6 rounded-md">Close</button>
        </div>
    </div>
    </teleport>
</template>

<script setup>
defineEmits(['close-modal']);
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
});
</script>
