<template>
  <section class="mobile-footer-container">
    <div class="svg-container">
      <img alt="Home Icon" src="/images/svgs/home.svg" @click="toHome">
      <img alt="Profile Icon" src="/images/svgs/profile.svg" @click="toProfile">
      <img id="plus-icon" alt="Plus Icon" src="/images/svgs/plus.svg" @click="plusClick">
      <img alt="Search Icon" src="/images/svgs/search.svg" @click="toSearch">
      <img alt="Notification Icon" src="/images/svgs/notification.svg" @click="toNotifications">
    </div>


  </section>

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
      // this.$router.push('/dashboard/pets')
    },
    toSearch() {
      // this.$router.push('/dashboard/pets')
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
      this.$router.push('appointment')

    },
    handleCloseEmit() {
      this.isModelOpen = false;
    },
    handleRegisterEmit() {
      this.isModelOpen = false
      this.$router.push('pets/register')
    }
  }
}
</script>


<style scoped>
.mobile-footer-container {
  background-color: white;
  bottom: 0;
  height: 6rem;
  display: grid;

}

.svg-container {
  place-self: center;
  width: 100%;
  display: flex;
  //height: 2.5rem;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
}

.svg-container > img {
  cursor: pointer;
}

.svg-container #plus-icon {
  height: 5rem;
  margin-top: -2.5rem;
  border: solid 5px white;
  border-radius: 60%;
}
</style>