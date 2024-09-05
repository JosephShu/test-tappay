<script setup>
import { ref, computed, onBeforeMount } from 'vue'
const fakeData = {
  supportedNetworks: ['MASTERCARD', 'VISA', 'AMEX'],
  supportedMethods: ['apple_pay'],
  displayItems: [{
    label: 'iPhone8',
    amount: {
      currency: 'TWD',
      value: '1.00'
    }
  }],
  total: {
    label: '付給 TapPay',
    amount: {
      currency: 'TWD',
      value: '1.00'
    }
  },
  shippingOptions: [{
    id: "standard",
    label: "🚛 Ground Shipping (2 days)",
    // apple pay only
    detail: 'Estimated delivery time: 2 days',
    amount: {
      currency: "TWD",
      value: "5.00"
    }
  },
    {
      id: "drone",
      label: "🚀 Drone Express (2 hours)",
      // apple pay only
      detail: 'Estimated delivery time: 2 hours',
      amount: {
        currency: "TWD",
        value: "25.00"
      }
    },
  ],
  // optional
  options: {
    requestPayerEmail: false,
    requestPayerName: false,
    requestPayerPhone: false,
    requestShipping: false,
  }
}

const applePayAvailability = TPDirect.paymentRequestApi.checkAvailability()
const withoutCards = ref(false)
const disabledApplePayCondition = computed(()=>{
  return !applePayAvailability || withoutCards.value
})
const applePaySupportContent = ref(null)
const emits = defineEmits(['update-prime-by-apple-pay', 'update-apple-support-content'])

const setup = () => {
  if(!applePayAvailability) {
    emits('update-apple-support-content','裝置不支援 PaymentRequest / Apple Pay')
    withoutCards.value = true
    return
  }

  TPDirect.paymentRequestApi.setupApplePay({
    merchantIdentifier: 'APMEuWZp6R6AcmMNRAR4',
    countryCode: 'TW'
  })

  TPDirect.paymentRequestApi.setupPaymentRequest(fakeData,(result)=>{
    if(result.canMakePaymentWithActiveCard) {
      emits('update-apple-support-content','裝置可以使用 PaymentRequest / Apple Pay')
    } else {
      emits('update-apple-support-content','裝置支援 PaymentRequest / Apple Pay，但是沒有可以支付的卡片')
      withoutCards.value = true
    }
  })
}


const payByApplePay = () => {
  TPDirect.paymentRequestApi.getPrime(function(result) {

    const command = `
    curl -X POST https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime \\
    -H 'content-type: application/json' \\
    -H 'x-api-key: partner_1NTnD5SZK2SU0lGs6f9tWpIPzMIUbDvCDUOH1xNJQTg3OeFqsOdWmU0s' \\
    -d '{
        "partner_key": "partner_1NTnD5SZK2SU0lGs6f9tWpIPzMIUbDvCDUOH1xNJQTg3OeFqsOdWmU0s",
        "prime": "${result.prime}",
        "amount": "${parseInt(result.total_amount)}",
        "merchant_id": "waylonhsu06819931_CTBC_Union_Pay",
        "details": "Some item",
        "cardholder": {
            "phone_number": "0987654321",
            "name": "王小明",
            "email": "test@example.com",
            "zip_code": "123",
            "address": "台北市xxx街xx號",
            "national_id": "A123456789"
        }
    }'`.replace(/                /g, '')

    emits('update-prime-by-apple-pay', command)
  })
}

onBeforeMount(()=>{
  setup()
})
</script>

<template>
  <button v-bind="{
    class:{
    'bg-[#1a1a1a]': !disabledApplePayCondition,
    'bg-gray-100': disabledApplePayCondition,
    'text-black': disabledApplePayCondition
    },
    disabled: disabledApplePayCondition,
    onClick: disabledApplePayCondition ? null : payByApplePay
  }" class="c-button"
  >ApplePay</button>
</template>

