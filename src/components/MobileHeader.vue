<script>
export default {
  name: "MobileHeader",
  props: {
    name: String,
  }
}
</script>

<template>
<section>
  <div class="header">

      <img src="/images/Logo.png" alt="Vet Logo" class="image-container">

    <div>Hello, {{name}}</div>
  </div>
</section>
</template>

<style scoped>

</style>