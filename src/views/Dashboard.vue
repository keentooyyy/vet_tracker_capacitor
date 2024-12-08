<template>
  <div>
    <MobileHeader :name="first_name" :isSearchable="isSearch"/>

    <div class="w-11/12 mx-auto md:max-w-screen-sm">
      <router-view :searchQuery="searchQuery">
      </router-view>
    </div>



    <div id="footer-shadow" class="fixed bottom-0 w-full">
      <MobileFooterBar @isSearch="handleSearch" />
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
      token: '',
      first_name: null,
      isSearch: false,
      searchQuery: ''
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

  },
}


</script>

<style scoped>
#footer-shadow{
  filter: drop-shadow(0px 0px 77px #000000);
}
</style>