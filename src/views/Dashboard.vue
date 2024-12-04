<script>
import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";
import {apiStore} from "@/stores/userStore";

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {MobileHeader},
  setup() {
  },
  beforeMount() {
    this.getUserData()
  },
  data() {
    return {
      dashboardApiData: '',
      first_name: null,
      error: false,

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
    logoutUser() {
      this.logout()
    }
  }
}
</script>

<template>
  <MobileHeader :name="first_name"/>
  <main class="container">
    <!--    <router-view></router-view>-->
    <router-view>
    </router-view>
    <button @click="logoutUser"> Logout</button>
  </main>
</template>

<style scoped>
.container {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
</style>