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

<template>
  <section v-if="isOpen">
    <div class="card" >
      <div class="card-header">
        <div class="close" @click="sendCloseEmitter">X</div>
      </div>
      <div class="card-body">
        <p>{{ message }}</p>
      </div>
      <div class="card-footer">
        <button @click="sendAppointmentEmitter" class="button">Create Appointment</button>
        <button @click="sendRegisterEmitter" class="secondary-button">Register Pet</button>

      </div>
    </div>
  </section>

</template>

<style scoped>

</style>