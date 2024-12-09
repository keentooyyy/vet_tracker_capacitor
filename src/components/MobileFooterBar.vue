<template>
  <div class="bg-white p-5 lg:hidden">
    <div class="flex w-full gap-x-5 mx-auto justify-around md:max-w-screen-md">
      <img class="cursor-pointer" alt="Home Icon" src="/images/svgs/home.svg" @click="toHome">
      <img class="cursor-pointer" alt="Profile Icon" src="/images/svgs/profile.svg" @click="toProfile">
      <img class="mt-[-2rem] cursor-pointer" alt="Plus Icon" src="/images/svgs/plus.svg" @click="plusClick">
      <img class="cursor-pointer" alt="Search Icon" src="/images/svgs/search.svg" @click="toSearch">
      <img class="cursor-pointer" alt="Notification Icon" src="/images/svgs/notification.svg" @click="toNotifications">
    </div>


  </div>

  <div class="hidden lg:flex flex-col">
    <div class="flex gap-5 items-center mt-10" @click="toHome">
      <img class="cursor-pointer w-10"  alt="Home Icon" src="/images/svgs/white-versions/white-home.svg" >
      <div class="text-white">Home</div>
    </div>

    <div class="flex gap-5 items-center mt-10" @click="toProfile">
      <img class="cursor-pointer w-10"  alt="Home Icon" src="/images/svgs/white-versions/white-profile.svg" >
      <div class="text-white">Profile</div>
    </div>

    <div class="flex gap-5 items-center mt-10" @click="logout">
      <img class="cursor-pointer w-10"  alt="Home Icon" src="/images/svgs/white-versions/white-logout.svg" >
      <div class="text-white">Logout</div>
    </div>

  </div>

  <teleport v-if="isModelOpen" to="body">
    <Modal :is-open="isModelOpen" :message="message"
           @apointmentEmit="handleAppointmentEmit"
           @closeModal="handleCloseEmit"
           @registerEmit="handleRegisterEmit"

    />
  </teleport>


</template>
<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  name: "MobileFooterBar",
  components: {Modal},
  data() {
    return {
      isModelOpen: false,
      message: ''
    }
  },
  methods: {
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
    },

    toHome() {
      this.$router.push('/refresh').then(() => {
        this.$router.push('/dashboard'); // Navigate back to the same route
      });
    },
    toProfile() {
      this.$router.push('/dashboard/profile')
    },
    toSearch() {
      this.$router.push('/dashboard/search')
    },
    toNotifications() {
      // this.$router.push('/dashboard/pets')
    },
    plusClick() {
      this.message = 'Create an appointment or register new pet ?'
      this.isModelOpen = true
    },
    handleAppointmentEmit() {
      this.isModelOpen = false
      this.$router.push('/dashboard/create_appointment')

    },
    handleCloseEmit() {
      this.isModelOpen = false;
    },
    handleRegisterEmit() {
      this.isModelOpen = false
      this.$router.push('/dashboard/pets/register')
    }
  }
}
</script>


<style scoped>

</style>