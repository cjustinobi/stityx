<template>
  <div class="home">
    <a-row type="flex" justify="space-around" style="margin-top: 30px">
      <a-col><SearchInput :furnitures="furnitures"/></a-col>
      <a-col><SortInput @checkList="checkList"/></a-col>
    </a-row>
    <a-row v-if="filteredItem.length">
      <a-col v-for="furniture in filteredItem" :key="furniture.id" :xs="{ span: 24 }" :sm="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }" style="margin-bottom: 60px;">
        <a-card hoverable v-if="furniture.enabled">
          <img alt="furniture" :src="furniture.file"/>
          <template slot="actions" class="ant-card-actions">
            <span>
              <span>{{ furniture.price | currency }}</span>
            </span>
            <PlusMinusItem v-if="itemInCart(furniture.id)" :furniture="furniture" />
            <span v-else @click="addToCart(furniture)">Add to Cart</span>
          </template>
          <a-card-meta :title="furniture.name" :description="furniture.description" />
        </a-card>
      </a-col>
    </a-row>
    <a-empty v-else />
  </div>
</template>

<script>

  import SortInput from '@/components/guest/SortInput'
  import SearchInput from '@/components/guest/SearchInput'
  import PlusMinusItem from '@/components/guest/PlusMinusItem'

  export default {
    name: 'Home',
    components: {
      SortInput,
      SearchInput,
      PlusMinusItem
    },
    data() {
      return {
        sortedValue: '',
        checkedList: []
      }
    },
    methods: {
      addToCart(item) {
        this.$store.dispatch('cart/addItem', item)
      },
      itemInCart(itemId) {
        return this.carts.some( item => item['id'] === itemId )
      },
      checkList(val) {
        this.checkedList = val
      }
    },
    computed: {
      furnitures() {
        return this.$store.getters['furniture/furnitures']
      },
      filteredItem() {
        const filteredItem = this.$store.getters['furniture/filteredItem']
        if (this.checkedList.length) {
          return filteredItem.filter(item => this.checkedList.includes(item.category))
        }
        return filteredItem
      },
      carts() {
        return this.$store.getters['cart/items']
      }
    },
    mounted() {
      this.$store.dispatch('furniture/getFurnitures')
    },
    watch: {
      furnitures: {
        handler: function (val) {
          this.$store.dispatch('furniture/filteredItem', val)
        }
      }
    }
  }
</script>

<style>
  img {
    width: 100%;
    height: auto;
    max-height: 100px;
  }
</style>
