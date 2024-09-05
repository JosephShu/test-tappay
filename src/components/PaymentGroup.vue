<script setup>
import {ref} from 'vue'
import ApplePay from "./ApplePay.vue";
import LinePay from "./LinePay.vue";

// Check Availability
const result = defineModel()
const appleSupportContent = ref(null)

const onPaymentCurlUpdate = (val) => {
  result.value = val
}

const onApplePaySupportContentUpdate = (val)=>{
  appleSupportContent.value = val
}
</script>

<template>
  <h2 class="mb-6 text-lg">{{ appleSupportContent }}</h2>
  <div class="flex justify-center gap-2">
    <ApplePay @update-prime-by-apple-pay="onPaymentCurlUpdate" @update-apple-support-content="onApplePaySupportContentUpdate" />
    <LinePay @update-prime-by-line-pay="onPaymentCurlUpdate" />
  </div>
</template>
