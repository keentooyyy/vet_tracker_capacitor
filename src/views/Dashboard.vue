<template>
  <div v-if="isMobile" class="lg:hidden">
    <MobileHeader :name="first_name"/>

    <div class="w-11/12 mx-auto md:max-w-screen-sm">
      <router-view>
      </router-view>
    </div>


    <div id="footer-shadow" class="fixed bottom-0 w-full">
      <MobileFooterBar/>
    </div>

  </div>

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
        </div>

        <div class="bg-gray-400 w-4/12 h-full overflow-y-auto">
          <AppointmentView/>
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


export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {AppointmentView, MobileFooterBar, MobileHeader},


  created() {
    this.updateLayout();
    window.addEventListener("resize", this.updateLayout);
    this.getUserData()
    this.getPetTypes()
    this.getVaccineTypes()
    this.getAllAppointments()
  },
  data() {
    return {

      first_name: null,
      pet_types_array: '',
      vaccine_types_array: '',
      appointments: '',
      isMobile: false,

    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateLayout); // Clean up event listener
  },
  methods: {

    async getUserData() {
      const url = process.env.VUE_APP_API_URL;
      const id = localStorage.getItem('user_id');
      const bearer = localStorage.getItem('bearer_token');

      try {
        const response = await axios.get(`${url}/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });

        const userData = response.data.user;
        this.first_name = userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1);

        // Save the user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));  // Store full user data
        localStorage.setItem('first_name', userData.first_name); // Store first name (or any other data you need)
        localStorage.setItem('account_type', userData.account_type); // Store account type (vets or other)

        // Redirect based on account type
        if (userData.account_type === 'vets') {
          this.$router.push('/dashboard/vet');
        } else {
          this.$router.push('/dashboard/pets');
        }
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err);
        localStorage.clear();  // Clear localStorage if the API call fails
        this.$router.push('/');
      }
    },
    async getPetTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      try {
        const response = await axios.get(`${url}/api/get_pet_type`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });

        // Ensure pet_types_array is populated with the API response
        this.pet_types_array = response.data.types; // Assuming the API returns { types: [...] }

        // Store the fetched pet types in localStorage for future use
        localStorage.setItem('pet_types', JSON.stringify(this.pet_types_array));

      } catch (err) {
        console.log('API Request Error', err);
      }
    },
    async getVaccineTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      // If not found in localStorage, make the API request
      try {
        const response = await axios.get(`${url}/api/get_vaccines`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });

        // Store the fetched vaccine types in localStorage for future use
        this.vaccine_types_array = response.data.vaccines;
        localStorage.setItem('vaccine_types', JSON.stringify(this.vaccine_types_array));

      } catch (err) {
        console.log('API Request Error', err);
      }
    },
    async getAllAppointments(){
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      /*
      * api/vets/show_all_appointments
      *
      *
      * */
      try {
        const response = await axios.get(`${url}/api/vets/show_all_appointments`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });

        // Store the fetched vaccine types in localStorage for future use
        this.appointments = response.data.appointments;
        localStorage.setItem('appointments', JSON.stringify(this.appointments));

      } catch (err) {
        console.log('API Request Error', err);
      }
    },
    updateLayout() {
      this.isMobile = window.innerWidth < 1024; // Adjust breakpoint as needed
    },
  },

}


</script>

<style scoped>
#footer-shadow {
  filter: drop-shadow(0px 0px 77px #000000);
}
</style>