<template>
  <div class="lg:hidden">
    <div class="flex justify-center">
      <img alt="Vet Logo" class="w-3/6 mt-12" src="/images/Logo.png">
    </div>

    <h1 class="text-2xl text-center my-8 font-bold">Welcome to Vet Tracker</h1>

    <div class="flex flex-col gap-y-5 w-11/12 mx-auto">
      <input
          v-model="email"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Email" type="email" @keyup.enter="handleEnter"/>
      <input
          v-model="password"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Password" type="password" @keyup.enter="handleEnter"/>

      <div class="flex flex-col">
        <button class="bg-[var(--main-color)] py-5 rounded-md text-white text-xl cursor-pointer" @click="loginUser">
          Login
        </button>
        <router-link class="text-center text-[var(--main-color)] underline text-xl mt-3 cursor-pointer" to="/register">
          Create Account
        </router-link>
      </div>
    </div>
  </div>

  <div class="hidden lg:flex">
    <div class="flex justify-center w-3/5 items-center h-svh">
      <img alt="Vet Logo" class="w-2/4" src="/images/Logo.png">
    </div>
    <div class="bg-white flex flex-col w-2/5 items-center justify-center">
      <h1 class="text-2xl text-center font-bold">Welcome to Vet Tracker</h1>
      <div class="flex flex-col gap-y-5 w-4/5 mx-auto mt-10">
        <input
            v-model="email"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md"
            placeholder="Email" type="email" @keyup.enter="handleEnter"/>
        <input
            v-model="password"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md"
            placeholder="Password" type="password" @keyup.enter="handleEnter"/>
        <button class="bg-[var(--main-color)] py-5 rounded-md text-white text-xl cursor-pointer mt-3"
                @click="loginUser">
          Login
        </button>
        <router-link class="text-center text-[var(--main-color)] underline text-xl cursor-pointer" to="/register">
          Create Account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useApiStore } from '@/stores/apiStore'; // Import the Pinia store

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async loginUser() {
      const apiStore = useApiStore(); // Access the Pinia store
      try {
        // Attempt to log the user in
        const userData = await apiStore.loginUser({
          email: this.email,
          password: this.password,
        });

        // If login is successful, userData should contain the necessary info (e.g., token)
        if (userData && userData.token) {
          console.log('User logged in:', userData);
          // Redirect to the dashboard
          this.$router.push('/dashboard');
        } else {
          // Handle case where login is unsuccessful (e.g., invalid credentials)
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    },

    handleEnter() {
      this.loginUser(); // Call login when "Enter" is pressed
    }
  },
};
</script>

<style scoped>
/* Add any specific styles for your component */
</style>
