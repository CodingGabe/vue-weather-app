<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input 
                v-modal="searchQuery" 
                type="text"
                @input="getSearchResults"
                placeholder="Search for a City or State" 
                class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-sm">
                <ul v-if="mapboxSearchResults" class="absolute bg-weather-secondary text-white w-full show-md py-2 px-1 top-16">
                    <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" ref="mapboxSearchResults" class="py-2 cursor-pointer">
                    {{ searchResult.place.name }}
                    </li>
                </ul>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue"
import axios from 'axios'

const mapboxAPIKey = "pk.eyJ1IjoiZ2FiZWFtYXlhIiwiYSI6ImNsZDB2NDQ1ZzFwaWEzb21vYWtiaXAwNXcifQ.Azlpg9_D1mdC1vopRQksHg"
const searchQuery = ref("")
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout( async () => {
        if (searchQuery.value !== "") {
            const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`)
            mapboxSearchResults.value = result.data.features;
            return
        }
        mapboxSearchResults.value = null
    }, 300)
};
</script>