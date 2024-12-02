<script>
export default {
  name: "Log-in",
}
</script>

<template>
  <main>


    <div>
      <img alt="Vet Logo" class="img-fluid" src="/images/Logo.png">
    </div>


    <h1 class="title">Welcome to Vet Tracker</h1>




    <div class="forms">
      <input id="email" name="email" placeholder="Email" type="email"/>
      <input id="password" name="email" placeholder="Password" type="password"/>
      <button class="button">Login</button>
      <router-link to="/register">Create Account</router-link>
    </div>





  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  text-align: center;
}

.img-fluid {
  height: 15rem;
}

.title {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
}

.forms {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 1rem;
}
.forms input {
  padding: .75rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  outline: 2px solid var(--secondary-color);
}
.forms .button {
  border: none;
  background-color: var(--main-color);
  color: white;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
}

a {
  text-align: center;
  font-size: 1.2rem;
  color: var(--main-color);
}








.forms input:focus {
  outline-color: var(--main-color);
}
.forms input::placeholder {
  color: var(--main-color);
}


a:visited {
  color: var(--main-color);
}
</style>