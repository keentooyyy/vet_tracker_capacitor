<template>
  <div>
    <MobileHeader :name="first_name" class="bg-[var(--main-color)] w-full"/>

    <div class="w-11/12 mx-auto">
      <router-view>
      </router-view>
    </div>

    <button @click="logoutUser"> Logout</button>

    <div id="footer">
      <MobileFooterBar />
    </div>
  </div>


</template>


<script>
import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";

import MobileFooterBar from "@/components/MobileFooterBar.vue";


export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {MobileFooterBar, MobileHeader},
  created() {
    this.getUserData()
  },

  data() {
    return {
      dashboardApiData: '',
      first_name: null,
    }
  },
  methods: {
    async getUserData() {
      const url = process.env.VUE_APP_API_URL;
      const id = localStorage.getItem('user_id')
      const bearer = localStorage.getItem('bearer_token')


      try {
        const response = await axios.get(`${url}/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });
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
  },
}


</script>

<style scoped>

</style>