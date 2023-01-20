<template>
    <div class="flex flex-col flex-1 items-center">
      <p>Temperature: {{ temperature }}</p>
      <p>Humidity: {{ humidity }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        APIKey: "8bff1b1000a5af02a04e2eec8777eec0",
        city: "Austin",
        temperature: null,
        humidity: null
      }
    },
    mounted() {
      this.getWeatherData()
    },
    methods: {
      async getWeatherData() {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}&units=imperial`
          )
          this.temperature = response.data.main.temp
          this.humidity = response.data.main.humidity
          // cal current date & time
            const localOffset = new Date().getTimezoneOffset() * 60000;
            const utc = weatherData.data.current.dt * 1000 + localOffset;
            weatherData.data.currentTime =
                utc + 1000 * weatherData.data.timezone_offset;
            // cal hourly weather offset
            weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * weatherData.data.timezone_offset;
            });
        } catch (error) {
          console.error(error)
        }
        
      }
    }
  }
  </script>

<!-- <template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input 
                v-modal="searchQuery" 
                type="text"
                @input="getSearchResults"
                placeholder="Search for a City or State" 
                class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-sm" 
            />
            <ul v-if="mapboxSearchResults" class="absolute bg-weather-secondary text-white w-full show-md py-2 px-1 top-16">
                <p v-if="searchError" class="py-2">Sorry, something went wrong, please try again.</p>
                <p v-if="!serverError && mapboxSearchResults.length === 0" class="py-2">No results match your query, try a different term.</p>
                <template v-else>
                    <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer" @click="previewCity(searchResult)">
                        {{ searchResult.place.name }}
                    </li>
                </template>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (searchResult) => {
    console.log(searchResult);
    const [city, state] = searchResult.place._name.split(",");
    router.push({
        name: "cityView",
        params: {state: state.replaceAll(" ", ""), city:city},
        query: {
            lat: searchResult.geometry.coordinates[1],
            lng: searchResult.geometry.coordinates[0],
            preview: true,
        }
    })
}

const mapboxAPIKey = "pk.eyJ1IjoiZ2FiZWFtYXlhIiwiYSI6ImNsZDB2NDQ1ZzFwaWEzb21vYWtiaXAwNXcifQ.Azlpg9_D1mdC1vopRQksHg";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout( async () => {
        if (searchQuery.value !== "") {
            try {
                const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`);
                mapboxSearchResults.value = result.data.features;
                
            } catch {
                searchError.value = true;
            }
            return;
        }
        mapboxSearchResults.value = null
    }, 300);
};
</script> -->