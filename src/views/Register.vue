<script>
import axios from 'axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  setup(){


  },
  data(){
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
  onUpdate(){

  },
  methods: {
    async registerData(){
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



        },{
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
      } catch (err){
        this.error = err;
        console.log('API request Failed', err)
      }
    },
    registerUser(){
      this.registerData()
    }
  }
}
</script>

<template>
  <section>


    <div>
      <img alt="Vet Logo" class="img-fluid" src="/images/Logo.png">
    </div>


    <h1 class="title">Create an Account</h1>




    <div class="forms">

      <input v-model="first_name" placeholder="First Name" type="text"/>
      <input v-model="last_name" placeholder="Last Name" type="text"/>
      <input v-model="email" placeholder="Email" type="email"/>
      <input v-model="password" placeholder="Password" type="password"/>
      <input v-model="confirm_password" placeholder="Confirm Password" type="password"/>
      <input v-model="street" placeholder="Street" type="text"/>
      <input v-model="brgy" placeholder="Brgy." type="text"/>
      <input v-model="city" placeholder="City" type="text"/>

      <button @click="registerUser" class="button">Create</button>
      <router-link to="/">Already have an account?</router-link>
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
  margin-bottom: 6rem;
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