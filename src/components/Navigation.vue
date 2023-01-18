<script setup>
import { ref } from "vue";
import BaseModal from "./BaseModal.vue"

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};
</script>

<template lang="">
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <router-link to="/">
                <div class="flex items-center gap-3 flex-1">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <h4 class="text-2xl">The Local Weather</h4>
                </div>
            </router-link>
            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer" @click="toggleModal"></i>
                <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
            </div>
            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-zinc-900">
                    <h2 class="text-zinc-900 text-2xl mb-2">About:</h2>
                    <p class="text-md mb-4">Local Weather built with Vue, Vite and Tailwind that allows you to track your current and future weather of your favorite cities.</p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>
