<template>
  <div v-if="isMobile">

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
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="medical_record in medical_records_array" :key="medical_record.id">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{getVaccineName(medical_record.vaccine_id)}}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{medical_record.date_of_administration}}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{medical_record.date_of_next_administration || None}}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]"><button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full">Delete</button></td>
        </tr>
        <tr v-if="!medical_records_array.length">
          <td colspan="4" class="text-center text-gray-500 font-bold">No past medical records found.</td>
        </tr>
        </tbody>
      </table>

      <button class="bg-[var(--main-color)] py-3 px-2 rounded-md text-white text-md mt-3 cursor-pointer" v-if="isVet" @click="openModal">
        Add Medical Record
      </button>
      <p class="mt-5">Fully Vaccinated?</p>
      <div v-if="isVet">
        <select :value="isFullyVaccinated" class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-1/4">
          <option :value="!isFullyVaccinated">Yes</option>
          <option :value="isFullyVaccinated">No</option>
        </select>
      </div>
    </div>

    <button
        class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer w-full mt-8"
        @click="goBack">Back
    </button>
  </div>







  <div v-if="!isMobile" class=" w-11/12 mx-auto">
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
          <td class="bg-[var(--main-color)] text-white text-center font-bold px-2">Action</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="medical_record in medical_records_array" :key="medical_record.id">
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{getVaccineName(medical_record.vaccine_id)}}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{medical_record.date_of_administration}}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]">{{medical_record.date_of_next_administration || 'none'}}</td>
          <td class="text-center uppercase px-2 border border-[var(--main-color)]"><button class="bg-red-800 py-3 px-2 rounded-md text-white text-sm cursor-pointer w-full">Delete</button></td>
        </tr>
        <tr v-if="!medical_records_array.length">
          <td colspan="4" class="text-center text-gray-500 font-bold">No past medical records found.</td>
        </tr>
        </tbody>
      </table>

      <button class="bg-[var(--main-color)] py-3 px-2 rounded-md text-white text-md mt-3 cursor-pointer" v-if="isVet" @click="openModal">
        Add Medical Record
      </button>
      <p class="mt-5">Fully Vaccinated?</p>
      <div v-if="isVet">
        <select :value="isFullyVaccinated" class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-1/4">
          <option :value="!isFullyVaccinated">Yes</option>
          <option :value="isFullyVaccinated">No</option>
        </select>
      </div>

      <div v-else>
        <p class="font-bold" v-if="isFullyVaccinated === 1">Yes</p>
        <p class="font-bold" v-else>No</p>
      </div>

    </div>

    <button
        class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 px-10 rounded-md cursor-pointer  mt-8"
        @click="goBack">Back
    </button>
  </div>





  <teleport to="body">
    <div v-if="isOpen"
         class="bg-gray-500 bg-opacity-60 absolute top-0 h-screen w-full flex flex-col justify-center items-center">
      <div class="w-10/12 md:max-w-screen-sm">
        <div class="bg-gray-300 rounded-tl-md rounded-tr-md p-3">
          <div class="cursor-pointer text-[var(--main-color)] text-end" @click="openModal">X</div>
        </div>
        <div class="bg-white py-5 px-3 flex gap-6 flex-wrap">
          <div class="w-full">
            <select
                v-model="selectedOption"
                class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-full"
            >
              <option
                  v-for="vaccine_types in vaccine_types_array"
                  :key="vaccine_types.id"
                  :value="vaccine_types.id"
              >
                {{ vaccine_types.name }}
              </option>
            </select>
            <p class="opacity-50 mt-2">Vaccine Administered</p>
          </div>
          <div class="w-full">
            <input
                v-model="date"
                class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-full"
                placeholder="Enter Date Administered"
                type="date">
            <p class="opacity-50 mt-2">Date Administered</p>
          </div>
          <div class="w-full">
            <p class="text-sm mb-2 text-red-900">Leave empty if this is a one time administration or there is no need for next administration</p>
            <div class="flex gap-5">
              <input
                  v-model="number"
                  class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md "
                  placeholder="Enter a number"
                  type="number">
              <select v-model="selectedUnit" class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md ">
                <option value="Days">Days</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
              </select>
            </div>
            <p class="opacity-50 mt-2">Date of next Administration</p>

          </div>

        </div>
        <div class="bg-gray-300 rounded-bl-md rounded-br-md p-3 flex gap-x-5">
          <button
              class="text-sm outline outline-2 outline-[var(--main-color)] text-[var(--main-color)] rounded-full py-2 px-3 w-3/6"
              @click="createMedicalRecord">Submit
          </button>
          <button class="text-sm text-white bg-[var(--main-color)] rounded-full py-2 px-3 w-3/6" @click="openModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </teleport>

</template>


<script>
import axios from "axios";
import {updateLayout} from "@/helpers/layoutHelper";
import dayjs from "dayjs";

