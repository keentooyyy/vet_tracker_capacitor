<script>
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data(){
    return{
      email: null,
      password: null,
    }
  },
  methods: {
    async login(){
      const url = process.env.VUE_APP_API_URL;
      try {
        const response = await axios.post(`${url}/api/user/login`, {
          email: this.email,
          password: this.password,
        })
        localStorage.setItem('bearer_token', response.data.token);
        localStorage.setItem('user_id', response.data.id);
        this.$router.push('/dashboard/pets')
      } catch (err){
        this.error = err;
        console.log('API request Failed', err)
      }
    },
    loginUser(){
      this.login()
    }
  }


}
</script>

<template>
  <section>


    <div>
      <img alt="Vet Logo" class="img-fluid" src="/images/Logo.png">
    </div>


    <h1 class="title">Welcome to Vet Tracker</h1>




    <div class="forms">
      <input v-model="email" placeholder="Email" type="email"/>
      <input v-model="password" placeholder="Password" type="password"/>
      <button @click="loginUser" class="button">Login</button>
      <router-link to="/register">Create Account</router-link>
    </div>





  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
}

.img-fluid {
  height: 15rem;
}

.title {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
}

.forms {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 1rem;
}
.forms input {
  padding: .75rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  outline: 2px solid var(--secondary-color);
}
.forms .button {
  border: none;
  background-color: var(--main-color);
  color: white;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
}

a {
  text-align: center;
  font-size: 1.2rem;
  color: var(--main-color);
}








.forms input:focus {
  outline-color: var(--main-color);
}
.forms input::placeholder {
  color: var(--main-color);
}


a:visited {
  color: var(--main-color);
}
</style>