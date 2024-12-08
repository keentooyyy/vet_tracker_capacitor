<template>
  <div class="lg:hidden">


    <div class="flex justify-center">
      <img alt="Vet Logo" class="w-3/6 mt-12" src="/images/Logo.png">
    </div>



    <h1 class="text-2xl text-center my-8 font-bold">Welcome to Vet Tracker</h1>


    <div class="flex flex-col gap-y-5 w-11/12 mx-auto">
      <input class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" v-model="email" placeholder="Email" type="email" @keyup.enter="handleEnter"/>
      <input class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl" v-model="password" placeholder="Password" type="password" @keyup.enter="handleEnter"/>

      <div class="flex flex-col">
        <button class="bg-[var(--main-color)] py-5 rounded-md text-white text-xl cursor-pointer" @click="loginUser">Login</button>
        <router-link class="text-center text-[var(--main-color)] underline text-xl mt-3 cursor-pointer" to="/register">Create Account</router-link>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async login() {
      const url = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.post(`${url}/api/user/login`, {
          email: this.email,
          password: this.password,
        }, {
          withCredentials: true
        })

        if (response.data.token && response.data.id) {
          localStorage.setItem('bearer_token', response.data.token);
          localStorage.setItem('user_id', response.data.id);

          this.$router.push('/dashboard/pets');
        } else {
          throw new Error('Invalid response data');
        }
      } catch (err) {
        console.log('API request Failed', err)
      }
    },
    loginUser() {
      this.login()
    },
    handleEnter() {
      this.loginUser();
    }
  }


}
</script>


<style scoped>

</style>