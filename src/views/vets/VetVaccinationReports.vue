<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold my-5">Vaccination Reports</h1>
      <div class="flex my-5 gap-6 items-center">
        <div>
          <input
              v-model="startDate"
              class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-sm w-full"
              type="date"
          />
          <p class="text-center opacity-50">Date from</p>
        </div>
        <div>
          <input
              v-model="endDate"
              class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-sm w-full"
              type="date"
          />
          <p class="text-center opacity-50">Date To</p>
        </div>
      </div>
    </div>

    <!-- Show "NO DATE SELECTED" if no dates are selected -->
    <div v-if="!isDateRangeSelected" class="text-center text-xl font-semibold text-gray-500 ">
      NO DATE SELECTED
    </div>

    <!-- Conditionally render table based on date inputs -->
    <div v-if="isDateRangeSelected" class="overflow-x-auto">
      <table class="w-full">
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Description</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Total</td>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">Total 5 in 1 Shots</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ five_in_one }}</td>
        </tr>
        <tr class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">Total General Checkups</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ general_check_up }}</td>
        </tr>
        <tr class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">Total Anti Rabies Shots</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ anti_rabies }}</td>
        </tr>
        <tr class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">Total De-worm Shots</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ de_worm }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "VetVaccinationReports",
  data() {
    return {
      startDate: null,
      endDate: null,
      de_worm: 0,
      anti_rabies: 0,
      general_check_up: 0,
      five_in_one: 0,
    };
  },
  computed: {
    isDateRangeSelected() {
      return this.startDate && this.endDate;
    }
  },
  watch: {
    // Watch for changes in startDate or endDate and call the method to fetch stats
    startDate(newValue) {
      if (newValue && this.endDate) {
        this.getStatisticsByDate();
      }
    },
    endDate(newValue) {
      if (newValue && this.startDate) {
        this.getStatisticsByDate();
      }
    }
  },
  methods:{
    async getStatisticsByDate(){
      /*
      * api/vets/statistics_by_date
      *
      * 'date_from' => 'required|date',
        'date_to' => 'required|date',
        *
        *
      * 'total_5_in_1_shots' => $fiveInOneCount,
        'total_general_checkups' => $generalCheckupCount,
        'total_anti_rabies_shots' => $antiRabiesCount,
        'total_de_worm_shots' => $deWormCount,
      *
      * */

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.post(`${url}/api/vets/statistics_by_date`,{
          date_from: this.startDate,
          date_to: this.endDate,
        } ,{
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        // console.log(response.data.vets)
        this.five_in_one = response.data.total_5_in_1_shots
        this.general_check_up = response.data.total_general_checkups
        this.anti_rabies = response.data.total_anti_rabies_shots
        this.de_worm = response.data.total_de_worm_shots
      } catch (err) {
        console.log("API request Failed", err);
        // localStorage.clear();
        // this.$router.push("/");
      }
    }
  }
}
</script>



<style scoped>
/* Add your custom styles here */
</style>
