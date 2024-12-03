<template>
  <section>
    <h1 class="title">Your Pets</h1>

    <input type="text" placeholder="Enter Your Pet Name" />
    <input type="text" placeholder="Enter Your Pet Breed" />
    <input type="date" placeholder="Enter Your Pet Birthdate" />
    <select>
      <option>Canine</option>
      <option>Feline</option>
      <option>Other Species</option>
    </select>
  </section>
</template>

<script>
export default {
  name: "EditPetView",
  onBeforeMount() {

  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>

</style>