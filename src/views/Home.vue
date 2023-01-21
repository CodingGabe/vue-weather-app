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

<template lang="">
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner message -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-accent w-full text-center"
    >
      <p>
        This is a preview of this city, if you would like to track, please click
        the "+" symbol.
      </p>
    </div>
    <!-- Weather Data -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <!-- Feels like data -->
      <div class="text-center">
        <p>Feels like {{ Math.round(weatherData.current.feels_like) }} &deg;</p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt="weather icon"
          class="w-[150px] h-auto"
        />
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt="weather icon"
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

     <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                }
              )
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
            alt="weather icon"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const weatherAPI = "8bff1b1000a5af02a04e2eec8777eec0";
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${weatherAPI}&units=imperial`
    );
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
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