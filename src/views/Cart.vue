<template>
  <div class="about">
    <a-page-header sub-title="My Shopping Cart" />

    <a-row>
      <a-col :lg="{ span: 8, offset: 8 }">
        <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="items">

          <a-list-item slot="renderItem" slot-scope="item, index">
            <PlusMinusItem slot="actions" :furniture="item" />
            <a-list-item-meta description="">
              <span slot="title">
                {{ item.name }} <br>
                <b>{{ item.price | currency }}</b>
              </span>
              <a-avatar
                  slot="avatar"
                  :src="item.file"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <a-row v-if="items.length" type="flex" justify="space-between" style="margin-top: 30px">
          <a-col>
            <a-statistic title="Total" :value="(totalPrice) | currency" />
          </a-col>
          <a-col>
            <Paystack :amount="totalPrice" :email="email" />
          </a-col>
        </a-row>

      </a-col>
    </a-row>
  </div>
</template>

<script>
  import Paystack from '@/components/guest/Paystack'
  import PlusMinusItem from '@/components/guest/PlusMinusItem'

  export default {
    components: {
      PlusMinusItem,
      Paystack
    },
    data() {
      return {
        email: 'john@example.com'
      }
    },
    methods: {

    },
    computed: {
      items() {
        return this.$store.getters['cart/items']
      },
      totalQty() {
        return this.$store.getters['cart/totalQty']
      },
      totalPrice() {
        return this.$store.getters['cart/totalPrice']
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
