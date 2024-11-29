// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/component/Login.vue";


const routes = [
    {
        path: '/',
        name: 'Log-in',
        component: Login,

    },
];

// Create the router instance and pass the `routes` configuration
const router = createRouter({
    history: createWebHistory(), // This creates history mode (URL without hash #)
    routes
});

export default router;
