<template>
  <div class="flex flex-col gap-6" v-if="isMobile">
    <div class="flex justify-between">
      <h1 class="text-2xl my-5">Your Notifications</h1>
      <button class="underline text-[var(--main-color)]" @click="markAllAsRead">Mark all as read</button>
    </div>

    <div class="bg-white p-6 rounded-md flex gap-5 cursor-pointer" v-for="notification in notifications.slice(0, displayedNotifications)" :key="notification.id">
      <img alt="appointment-icon" class="w-12" src="/images/svgs/appointment-icon.svg"/>
      <div class="font-black">
        <h1 class="font-bold text-sm">{{ notification.title }}</h1>
        <p class="opacity-50 text-xs">{{ notification.message }}</p>
      </div>
    </div>
  </div>


  <div class="flex flex-col gap-6 w-11/12 mx-auto" v-if="!isMobile">
    <div class="flex justify-between">
      <h1 class="text-2xl my-5">Your Notifications</h1>
      <button class="underline text-[var(--main-color)]" @click="markAllAsRead">Mark all as read</button>
    </div>

    <div class="bg-white p-6 rounded-md flex gap-5 cursor-pointer" v-for="notification in notifications.slice(0, displayedNotifications)" :key="notification.id">
      <img alt="appointment-icon" class="w-12" src="/images/svgs/appointment-icon.svg"/>
      <div class="font-black">
        <h1 class="font-bold text-2xl w-full">{{ notification.title }}</h1>
        <p class="opacity-50">{{ notification.message }}</p>
      </div>
    </div>
  </div>



</template>

<script>
import axios from "axios";
import {updateLayout} from "@/helpers/layoutHelper";

export default {
  name: "NotificationView",
  data() {
    return {
      notifications: [],
      displayedNotifications: 50,
      isMobile: updateLayout(),
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.fetchNotification();
  },
  mounted() {
    this.populateNotification();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  methods: {
    populateNotification() {
      // Retrieve notifications from localStorage if available
      const savedNotifications = localStorage.getItem("notifications");
      if (savedNotifications) {
        this.notifications = JSON.parse(savedNotifications);
      }
    },
    async fetchNotification() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");
      const user_id = localStorage.getItem("user_id");

      try {
        const response = await axios.get(`${url}/api/user/get_notifications/${user_id}`, {
          headers: {Authorization: `Bearer ${bearer}`},
        });

        // Assuming response.data.notifications is the list of notifications
        this.notifications = response.data.notifications;
        localStorage.setItem("notifications", JSON.stringify(this.notifications));
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    },
    markAllAsRead() {
      // Placeholder method to mark notifications as read
      // For now, just clearing notifications as an example
      this.notifications.forEach(notification => {
        notification.read = true; // Assuming each notification has a "read" property
      });

      // Update localStorage after marking all as read
      localStorage.setItem("notifications", JSON.stringify(this.notifications));
    }
  }
};
</script>

<style scoped>
/* Add custom styles for your component if needed */
</style>
