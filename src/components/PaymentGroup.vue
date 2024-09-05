<script setup>
import {onMounted} from 'vue'
import ApplePay from "./ApplePay.vue";
import LinePay from "./LinePay.vue";

// Check Availability
const result = defineModel()

const onPaymentCurlUpdate = (val) => {
  result.value = val
}
</script>

<template>
  <div class="flex justify-center gap-2">
    <ApplePay @update-prime-by-apple-pay="onPaymentCurlUpdate" />
    <LinePay @update-prime-by-line-pay="onPaymentCurlUpdate" />
  </div>
</template>
