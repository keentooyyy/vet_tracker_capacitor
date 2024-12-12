import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import PetsView from "@/views/PetsView.vue";
import EditPetView from "@/views/EditPetView.vue";
import RegisterPetView from "@/views/RegisterPetView.vue";
import CreateAppointmentView from "@/views/CreateAppointmentView.vue";
import PetMedicalRecordsView from "@/views/PetMedicalRecordsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import SearchView from "@/views/SearchView.vue";
import VetHome from "@/views/vets/VetHome.vue";
import NotificationVIew from "@/views/NotificationVIew.vue";

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
                path: 'pets',  // No dynamic userId here
                name: 'PetsViewDefault',
                component: PetsView,
            },
            {
                path: 'pets/:userId',  // Remove the leading `/`, making this a relative path
                name: 'PetsView',
                component: PetsView,
                props: true,
            },
            {
                path: 'pets/edit/:id',  // Adjust path for editing pet
                name: 'EditPetView',
                component: EditPetView,
            },
            {
                path: 'pets/register',
                name: 'RegisterPetView',
                component: RegisterPetView,
            },
            {
                path: 'create_appointment',
                name: 'CreateAppointmentView',
                component: CreateAppointmentView,
            },
            {
                path: 'pet_records/:id',
                name: 'PetMedicalRecordsView',
                component: PetMedicalRecordsView,
            },
            {
                path: 'profile',
                name: 'ProfileView',
                component: ProfileView,
            },
            {
                path: 'search',
                name: 'SearchView',
                component: SearchView,
            },
            {
                path: 'vet',
                name: 'VetHome',
                component: VetHome,
            },
            {
                path: 'pets/:userId/edit/:id',  // Remove the leading `/`, making this a relative path
                name: 'EditPetViewVets',
                component: EditPetView,
            },
            {
                path: 'pets/:userId/pet_records/:id',
                name: 'PetMedicalRecordsViewVets',
                component: PetMedicalRecordsView,
            },
            {
                path: 'notifications',  // Remove the leading `/`, making this a relative path
                name: 'NotificationVIew',
                component: NotificationVIew,
            },


        ],
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
