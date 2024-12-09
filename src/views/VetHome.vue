<template>
  <div>
    <h1 class="text-2xl font-bold my-5"> All Users Pets with its registered pets</h1>

    <div class="overflow-x-auto">
      <table>
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">First Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Last Name</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Email</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">No. Registered Pets</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.first_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.last_name }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.email }}
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]" @click="userClicked(user.id)">
            {{ user.pets.length }}
          </td>
        </tr>
        </tbody>
      </table>

      <div class="flex mt-10 gap-12 w-full">
        <h1 class="text-2xl font-bold">Treatments</h1>
        <button class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer "
                @click="addNewVaccine">
          Add New Vaccine
        </button>
      </div>
      <table class="mt-5">
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Treatment types</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="vaccine_type in vaccine_types_array" :key="vaccine_type.id" class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ vaccine_type.name }}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            <button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
                    @click="deleteVaccine(vaccine_type.id)"> Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>


    </div>


    <div class="flex mt-10 gap-12 w-full">
      <h1 class="text-2xl font-bold">Species Types</h1>
      <button class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer "
              @click="addNewVaccine">
        Add New Species
      </button>
    </div>

    <table class="mt-5">
      <thead>
      <tr>
        <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Species</td>
        <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="vaccine_type in vaccine_types_array" :key="vaccine_type.id" class="text-center">
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ vaccine_type.name }}</td>
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">
          <button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
                  @click="deleteVaccine(vaccine_type.id)"> Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>



  </div>

  <teleport to="body">
    <div v-if="isOpen"
         class="bg-gray-500 bg-opacity-60 absolute top-0 h-screen w-full flex flex-col justify-center items-center">
      <div class=" w-10/12 md:max-w-screen-sm">
        <div class="bg-gray-300 rounded-tl-md rounded-tr-md p-3">
          <div class="cursor-pointer text-[var(--main-color)] text-end" @click="closeModal">X</div>
        </div>
        <div class="bg-white py-5 px-3 ">
          <input
              v-model="modal_input"
              class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-full" placeholder="Enter new treatment name" type="text">
        </div>
        <div class="bg-gray-300 rounded-bl-md rounded-br-md p-3 flex gap-x-5">
          <button
              class="text-sm outline outline-2 outline-[var(--main-color)] text-[var(--main-color)] rounded-full py-2 px-3 w-3/6"
              @click="createVaccine">Submit
          </button>
          <button class="text-sm text-white bg-[var(--main-color)] rounded-full py-2 px-3 w-3/6" @click="closeModal">
            Cancel
          </button>

        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";

export default {
  name: "VetHome",
  data() {
    return {
      isOpen: false,
      modal_input: '',
      users: [],
      vaccine_types_array: [],
    }
  },
  created() {
    this.getAllPetsAndUsers()
    this.getVaccineTypes()
  },
  methods: {
    async getAllPetsAndUsers() {
      /*
      * api/vets/get_all_pet_user
      *
      *
      * */

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try {
        const response = await axios.get(`${url}/api/vets/get_all_pet_user`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });
        this.users = response.data.users
      } catch (err) {
        console.log('API request Failed', err)
        localStorage.clear()
        this.$router.push('/')
      }


    },
    async getVaccineTypes() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try {
        const response = await axios.get(`${url}/api/get_vaccines`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })

        this.vaccine_types_array = response.data.vaccines
        // console.log('Vaccine Type', this.vaccine_types_array)

      } catch (err) {
        console.log('API Request Error', err)
      }
    },
    userClicked(userId) {
      this.$router.push({name: 'PetsView', params: {userId}});
    },
    addNewVaccine() {
      this.isOpen = true
    },
    async createVaccine() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token')

      try {
        const response = await axios.post(`${url}/api/vets/create_new_vaccine`, {
          name: this.modal_input
        }, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        })
        console.log(response)
        alert('Success')
        // this.$router.push('/refresh').then(() => {
        //   this.$router.push('/dashboard'); // Navigate back to the same route
        // });
      } catch (err) {
        console.log('API Request Error', err)
      }
    },
    async deleteVaccine(vaccineId){
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');


      try {
        const response = await axios.delete(`${url}/api/vets/delete_vaccine/${vaccineId}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          },
        });
        console.log(response)
        this.$router.push('/refresh').then(() => {
          this.$router.push('/dashboard'); // Navigate back to the same route
        });
      } catch (err) {
        console.log('API request Failed', err);
      }
    },
    closeModal() {
      this.isOpen = !this.isOpen
    }


  }
}
</script>

<style scoped>

</style>