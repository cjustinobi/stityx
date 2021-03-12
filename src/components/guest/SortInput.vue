<template>
  <div>
    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
      <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
        Check all
      </a-checkbox>
    </div>
    <br />
    <a-checkbox-group v-model="checkedList" :options="furnitureCategories" @change="onChange" />
  </div>
</template>
<script>

  import { furnitureCategories } from '@/utils/common'

  export default {
    data() {
      return {
        furnitureCategories,
        checkedList: [],
        indeterminate: true,
        checkAll: false
      };
    },
    methods: {
      onChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < furnitureCategories.length;
        this.checkAll = checkedList.length === furnitureCategories.length;
      },
      onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? furnitureCategories : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      },
    },
    computed: {
      filteredItem() {
        return this.$store.getters['furniture/filteredItem']
      }
    },
    watch: {
      checkedList: {
        handler: function (val) {
          if (val) {
            this.$emit('checkList', val)
          }
        },
        immediate: true
      },
    }
  }
</script>
