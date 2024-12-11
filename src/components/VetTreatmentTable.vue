<template>

  <div class="flex mt-10 w-full gap-10">
    <h1 class="text-2xl font-bold"> All kinds of Treatment</h1>

    <button class="bg-[var(--main-color)] px-3 rounded-md text-white text-sm cursor-pointer "
            @click="addNewVaccine">
      Add New Vaccine
    </button>
  </div>

  <div class="overflow-x-auto">
    <table>
      <thead>
      <tr>
        <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Treatment Type</td>
        <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
      </tr>
      </thead>
      <tbody>
      <tr class="text-center">
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">
          a
        </td>
        <td class="text-center uppercase px-2 border border-[var(--main-color)]">
          <button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full"
                  @click="deleteVaccine(vaccine_type.id)"> Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "VetTreatmentTable",
  data() {
    return {}
  },
  methods: {
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
        // alert('Success')
        // this.$router.push('/refresh').then(() => {
        //   this.$router.push('/dashboard'); // Navigate back to the same route
        // });
      } catch (err) {
        console.log('API Request Error', err)
      }
    },
  }
}
</script>


<style scoped>

</style>