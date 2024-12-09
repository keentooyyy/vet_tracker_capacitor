<template>
  <div class="lg:hidden">


    <div class="flex justify-center">
      <img alt="Vet Logo" class="w-3/6 mt-12" src="/images/Logo.png">
    </div>


    <h1 class="text-2xl text-center my-8 font-bold">Create an Account</h1>


    <div class="flex flex-col gap-y-5 w-11/12 mx-auto">

      <input
          v-model="first_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="First Name" type="text"/>
      <input
          v-model="last_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="Last Name" type="text"/>
      <input
          v-model="email"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="Email" type="email"/>
      <input
          v-model="password"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="Password" type="password"/>
      <input
          v-model="confirm_password"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="Confirm Password" type="password"/>
      <input
          v-model="street"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="Street" type="text"/>
      <input
          v-model="brgy"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="Brgy." type="text"/>
      <input
          v-model="city"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" placeholder="City" type="text"/>

      <div class="flex flex-col mb-24">
        <button class="bg-[var(--main-color)] py-5 rounded-md text-white text-xl" @click="registerUser">Create</button>
        <router-link class="text-center text-[var(--main-color)] underline text-xl mt-3" to="/">Already have an
          account?
        </router-link>
      </div>

    </div>

  </div>

  <div class="hidden lg:flex">
    <div class="flex justify-center w-3/5 items-center h-svh">
      <img alt="Vet Logo" class="w-2/4" src="/images/Logo.png">
    </div>
    <div class="bg-white flex flex-col w-2/5 items-center justify-center">
      <h1 class="text-2xl text-center font-bold mt-10 ">Create an Account</h1>
      <div class="flex flex-col gap-y-5 w-4/5 mx-auto mt-10 mb-10">
        <input
            v-model="first_name"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="First Name" type="text"/>
        <input
            v-model="last_name"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="Last Name" type="text"/>
        <input
            v-model="email"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="Email" type="email"/>
        <input
            v-model="password"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="Password" type="password"/>
        <input
            v-model="confirm_password"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="Confirm Password" type="password"/>
        <input
            v-model="street"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="Street" type="text"/>
        <input
            v-model="brgy"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="Brgy." type="text"/>
        <input
            v-model="city"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md" placeholder="City" type="text"/>
        <button class="bg-[var(--main-color)] py-5 rounded-md text-white text-xl cursor-pointer mt-3"
                @click="registerUser">
          Create
        </button>
        <router-link class="text-center text-[var(--main-color)] underline text-xl cursor-pointer" to="/">
          Already have an
          account?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  setup() {


  },
  data() {
    return {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      confirm_password: null,
      street: null,
      brgy: null,
      city: null,
      error: null
    }
  },
  onUpdate() {

  },
  methods: {
    async registerData() {
      const url = process.env.VUE_APP_API_URL;
      // console.log(url);
      try {
        const response = await axios.post(`${url}/api/user/register`, {

          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
          street: this.street,
          brgy: this.brgy,
          city: this.city,


        }, {
          withCredentials: true
        })
        // console.log(response.data.token);
        if (response.data.token && response.data.id) {
          localStorage.setItem('bearer_token', response.data.token);
          localStorage.setItem('user_id', response.data.id);

          // Redirect only after successful login
          this.$router.push('/dashboard/pets');
        } else {
          // Handle case if the response does not contain expected data
          throw new Error('Invalid response data');
        }
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err)
      }
    },
    registerUser() {
      this.registerData()
    }
  }
}
</script>

<style scoped>

</style>