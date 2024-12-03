// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import PetsView from "@/views/PetsView.vue";


const routes = [
    {
        path: '/',
        name: 'Log-in',
        component: Login,

    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            {
                path: 'pets',
                name: 'PetsView',
                component: PetsView,
            }
        ]
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
