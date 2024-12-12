<template>
  <div v-if="isMobile">
    <h1 class="text-2xl font-bold my-5">Edit the Details of your Pet</h1>

    <div class="flex flex-col gap-y-4">
      <input
          v-model="pet_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Name" type="text"
      />

      <div class="flex gap-x-3">
        <select
            v-model="selectedOption"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-3/6"
        >
          <option
              v-for="pet_type in pet_types_array"
              :key="pet_type.id"
              :value="pet_type.type"
          >
            {{ pet_type.type }}
          </option>
        </select>

        <input
            v-model="pet_birthdate"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-sm w-3/6"
            placeholder="Enter Your Pet Birthdate" type="date"
        />
      </div>

      <input
          v-model="pet_breed"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Breed" type="text"
      />

      <div class="w-full flex flex-col gap-y-4 mt-5">
        <button
            class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer"
            @click="editPet"
        >
          Submit
        </button>

        <button
            class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer"
            @click="goBack"
        >
          Back
        </button>
      </div>
    </div>
  </div>
  <div v-if="!isMobile" class="mx-auto w-11/12">
    <h1 class="text-2xl font-bold my-5">Edit the Details of your Pet</h1>

    <div class="flex flex-col gap-y-4">
      <input
          v-model="pet_name"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Name" type="text"
      />

      <div class="flex gap-x-3">
        <select
            v-model="selectedOption"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-md w-3/6"
        >
          <option
              v-for="pet_type in pet_types_array"
              :key="pet_type.id"
              :value="pet_type.type"
          >
            {{ pet_type.type }}
          </option>
        </select>

        <input
            v-model="pet_birthdate"
            class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-sm w-3/6"
            placeholder="Enter Your Pet Birthdate" type="date"
        />
      </div>

      <input
          v-model="pet_breed"
          class="p-4 rounded-md outline outline-2 outline-[var(--secondary-color)] focus:outline-[var(--main-color)] text-xl"
          placeholder="Enter Your Pet Breed" type="text"
      />

      <div class="flex w-full gap-5 mt-5">
        <button
            class="bg-[var(--main-color)] py-3 rounded-md text-white text-xl cursor-pointer w-full"
            @click="editPet"
        >
          Submit
        </button>

        <button
            class="text-[var(--main-color)] text-xl outline outline-2 outline-[var(--main-color)] py-3 rounded-md cursor-pointer w-full"
            @click="goBack"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {updateLayout} from "@/helpers/layoutHelper";

export default {
  name: "EditPetView",
  mounted() {
    this.populateData();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up event listener
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  data() {
    return {
      isMobile: updateLayout(),


      selectedOption: "",
      pet_types_array: [],
      pets: [],
      pet_name: "",
      pet_breed: "",
      pet_birthdate: "",
      pet_type: "",
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    populateData() {
      let user_id;
      if (this.$route.params.userId){
        user_id = this.$route.params.userId
      }
      else {
        user_id = localStorage.getItem('user_id')
      }

      this.pets = JSON.parse(localStorage.getItem(`pets_${user_id}`));
      console.log(this.pets)
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
    async editPet() {
      const url = process.env.VUE_APP_API_URL;
      const bearer = localStorage.getItem("bearer_token");
      const pet_id = this.$route.params.id;
      const user_id = this.$route.params.userId

      // Find the pet type from the selected option
      const selectedPetType = this.pet_types_array.find(pet => pet.type === this.selectedOption)

      // Find the pet in the local storage list
      let petsLocalStorage = JSON.parse(localStorage.getItem(`pets_${user_id}`));
      const petIndex = petsLocalStorage.findIndex(pet => pet.id === parseInt(pet_id));

      if (petIndex !== -1) {
        // Update pet data locally
        petsLocalStorage[petIndex].name = this.pet_name;
        petsLocalStorage[petIndex].breed = this.pet_breed;
        petsLocalStorage[petIndex].birthdate = this.pet_birthdate;
        petsLocalStorage[petIndex].pet_type_id = selectedPetType.id;

        // Update local storage with the modified pet
        localStorage.setItem(`pets_${user_id}`, JSON.stringify(petsLocalStorage));

        try {
          // Now make the API request to save the changes
          const response = await axios.patch(
              `${url}/api/user/${user_id}/edit_pet/${pet_id}`,
              {
                pet_type_id: selectedPetType.id,
                user_id: user_id,
                name: this.pet_name,
                breed: this.pet_breed,
                birthdate: this.pet_birthdate,
              },
              {
                headers: {
                  Authorization: `Bearer ${bearer}`,
                },
              }
          );

          if (response) {
            // Redirect to dashboard after successful update
            this.$router.push('/refresh').then(() => {
              this.$router.push('/dashboard');
            });
          }
        } catch (err) {
          console.log("API Request Error", err);
        }
      } else {
        console.log("Pet not found in local storage.");
      }
    }
    // async editPet() {
    //   const url = process.env.VUE_APP_API_URL;
    //   const bearer = localStorage.getItem("bearer_token");
    //   const pet_id = this.$route.params.id;
    //   const user_id = localStorage.getItem("user_id");
    //
    //   const selectedPet = this.pet_types_array.find(pet => pet.type === this.selectedOption);
    //
    //   try {
    //     const response = await axios.patch(
    //         `${url}/api/user/${user_id}/edit_pet/${pet_id}`,
    //         {
    //           pet_type_id: selectedPet.id,
    //           user_id: user_id,
    //           name: this.pet_name,
    //           breed: this.pet_breed,
    //           birthdate: this.pet_birthdate,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${bearer}`,
    //           },
    //         }
    //     );
    //     if (response){
    //       this.$router.push('/refresh').then(() => {
    //         this.$router.push('/dashboard'); // Navigate back to the same route
    //       });
    //     }
    //   } catch (err) {
    //     console.log("API Request Error", err);
    //   }
    // },
  },
};
</script>

<style scoped>
</style>
