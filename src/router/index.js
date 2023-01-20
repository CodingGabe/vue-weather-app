import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/weather/:state/:city",
        name: "cityView",
        component: CityView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router