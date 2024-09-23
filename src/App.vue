<script setup>
import {ref} from 'vue'
import PaymentGroup from "./components/PaymentGroup.vue";
import ShowPrime from "./components/ShowPrime.vue";
const primeCommandContent = ref('')

const clickBomb = ()=>{
  faro.api.pushError(new Error('I am supposed to fail'), {
    type: 'network',
  });
  throw new Error('bomb')
}
</script>

<template>
  <div>
    <button @click="clickBomb">Bomb</button>
    <PaymentGroup v-model="primeCommandContent" />
    <ShowPrime class="mt-[12rem]" :content="primeCommandContent" />
  </div>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.html {
  font-size: 16px
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

.c-button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem !important;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
.c-button:hover {
  border-color: #646cff !important;
}
.c-button:focus,
.c-button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

</style>
