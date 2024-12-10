

<template>
  <div class="flex flex-col items-center mt-10">
    <img class="w-40" src="/images/profile.png" alt="profile" >
    <span class="mt-8 font-bold text-2xl">{{first_name}} {{last_name}}</span>
    <p class="mt-2">{{email}}</p>

    <div class="flex justify-between mt-10 w-full gap-5">

      <button
          class="text-[var(--main-color)] text-sm outline outline-2 outline-[var(--main-color)] py-3 px-2 rounded-md cursor-pointer w-full"
          >Edit Profile
      </button>
      <button class="bg-[var(--main-color)] py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full">
        Change Password
      </button>
    </div>

        <button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full mt-6" @click="logoutUser"> Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  created() {
    this.getUserData()
  },
  data(){
    return {
      first_name: null,
      last_name: null,
      email: null

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
        this.last_name = userData.last_name.charAt(0).toUpperCase() + userData.last_name.slice(1);
        this.email = userData.email;

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

          // Save the user data to localStorage
          localStorage.setItem('user', JSON.stringify(userData));  // Store full user data

          // Capitalize first and last name, store email
          this.first_name = userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1);
          this.last_name = userData.last_name.charAt(0).toUpperCase() + userData.last_name.slice(1);
          this.email = userData.email;

        } catch (err) {
          this.error = err;
          console.log('API request Failed', err);
          localStorage.clear();  // Clear localStorage if the API call fails
          this.$router.push('/'); // Redirect to login or home page
        }
      }
    },

    async logout() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')
      // console.log(bearer)
      try {
        const response = await axios.post(`${url}/api/user/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        console.log(response.data)
        localStorage.clear()
        this.$router.push('/')
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err)
        localStorage.clear()
        this.$router.push('/')
      }
    },

    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style scoped>

</style>