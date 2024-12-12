

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold my-5">Your Notifications</h1>
      <button class="underline text-[var(--main-color)]">Mark all as read</button>
    </div>


    <div class="bg-white p-6 rounded-md flex gap-5 cursor-pointer" v-for="notification in notifications.slice(0, displayedNotifications)" :key="notification.id">
      <img alt="appointment-icon" class="w-12" src="/images/svgs/appointment-icon.svg"/>
      <div class="font-black">
        <h1 class="font-bold text-2xl">{{ notification.title }}</h1>
        <p class="w-96 opacity-50">{{notification.message}}</p>
      </div>
    </div>





  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "NotificationVIew",
  data(){
    return {
      notifications: [],
      displayedNotifications: 50
    }
  },
  created() {
    this.fetchNotification()
  },
  mounted() {
    this.populateNotification()
  },
  methods:{
    populateNotification(){
      this.notifications = JSON.parse(localStorage.getItem("notifications"));
      // console.log(this.notifications);
    },
    async fetchNotification(){


      /*
      * api/user/get_notifications/{$user_id}
      *
      *
      *
      * */
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')
      const user_id = localStorage.getItem('user_id')

      try {
        const response = await axios.get(`${url}/api/user/get_notifications/${user_id}`, {
          headers: {'Authorization': `Bearer ${bearer}`},
        });
        // console.log(response.data.notifications)
        localStorage.setItem('notifications', JSON.stringify(response.data.notifications));
        this.populateNotification()
      } catch (err) {
        console.log('API Request Error', err);
      }
    }
  }
}
</script>

<style scoped>

</style>