

<template>
  <div class="flex flex-col items-center mt-10" v-if="isMobile">
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


  <div class="flex flex-col w-11/12 mx-auto mt-10" v-if="!isMobile">
    <div class="flex gap-10">
      <img class="w-40" src="/images/profile.png" alt="profile" >
      <div class="mt-10">
        <span class="font-bold text-2xl">{{first_name}} {{last_name}}</span>
        <p class="">{{email}}</p>
      </div>

    </div>


    <div class="grid grid-cols-2 gap-10 mt-10 w-max">

      <button
          class="text-[var(--main-color)] text-sm outline outline-2 outline-[var(--main-color)] py-3 px-4  rounded-md cursor-pointer "
      >Edit Profile
      </button>
      <button class="bg-[var(--main-color)] py-3 px-4 rounded-md text-white  text-sm cursor-pointer ">
        Change Password
      </button>

      <button class="bg-red-800 py-3 px-4 rounded-md text-white text-sm cursor-pointer col-span-2" @click="logoutUser"> Logout</button>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import {updateLayout} from "@/helpers/layoutHelper";

export default {
  name: "ProfileView",
  created() {
    this.getUserData()
    window.addEventListener("resize", this.handleResize);
  },
  data(){
    return {
      isMobile: updateLayout(),
      first_name: null,
      last_name: null,
      email: null

    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  methods: {
    getUserData() {
      // Check if user data exists in localStorage
      const storedUserData = localStorage.getItem('user');


      const userData = JSON.parse(storedUserData);

      this.first_name = userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1);
      this.last_name = userData.last_name.charAt(0).toUpperCase() + userData.last_name.slice(1);
      this.email = userData.email
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