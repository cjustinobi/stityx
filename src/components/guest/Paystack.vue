<template>
  <paystack
      :amount="amount+'00'"
      :email="email"
      :paystackkey="paystackkey"
      :reference="reference"
      :callback="callback"
      :close="close"
      :embed="false"
  >
    <i class="fas fa-money-bill-alt"></i>
    Make Payment
  </paystack>
</template>

<script type="text/javascript">
  import paystack from 'vue-paystack';
  export default {
    props: ['email', 'amount'],
    components: {
      paystack
    },
    data(){
      return{
        paystackkey: process.env.VUE_APP_PAYSTACK_KEY
      }
    },
    computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    },
    methods: {
      callback(res) {
        if (res.status == 'success') {
          localStorage.clear()
          this.$store.commit('cart/EMPTY_CART')
          this.$message.success('Payment is successful!')
          this.$router.push('/')
        }
      },
      close() {
        console.log("Payment closed")
      }
    }
  }
</script>