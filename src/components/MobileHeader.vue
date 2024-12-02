<script>
export default {
  name: "MobileHeader",
  props: {
    name: String,
  }
}
</script>

<template>
<main>
  <div class="header">

      <img src="/images/Logo.png" alt="Vet Logo" class="image-container">

    <div>Hello, {{name}}</div>
  </div>
</main>
</template>

<style scoped>
main{
  background-color: var(--main-color);
}
.header{
  display: flex;
  height: 6rem;
  align-items: center;
  column-gap: 2rem;
  color: white;
  width: 85%;
  margin: auto;
}
.header div {
  font-size: 2rem;
  font-weight: bold;
}
.image-container{
  height: 75%;
}
</style>