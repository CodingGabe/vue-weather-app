<template lang="">
    <div>
        <Suspense>
            <AsyncCityView />
            <!-- Fallback -->
            <template #fallback>
                <div class="flex flex-col text-white py-12 pl-12">
                    <p class="text-md">loading...</p>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>