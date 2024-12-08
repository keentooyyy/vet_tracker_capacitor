

<template>
  <div v-if="isOpen" class="bg-gray-500 bg-opacity-60 absolute top-0 h-screen w-full flex flex-col justify-center items-center">
    <div class=" w-10/12 md:max-w-screen-sm">
      <div class="bg-gray-300 rounded-tl-md rounded-tr-md p-3">
        <div class="cursor-pointer text-[var(--main-color)] text-end" @click="sendCloseEmitter">X</div>
      </div>
      <div class="bg-white py-5 px-3">
        <p>{{ message }}</p>
      </div>
      <div class="bg-gray-300 rounded-bl-md rounded-br-md p-3 flex gap-x-5">
        <button class="text-sm outline outline-2 outline-[var(--main-color)] text-[var(--main-color)] rounded-full py-2 px-3 w-3/6" @click="sendAppointmentEmitter" >Appointment</button>
        <button class="text-sm text-white bg-[var(--main-color)] rounded-full py-2 px-3 w-3/6" @click="sendRegisterEmitter" >Register</button>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Modal",
  props:{
    isOpen:{
      type:Boolean,
      default: false
    },
    message: String,
  },
  methods:{
    sendCloseEmitter(){
      this.$emit('closeModal')
    },
    sendRegisterEmitter(){
      this.$emit('registerEmit')
    },
    sendAppointmentEmitter(){
      this.$emit('apointmentEmit')
    },
  }
}
</script>

<style scoped>

</style>