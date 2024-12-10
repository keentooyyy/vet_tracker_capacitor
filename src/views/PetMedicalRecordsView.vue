<template>
  <div>
    <h1 class="text-2xl font-bold my-5">Pet Medical Record Details</h1>

    <p>Name: <span class="font-bold uppercase">{{ pet_name }}</span></p>
    <p>Breed: <span class="font-bold uppercase">{{ pet_breed }}</span></p>
    <p>Pet Type: <span class="font-bold uppercase">{{ pet_type }}</span></p>
    <br>

    <h1 class="text-2xl font-bold my-5">Medical Records</h1>

    <div class="overflow-x-auto">
      <table>
        <thead>
        <tr>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Vaccine Type</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Date Administered</td>
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Date of Next Administration</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="medical_record in medical_records_array" :key="medical_record.id">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ getVaccineName(medical_record.id) }}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ medical_record.date_of_administration }}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{ medical_record.date_of_next_administration || 'None' }}</td>
        </tr>
        </tbody>
      </table>

      <p class="mt-5">Fully Vaccinated?</p>


      <template v-if="isVet">
        <select v-model="vaccinationStatus" class="font-bold border p-2">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </template>
      <template v-else>
        <p class="font-bold">{{ vaccinationStatus === 'yes' ? 'Yes' : 'No' }}</p>
      </template>
    </div>

    <button
        class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer w-full mt-8"
        @click="goBack">Back
    </button>

<!--    if isVet Show update button that on click will show  a modal of date input for date administed then submit to api add another optional input for next administration -->
    <div>
      update button here
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "PetMedicalRecordsView",
  data() {
    return {
      pet_types_array: [],
      vaccine_types_array: [],
      medical_records_array: [],
      pet_name: '',
      pet_breed: '',
      pet_type: '',
      vaccinationStatus: 'yes', // Default vaccination status
      isVet: false, // Default is not a vet
    };
  },
  created() {
    // this.getPetTypes();
    // this.getVaccineTypes();
    // this.getPetDetails();
    // this.getMedicalRecords();
    this.checkAccountType();
  },
  updated() {
    for (let i = 0; i < this.pet_types_array.length; i++) {
      if (this.pet_type === this.pet_types_array[i].id) {
        this.pet_type = this.pet_types_array[i].type;
      }
    }
  },
  methods: {
    checkAccountType() {
      const accountType = localStorage.getItem("account_type");
      if (accountType === "vets") {
        this.isVet = true; // User is a vet, show dropdown
      } else {
        this.isVet = false; // User is not a vet, show static "Yes"
      }
    },
    // async getPetDetails() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const bearer = localStorage.getItem('bearer_token');
    //   const pet_id = this.$route.params.id;
    //
    //   try {
    //     const response = await axios.get(`${url}/api/user/get_pet/${pet_id}`, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       },
    //     });
    //
    //     this.pet_name = response.data.current_pet.name;
    //     this.pet_breed = response.data.current_pet.breed;
    //     this.pet_birthdate = response.data.current_pet.birthdate;
    //     this.pet_type = response.data.current_pet.pet_type_id;
    //     // Assign vaccination status from API response
    //     this.vaccinationStatus = response.data.current_pet.is_fully_vaccinated ? 'yes' : 'no';
    //
    //   } catch (err) {
    //     console.log('API Request Error', err);
    //   }
    // },
    goBack() {
      this.$router.back();
    },
    // async getPetTypes() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const bearer = localStorage.getItem('bearer_token');
    //
    //   try {
    //     const response = await axios.get(`${url}/api/get_pet_type`, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       },
    //     });
    //
    //     this.pet_types_array = response.data.types;
    //
    //   } catch (err) {
    //     console.log('API Request Error', err);
    //   }
    // },
    // async getVaccineTypes() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const bearer = localStorage.getItem('bearer_token');
    //
    //   try {
    //     const response = await axios.get(`${url}/api/get_vaccines`, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       },
    //     });
    //
    //     this.vaccine_types_array = response.data.vaccines;
    //   } catch (err) {
    //     console.log('API Request Error', err);
    //   }
    // },
    // async getMedicalRecords() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const bearer = localStorage.getItem('bearer_token');
    //   const pet_id = this.$route.params.id;
    //
    //   try {
    //     const response = await axios.get(`${url}/api/user/pet/get_records/${pet_id}`, {
    //       headers: {
    //         'Authorization': `Bearer ${bearer}`,
    //       },
    //     });
    //
    //     this.medical_records_array = response.data.records;
    //   } catch (err) {
    //     console.log('API error', err);
    //   }
    // },
    getVaccineName(vaccineId) {
      for (let i = 0; i < this.vaccine_types_array.length; i++) {
        if (this.vaccine_types_array[i].id === vaccineId) {
          return this.vaccine_types_array[i].name; // Return the name if a match is found
        }
      }
      return 'Unknown Vaccine'; // Return default if no match is found
    },
  },
};
</script>

<style scoped>
</style>