export default {
  name: "PetMedicalRecordsView",
  data() {
    return {

      isMobile: updateLayout(),

      pet_types_array: [],
      vaccine_types_array: [],
      medical_records_array: [],
      selectedOption: '',

      date: '',
      number: '',
      selectedUnit: '',


      pet_name: '',
      pet_breed: '',
      pet_type: '',
      isFullyVaccinated: false,

      isOpen: false,

      isVet: false,

    }
  },
  mounted() {
    this.getPetTypes()
    this.getVaccineTypes()
    this.populateData()


    // this.getPetDetails()
    this.getMedicalRecords()

    if (localStorage.getItem('account_type') === 'vets'){
      this.isVet = true
    }
    else {
      this.isVet = false
    }


  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  updated() {

    for (let i = 0; i < this.pet_types_array.length; i++) {
      if (this.pet_type === this.pet_types_array[i].id) {
        this.pet_type = this.pet_types_array[i].type
      }
    }
  },
  methods: {
    populateData() {
      let user_id;
      if (this.$route.params.userId) {
        user_id = this.$route.params.userId
      } else {
        user_id = localStorage.getItem('user_id')
      }
      this.pets = JSON.parse(localStorage.getItem(`pets_${user_id}`));
      // console.log(this.pets)
      this.pet_types_array = JSON.parse(localStorage.getItem("pet_types"));
      this.getPetDetails();
    },
    getPetDetails() {
      const pet_id = this.$route.params.id;
      const pet = this.pets.find(p => p.id === parseInt(pet_id));

      if (pet) {
        // Populate pet details
        this.pet_name = pet.name;
        this.pet_breed = pet.breed;
        this.pet_birthdate = pet.birthdate;
        this.pet_type = pet.pet_type_id;
        this.isFullyVaccinated = pet.is_fully_vaccinated

        // Find matching pet type based on pet_type_id
        for (let i = 0; i < this.pet_types_array.length; i++) {
          if (this.pet_types_array[i].id === pet.pet_type_id) {
            this.selectedOption = this.pet_types_array[i].type; // Set default value in dropdown
            break;
          }
        }
      } else {
        console.error("Pet not found");
      }
    },
    goBack() {
      this.$router.back()
    },
    async getPetTypes() {
      this.pet_types_array = JSON.parse(localStorage.getItem('pet_types'))
    },
    async getVaccineTypes() {
      this.vaccine_types_array = JSON.parse(localStorage.getItem('vaccine_types'))
    },

    async getMedicalRecords() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const pet_id = this.$route.params.id;

      try {
        const response = await axios.get(`${url}/api/user/pet/get_records/${pet_id}`, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });

        // Format date_of_administration and date_of_next_administration before assigning to medical_records_array
        this.medical_records_array = response.data.records.map(record => {
          const formattedDateOfAdministration = dayjs(record.date_of_administration);
          const formattedDateOfNextAdmin = dayjs(record.date_of_next_administration);

          return {
            ...record,
            date_of_administration: formattedDateOfAdministration.isValid() ? formattedDateOfAdministration.format('MMM D, YYYY') : 'Invalid Date',
            date_of_next_administration: formattedDateOfNextAdmin.isValid() ? formattedDateOfNextAdmin.format('MMM D, YYYY') : 'None', // Show 'None' if the date is invalid
          };
        });

        console.log('Formatted Medical Records', this.medical_records_array);
      } catch (err) {
        console.log('API error', err);
      }
    },
    getVaccineName(vaccineId) {
      for (let i = 0; i < this.vaccine_types_array.length; i++) {
        if (this.vaccine_types_array[i].id === vaccineId) {
          return this.vaccine_types_array[i].name; // Return the name if a match is found
        }
      }
      return 'Unknown Vaccine'; // Return default if no match is found
    },

    async createMedicalRecord() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem('bearer_token');
      const pet_id = this.$route.params.id;

      let date_of_next_administration = null;

      // Only calculate next administration date if a valid number is provided
      if (this.number && this.number > 0) {
        const dateAdministered = this.date ? new Date(this.date) : new Date(); // Use the provided date or default to current date
        const unit = this.selectedUnit;  // "Days", "Months", or "Years"

        switch (unit) {
          case 'Days':
            dateAdministered.setDate(dateAdministered.getDate() + parseInt(this.number));
            break;
          case 'Months':
            dateAdministered.setMonth(dateAdministered.getMonth() + parseInt(this.number));
            break;
          case 'Years':
            dateAdministered.setFullYear(dateAdministered.getFullYear() + parseInt(this.number));
            break;
          default:
            break;
        }

        // Format the date to Y-m-d
        date_of_next_administration = dateAdministered.toISOString().split('T')[0]; // This gives us "YYYY-MM-DD"
      }

      try {
        const response = await axios.post(`${url}/api/vets/create_medical_record`, {
          pet_id: pet_id,
          vaccine_id: this.selectedOption,
          date_of_administration: this.date,
          date_of_next_administration: date_of_next_administration || null // If no next date, send null
        }, {
          headers: {
            'Authorization': `Bearer ${bearer}`,
          }
        });

        console.log('Medical Record Created', response);

        // Re-fetch medical records after submitting
        this.getMedicalRecords();  // This will update the list of records
        this.openModal();  // Close the modal after submission
      } catch (err) {
        console.log('API error', err);
      }
    },


    openModal() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>


<style scoped>

</style>