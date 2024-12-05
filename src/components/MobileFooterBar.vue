<template>
  <section class="mobile-footer-container">
    <div class="svg-container">
      <img @click="toHome" alt="Home Icon" src="/images/svgs/home.svg">
      <img @click="toProfile" alt="Profile Icon" src="/images/svgs/profile.svg">
      <img id="plus-icon" alt="Plus Icon" src="/images/svgs/plus.svg" @click="plusClick">
      <img @click="toSearch" alt="Search Icon" src="/images/svgs/search.svg">
      <img @click="toNotifications" alt="Notification Icon" src="/images/svgs/notification.svg">
    </div>


  </section>

  <teleport to="body" v-if="isModelOpen">
    <Modal :is-open="isModelOpen" :message="message" @closeModal="handeCloseEmit" @registerEmit="handleRegisterEmit"/>
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

    toHome(){
      this.$router.push('/dashboard/pets')
    },
    toProfile(){
      // this.$router.push('/dashboard/pets')
    },
    toSearch(){
      // this.$router.push('/dashboard/pets')
    },
    toNotifications(){
      this.$router.push('/dashboard/pets')
    },
    handeCloseEmit() {
      this.isModelOpen = false;
    },
    plusClick() {
      this.message = 'Create an appointment or register new pet ?'
      this.isModelOpen = true
    },
    handleRegisterEmit(){
      this.$router.push('pets/register')
      this.isModelOpen = false
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
  height: 2.5rem;
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