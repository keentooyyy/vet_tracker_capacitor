<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');
:root {
  --main-color: #03426B;
  --secondary-color: #02A0C7;
}
*, *::before, *::after{
  box-sizing: border-box;
}

*{
  font-family: 'Instrument Sans', sans-serif;
  margin: 0;
  padding: 0;
}

ul[role='list'], ol[role='list']{
  list-style: none;
}

html:focus-within{
  scroll-behavior: smooth;
}

a:not([class]){
  text-decoration-skip-ink: auto;
}

img, picture, svg, video, canvas{
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  font-style: italic;
  background-repeat: no-repeat;
  background-size: cover;
}

input, button, textarea, select{
  font: inherit;
}

@media (prefers-reduced-motion: reduce){
  html:focus-within {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transition: none;
  }
}

body, html{
  height: 100%;
  scroll-behavior: smooth;
}
body {
  background-color: lightgray;
}
</style>
