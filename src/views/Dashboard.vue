<template>
  <div class="lg:hidden">
    <MobileHeader :name="first_name"/>

    <div class="w-11/12 mx-auto md:max-w-screen-sm">
      <router-view>
      </router-view>
    </div>



    <div id="footer-shadow" class="fixed bottom-0 w-full">
      <MobileFooterBar/>
    </div>

  </div>

  <div class="hidden lg:flex h-screen">

    <div class="w-1/6 bg-[var(--main-color)] h-full p-5">
      <img alt="Vet Logo" class="mt-10 px-3" src="/images/Logo.png">
      <MobileFooterBar/>
    </div>


    <div class="w-full flex flex-col h-full">
      <MobileHeader :name="first_name"/>

      <div class="flex flex-1 justify-between overflow-hidden">

        <div class="pl-8 flex-1 overflow-y-auto">
          <router-view />
        </div>

        <div class="bg-white w-4/12 h-full overflow-y-auto">
          <p>Appointments</p>
        </div>

      </div>
    </div>
  </div>



</template>


<script>
// import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";

import MobileFooterBar from "@/components/MobileFooterBar.vue";


export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {MobileFooterBar, MobileHeader},


  created() {
    // this.getUserData()
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
    // async getUserData() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const id = localStorage.getItem('user_id')
    //   const bearer = localStorage.getItem('bearer_token')
    //
    //
    //   try {
    //     const response = await axios.get(`${url}/api/user/${id}`, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       }
    //     });
    //     this.first_name = response.data.user.first_name.charAt(0).toUpperCase() + response.data.user.first_name.slice(1);
    //
    //     if (response.data.user.account_type === 'vets'){
    //       this.$router.push('/dashboard/vet')
    //       localStorage.setItem('account_type', response.data.user.account_type);
    //     }
    //     else {
    //       this.$router.push('/dashboard/pets')
    //       localStorage.setItem('account_type', response.data.user.account_type);
    //     }
    //   } catch (err) {
    //     this.error = err;
    //     console.log('API request Failed', err)
    //     localStorage.clear()
    //     this.$router.push('/')
    //   }
    // },


  },
}


</script>

<style scoped>
#footer-shadow{
  filter: drop-shadow(0px 0px 77px #000000);
}
</style>