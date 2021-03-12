<template>
  <div>
    <a-input v-model="searchedValue" placeholder="Search item" style="width: 200px;"/>
  </div>
</template>

<script>

  export default {
    name: 'SearchInput',
    props: ['furnitures'],
    data() {
      return {
        searchedValue: '',
      }
    },
    watch: {
      searchedValue: {
        handler: function (val) {
          const filteredItem = this.furnitures.filter(el => el.name.indexOf(val) > -1)
          this.$store.dispatch('furniture/filteredItem', filteredItem)
        },
        immediate: true
      },
    }
  }
</script>

<style scoped>

</style>