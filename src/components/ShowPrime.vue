<script setup>
defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <pre class="jumbotron text-left" id="curl"> {{ content }} </pre>
</template>
