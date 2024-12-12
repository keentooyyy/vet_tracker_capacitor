

<template>
  <div class="bg-[var(--main-color)] lg:hidden" v-if="!isSearchable" >
    <div class="flex gap-5 w-11/12 mx-auto items-center md:max-w-screen-sm">
      <img alt="Vet Logo" class="m-2 w-1/4 md:w-36" src="/images/Logo.png">

      <div class="text-white text-2xl font-bold md:text-4xl w-full">Hello, {{ name }}</div>
    </div>

  </div>
  <div class="w-full h-28 hidden lg:flex items-center border-b-2 border-gray-600 justify-between">
    <div class="pl-8 text-black text-2xl font-bold md:text-4xl">Hello, {{ name }}</div>
    <div class="flex items-center gap-3 pr-8 cursor-pointer" @click="toNotifications">
      <img class="" alt="Notification Icon" src="/images/svgs/notification.svg" @click="toNotifications">
      <div class="text-[var(--main-color)] text-2xl">Notifications</div>
    </div>

  </div>

</template>

<script>
export default {
  name: "MobileHeader",
  props: {
    name: String,
    isSearchable: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      search: ''
    }
  },
  methods: {
    toNotifications() {
      this.$router.push('/dashboard/notifications')
    },
  }
}
</script>

<style scoped>

</style>