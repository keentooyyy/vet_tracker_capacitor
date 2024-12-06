<script>
export default {
  name: "MobileHeader",
  props: {
    name: String,
  }
}
</script>

<template>
  <div class="flex gap-x-3 items-center w-11/12 mx-auto">
    <img alt="Vet Logo" class="m-2 w-1/4" src="/images/Logo.png">

    <div class="text-white text-2xl font-bold">Hello, {{ name }}</div>
  </div>
</template>

<style scoped>

</style>