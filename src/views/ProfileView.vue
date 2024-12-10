

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
// import axios from "axios";

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
    // async getUserData() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const id = localStorage.getItem('user_id')
    //   const bearer = localStorage.getItem('bearer_token')
    //
    //
    //   try {
    //     const response = await axios.get(`${url}/api/user/${id}`, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       }
    //     });
    //     this.first_name = response.data.user.first_name.charAt(0).toUpperCase() + response.data.user.first_name.slice(1);
    //     this.last_name = response.data.user.last_name.charAt(0).toUpperCase() + response.data.user.last_name.slice(1);
    //     this.email = response.data.user.email
    //   } catch (err) {
    //     this.error = err;
    //     console.log('API request Failed', err)
    //     localStorage.clear()
    //     this.$router.push('/')
    //   }
    // },
    // async logout() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const bearer = localStorage.getItem('bearer_token')
    //   // console.log(bearer)
    //   try {
    //     const response = await axios.post(`${url}/api/user/logout`, {}, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       },
    //     });
    //     console.log(response.data)
    //     localStorage.clear()
    //     this.$router.push('/')
    //   } catch (err) {
    //     this.error = err;
    //     console.log('API request Failed', err)
    //     localStorage.clear()
    //     this.$router.push('/')
    //   }
    // },
    //
    // logoutUser() {
    //   this.logout()
    // }
  }
}
</script>

<style scoped>

</style>