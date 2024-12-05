// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import PetsView from "@/views/PetsView.vue";
import EditPetView from "@/views/EditPetView.vue";
import RegisterPetView from "@/views/RegisterPetView.vue";
import AppointmentView from "@/views/AppointmentView.vue";


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
            },
            {
                path: 'pets/:id',
                name: 'EditPetView',
                component: EditPetView,
            },
            {
                path: 'pets/register',
                name: 'RegisterPetView',
                component: RegisterPetView,
            },
            {
                path: 'appointment',
                name: 'AppointmentView',
                component: AppointmentView,
            },
        ]
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
