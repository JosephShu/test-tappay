<script setup>
const emits = defineEmits(['update-prime-by-line-pay'])

const payByLine = () => {

  TPDirect.linePay.getPrime(function(result){

    if (result.status !== 0) {
      alert('get prime error ' + result.msg)
      return
    }

    alert(`get prime success, ${result.prime}` )
    const command = `
                Use following command to send to server \n\n
                curl -X POST https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime \\
                -H 'content-type: application/json' \\
                -H 'x-api-key: partner_1NTnD5SZK2SU0lGs6f9tWpIPzMIUbDvCDUOH1xNJQTg3OeFqsOdWmU0s' \\
                -d '{
                    "partner_key": "partner_1NTnD5SZK2SU0lGs6f9tWpIPzMIUbDvCDUOH1xNJQTg3OeFqsOdWmU0s",
                    "prime": "${result.prime}",
                    "amount": "1",
                    "merchant_id": "waylonhsu06819931_LINEPAY",
                    "details": "Some item",
                    "result_url": {
                        "frontend_redirect_url": "https://asdfg.requestcatcher.com/",
                        "backend_notify_url": "https://asdfg.requestcatcher.com/3d"
                    },
                    "cardholder": {
                        "phone_number": "+886923456789",
                        "name": "Line-pay",
                        "email": "linepay@line.com",
                        "zip_code": "100",
                        "address": "測試 line pay",
                        "national_id": "line pay"
                    }
                }'`.replace(/                /g, '')

    emits('update-prime-by-line-pay', command)
  })
}
</script>

<template>
  <button @pointerdown="payByLine">LinePay</button>
</template>

<style scoped>

</style>
