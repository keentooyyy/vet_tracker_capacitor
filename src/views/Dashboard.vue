<template>
  <div>
    <!-- Show loading overlay if isLoading is true -->
    <vue-loading
        v-if="isLoading"
        :active="isLoading"
        :color="'#03426B'"
        :is-full-page="true"
    ></vue-loading>

    <!-- Only render the actual dashboard content after data is loaded -->
    <div v-if="!isLoading">
      <!-- Mobile View -->
      <div v-if="isMobile" class="lg:hidden">
        <MobileHeader :name="first_name"/>
        <div class="w-11/12 mx-auto md:max-w-screen-sm">
          <router-view/>
        </div>

        <div class="mb-48"></div>
        <div id="footer-shadow" class="fixed bottom-0 w-full">
          <MobileFooterBar/>
        </div>
      </div>

      <!-- Desktop View -->
      <div v-if="!isMobile" class="hidden lg:flex h-screen">
        <div class="w-1/6 bg-[var(--main-color)] h-full p-5">
          <img alt="Vet Logo" class="mt-10 px-3" src="/images/Logo.png">
          <MobileFooterBar/>
        </div>

        <div class="w-full flex flex-col h-full">
          <MobileHeader :name="first_name"/>
          <div class="flex flex-1 justify-between overflow-hidden">
            <div class="mx-auto flex-1 overflow-y-auto">
              <router-view/>
              <div class="mb-24"></div>
            </div>

            <!-- Only render the correct AppointmentView based on account type -->
            <div class="bg-gray-400 w-4/12 h-full overflow-y-auto">
              <!-- Show AppointmentView if account type is 'vets' -->
              <AppointmentView v-if="accountType === 'vets'"/>

              <!-- Show AppointmentViewUser if account type is 'users' -->
              <AppointmentViewUser v-if="accountType === 'users'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";
import MobileFooterBar from "@/components/MobileFooterBar.vue";
import AppointmentView from "@/views/AppointmentView.vue";
import {updateLayout} from "@/helpers/layoutHelper";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import AppointmentViewUser from "@/views/AppointmentVIewUser.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {AppointmentViewUser, AppointmentView, MobileFooterBar, MobileHeader, VueLoading},

  created() {
    window.addEventListener("resize", this.handleResize);
    this.initializeData();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  data() {
    return {
      first_name: null,
      pet_types_array: '',
      vaccine_types_array: '',
      appointments: '',
      isMobile: updateLayout(),
      isLoading: false, // Loading state for the overlay
      accountType: localStorage.getItem('account_type') || '', // Store the account type
    };
  },
  methods: {
    handleResize() {
      this.isMobile = updateLayout();
    },

    // Centralized method to initialize all the data
    async initializeData() {
      this.isLoading = true;  // Start loading
      try {
        await this.getUserData();
        await this.getPetTypes();
        await this.getVaccineTypes();
        await this.getAllAppointments();
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        this.isLoading = false;  // Stop loading
      }
    },

    async getUserData() {
      const url = process.env.VUE_APP_API_URL;
      const id = localStorage.getItem('user_id');
      const bearer = localStorage.getItem('bearer_token');

      try {
        const response = await axios.get(`${url}/api/user/${id}`, {
          headers: {'Authorization': `Bearer ${bearer}`},
        });

        const userData = response.data.user;
        this.first_name = userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1);

        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('first_name', userData.first_name);
        localStorage.setItem('account_type', userData.account_type);

        // Set account type
        this.accountType = userData.account_type;

        // Redirect based on account type (if needed)
        if (userData.account_type === 'vets') {
          this.$router.push('/dashboard/vet');
        } else {
          this.$router.push('/dashboard/pets');
        }
      } catch (err) {
        console.log('API request Failed', err);
        localStorage.clear();
        this.$router.push('/');
      }
    },

    async getPetTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        const response = await axios.get(`${url}/api/get_pet_type`, {
          headers: {'Authorization': `Bearer ${bearer}`},
        });

        this.pet_types_array = response.data.types;
        localStorage.setItem('pet_types', JSON.stringify(this.pet_types_array));
      } catch (err) {
        console.log('API Request Error', err);
      }
    },

    async getVaccineTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        const response = await axios.get(`${url}/api/get_vaccines`, {
          headers: {'Authorization': `Bearer ${bearer}`},
        });

        this.vaccine_types_array = response.data.vaccines;
        localStorage.setItem('vaccine_types', JSON.stringify(this.vaccine_types_array));
      } catch (err) {
        console.log('API Request Error', err);
      }
    },

    async getAllAppointments() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        if (localStorage.getItem('account_type') === 'vets') {
          const response = await axios.get(`${url}/api/vets/show_all_appointments`, {
            headers: {'Authorization': `Bearer ${bearer}`},
          });

          this.appointments = response.data.appointments;
        } else {
          const user_id = localStorage.getItem('user_id');
          const response = await axios.get(`${url}/api/user/show_user_appointments/${user_id}`, {
            headers: {'Authorization': `Bearer ${bearer}`},
          });

          this.appointments = response.data.appointments;
        }

        localStorage.setItem('appointments', JSON.stringify(this.appointments));
      } catch (err) {
        console.log('API Request Error', err);
      }
    },
  },
};
</script>

<style scoped>
#footer-shadow {
  filter: drop-shadow(0px 0px 77px #000000);
}
</style>
