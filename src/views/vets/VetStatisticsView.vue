<template>
  <div class="">
    <h1 class="text-2xl font-bold my-5">Total Statistics</h1>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Description</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Total Count</td>
        </tr>
        </thead>
        <tbody>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total Vaccinated
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{vaccinated}}
          </td>
        </tr>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total Checkup
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{checkup}}
          </td>
        </tr>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total Canine
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{canine}}
          </td>
        </tr>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total Feline
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{feline}}
          </td>
        </tr>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total of male Pets
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{male}}
          </td>
        </tr>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total of female Pets
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{female}}
          </td>
        </tr>
        <tr  class="text-center">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            Total Other Species
          </td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">
            {{others}}
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>



</template>


<script>
import axios from "axios";

export default {
  name: "VetStatisticsView",
  data(){
    return {
      checkup: '',
      vaccinated: '',
      canine: '',
      feline: '',
      male: '',
      female: '',
      others: '',

    }
  },
  created() {
    this.getStatistics()
  },
  methods:{
    async getStatistics(){

      /*
      * api/vets/statistics
      *
      *   'total_vaccinated' => $total_vaccinated,
            'total_checkups' => $total_checkups,
            'total_canine' => $total_canine,
            'total_feline' => $total_feline,
            'total_male' => $total_male,
            'total_female' => $total_female,
            'total_others' => $total_others,
      * */

      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");

      try {
        const response = await axios.get(`${url}/api/vets/statistics`, {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        });
        // console.log(response.data.vets)
        this.checkup = response.data.total_checkups
        this.vaccinated = response.data.total_vaccinated
        this.canine = response.data.total_canine
        this.feline = response.data.total_feline
        this.male = response.data.total_male
        this.female = response.data.total_female
        this.others = response.data.total_others
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

</style>