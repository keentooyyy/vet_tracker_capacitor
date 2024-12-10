<template>
  <div class="lg:hidden">
    <MobileHeader :name="first_name"/>

    <div class="w-11/12 mx-auto md:max-w-screen-sm">
      <router-view>
      </router-view>
    </div>



    <div id="footer-shadow" class="fixed bottom-0 w-full">
      <MobileFooterBar/>
    </div>

  </div>

  <div class="hidden lg:flex h-screen">

    <div class="w-1/6 bg-[var(--main-color)] h-full p-5">
      <img alt="Vet Logo" class="mt-10 px-3" src="/images/Logo.png">
      <MobileFooterBar/>
    </div>


    <div class="w-full flex flex-col h-full">
      <MobileHeader :name="first_name"/>

      <div class="flex flex-1 justify-between overflow-hidden">

        <div class="pl-8 flex-1 overflow-y-auto">
          <router-view />
        </div>

        <div class="bg-white w-4/12 h-full overflow-y-auto">
          <p>Appointments</p>
        </div>

      </div>
    </div>
  </div>



</template>


<script>
import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";

import MobileFooterBar from "@/components/MobileFooterBar.vue";


export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {MobileFooterBar, MobileHeader},


  created() {
    this.getUserData()
    this.getPetTypes()
  },
  data() {
    return {
      token: '',
      first_name: null,
      isSearch: false,
      searchQuery: ''
    }
  },
  methods: {
    async getUserData() {
      // Check if user data exists in localStorage
      const storedUserData = localStorage.getItem('user');

      if (storedUserData) {
        // If user data exists in localStorage, parse and use it
        const userData = JSON.parse(storedUserData);
        this.first_name = userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1);

        // Redirect based on account type
        if (userData.account_type === 'vets') {
          this.$router.push('/dashboard/vet');
        } else {
          this.$router.push('/dashboard/pets');
        }
      } else {
        // If no user data in localStorage, fetch from API
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
      }
    },
    async getPetTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');

      // Check if pet types are already stored in localStorage
      const storedPetTypes = localStorage.getItem('pet_types');

      if (storedPetTypes) {
        // If pet types are available in localStorage, use them directly
        this.pet_types_array = JSON.parse(storedPetTypes);
        console.log('Pet types loaded from localStorage');
      } else {
        // If not found in localStorage, make the API request
        try {
          await axios.get(`${url}/api/get_pet_type`, {
            headers: {
              'Authorization': `Bearer ${bearer}`,
            }
          });
          // Store the fetched pet types in localStorage for future use
          localStorage.setItem('pet_types', JSON.stringify(this.pet_types_array));
          console.log('Pet types loaded from API and saved to localStorage');

        } catch (err) {
          console.log('API Request Error', err);
        }
      }
    },



  },
}


</script>

<style scoped>
#footer-shadow{
  filter: drop-shadow(0px 0px 77px #000000);
}
</style>