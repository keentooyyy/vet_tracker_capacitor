<template>
  <div class="bg-white p-5">
    <div class="flex w-full gap-x-5 mx-auto justify-around md:max-w-screen-md">
      <img class="cursor-pointer" alt="Home Icon" src="/images/svgs/home.svg" @click="toHome">
      <img class="cursor-pointer" alt="Profile Icon" src="/images/svgs/profile.svg" @click="toProfile">
      <img class="mt-[-2rem] cursor-pointer" alt="Plus Icon" src="/images/svgs/plus.svg" @click="plusClick">
      <img class="cursor-pointer" alt="Search Icon" src="/images/svgs/search.svg" @click="toSearch">
      <img class="cursor-pointer" alt="Notification Icon" src="/images/svgs/notification.svg" @click="toNotifications">
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

    toHome() {
      this.$router.push('/dashboard/pets')
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