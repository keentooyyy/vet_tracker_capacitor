<template>
  <MobileHeader :name="first_name"/>
  <main class="container">
    <!--    <router-view></router-view>-->
    <router-view>
    </router-view>
    <button @click="logoutUser"> Logout</button>
  </main>
</template>


<script>
import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";
import {apiStore} from "@/stores/apiStore";
import {petTypeStore} from "@/stores/petTypeStore";
import {petStore} from "@/stores/petStore";

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {MobileHeader},
  beforeMount() {
    this.getUserData()
    this.getPetTypes()


  },

  async created() {
    await this.getUserPets()
  },
  data() {
    return {
      dashboardApiData: '',
      first_name: null,
    }
  },
  methods: {
    async getUserData() {

      const useApiStore = apiStore();

      const url = process.env.VUE_APP_API_URL;

      const id = localStorage.getItem('user_id')
      const bearer = localStorage.getItem('bearer_token')


      try {

        const response = await axios.get(`${url}/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });
        useApiStore.setApiData(response.data);
        this.first_name = response.data.user.first_name.charAt(0).toUpperCase() + response.data.user.first_name.slice(1);
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err)
        localStorage.clear()
        this.$router.push('/')
      }
    },
    async logout() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')
      // console.log(bearer)
      try {
        const response = await axios.post(`${url}/api/user/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        console.log(response.data)
        localStorage.clear()
        this.$router.push('/')
      } catch (err) {
        this.error = err;
        console.log('API request Failed', err)
        localStorage.clear()
        this.$router.push('/')
      }
    },
    async getPetTypes(){

      const usePetTypeStore = petTypeStore()

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try{
        const response = await axios.get(`${url}/api/get_pet_type`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })
        usePetTypeStore.setPetTypes(response.data.types)
      }catch (err){
        console.log('API Request Error', err)
      }
    },
    async getUserPets() {

      const usePetStore = petStore()
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const id = localStorage.getItem('user_id');
      try {
        const response = await axios.get(`${url}/api/user/${id}/pets`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });


        usePetStore.setPets(response.data.pets)
        // console.log(usePetStore.getPets)

        // this.pets = response.data.pets; // Save the pets data in the `pets` array
      } catch (err) {
        console.log('API request Failed', err);
      }
    },
    logoutUser() {
      this.logout()
    }
  },
  beforeRouteUpdate() {
    this.getUserPets(); // Call the function every time the route updates
  }
}


</script>

<style scoped>
.container {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
</style>