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
section {
  z-index: 999;
  top: 0;
  position: fixed;
  display: grid;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
}

.card {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  place-self: center;
}
.close {
  cursor: pointer;
}
.card-header, .card-footer, .card-body {
  padding: 1.5rem;

}

.card-header{
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.card-footer{
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}


.card .card-header, .card-footer {
  background-color: lightgray;
  display: flex;
  justify-content: flex-end;
}

.card .card-header div {
  color: var(--main-color);
  font-size: 1.5rem;
  font-weight: bold;
}


.card .card-body{
  background-color: white;
}

.card-body p {
  font-size: 1.5rem;
}

.card-footer{
  column-gap: 1rem;
}



.button {
  border: none;
  background-color: var(--main-color);
  color: white;
  font-size: 1rem;
  padding: 1rem .5rem 1rem .5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.secondary-button{
  border: none;
  background-color: transparent;
  color: var(--main-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 1rem .5rem 1rem .5rem;
  cursor: pointer;
  outline: solid 1px var(--main-color);
}

</style>