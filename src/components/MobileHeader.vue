

<template>
  <div class="bg-[var(--main-color)]" v-if="!isSearchable" >
    <div class="flex gap-5 w-11/12 mx-auto items-center md:max-w-screen-sm">
      <img alt="Vet Logo" class="m-2 w-1/4 md:w-36" src="/images/Logo.png">

      <div class="text-white text-2xl font-bold md:text-4xl w-full">Hello, {{ name }}</div>
    </div>

  </div>

</template>

<script>
export default {
  name: "MobileHeader",
  props: {
    name: String,
    isSearchable: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      search: ''
    }
  },
}
</script>

<style scoped>

</style>