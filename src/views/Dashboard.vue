<script>
import axios from 'axios';
import MobileHeader from "@/components/MobileHeader.vue";
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {MobileHeader},
  setup(){

  },
  beforeMount(){
    this.getUserData()
  },
  data(){
    return {
      first_name: null,
      error: false,
    }
  },
  methods: {
    async getUserData(){
      const url = process.env.VUE_APP_API_URL;
      const id = localStorage.getItem('user_id');
      try{
        const response = await axios.get(`${url}/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('bearer_token')}`,
          }
        });
        console.log(response.data)
        this.first_name = response.data.user.first_name;
      }catch(err){
        this.error = err;
        console.log('API request Failed', err)
        this.$router.push('/');
      }
    },
  }
}
</script>

<template>
  <MobileHeader :name="first_name"/>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.container {
  width: 90%;
  background-color: red;
  margin: auto;
}
</style>