<template>
  <div>
    <a-page-header sub-title="Add Furniture">
      <template slot="extra">
        <a-button type="primary" @click="visible = true">Create</a-button>
      </template>
    </a-page-header>
    <a-modal v-model="visible" title="Create Furniture" :confirm-loading="loading" @cancel="reset" @ok="saveFurniture">
      <a-input class="mb-1" v-model="name" placeholder="Name" />
      <a-input class="mb-1" v-model="price" type="number" placeholder="Amount" />
      <a-select v-model="category" style="width: 200px">
        <a-select-option value="">Select Category</a-select-option>
        <a-select-option v-for="(category, i) in categories" :value="category" :key="i">{{ category }}</a-select-option>
      </a-select>
      <a-textarea v-model="description" placeholder="Description here ..." :auto-size="{ minRows: 3, maxRows: 5 }"/>
      <img v-if="file" class="img-thumbnail" :src="file" />
      <input class="hide-input" @change="handleFile" ref="file" type="file">
      <button type="button" class="btn btn-light" @click.prevent="$refs.file.click">Choose file</button>
    </a-modal>
  </div>
</template>

<script>

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      scopedSlots: { customRender: 'topic' },
    },
    {
      title: 'Release Time',
      dataIndex: 'created_at',
      scopedSlots: { customRender: 'created' },
    }
  ]

  import { furnitureCategories } from '@/utils/common'

  export default {
    name: 'FurnitureForm',
    data() {
      return {
        columns,
        categories: furnitureCategories,
        category: '',
        file: '',
        url: '',
        loading: false,
        visible: false,
        name: '',
        price: '',
        description: ''
      }
    },
    methods: {

      async saveFurniture() {

        if (this.isInvalidField()) return

        try {
          this.loading = true
          const res = await this.$store.dispatch(`furniture/${this.itemToEdit ? 'editFurniture' : 'saveFurniture'}`, {
            id: this.id,
            name: this.name,
            price: this.price,
            category: this.category,
            enabled: true,
            file: this.file,
            description: this.description,
          })
          if (res) {
            this.$message.success('Item saved successfully')
            this.reset()
          }
        } catch(e) {
          this.$message.error('Item not saved')
          this.loading = false
        }

      },
      handleFile() {
        const vm = this
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
          vm.file = e.target.result
        };
        reader.onerror = function(error) {
          alert(error);
        };
        reader.readAsDataURL(file);
      },

      reset() {
        this.name = ''
        this.price = ''
        this.file = ''
        this.description = ''
        this.loading = false
        this.visible = false
        this.$store.dispatch('furniture/itemToEdit', '')
      },
      isInvalidField() {
        if (
          this.price == '' &&
          this.name == '' &&
          this.description == '' &&
          this.category == '' &&
          this.file == ''
        ) {
          this.$message.error('All fields are required')
          return true
        }
      }

    },
    computed: {
      itemToEdit() {
        return this.$store.getters['furniture/itemToEdit']
      }
    },
    watch: {
      'itemToEdit': {
        handler: function (val) {
          if (val) {
            this.id = val.id
            this.name = val.name
            this.file = val.file
            this.price = val.price
            this.enabled = val.enabled
            this.category = val.category
            this.description = val.description
            this.visible = true
          }
        },
        immediate: true
      }

    }
  }
</script>

<style scoped>
  img {
    max-width: 300px;
  }
  .hide-input {
    display: none;
  }
  .btn {
    margin-top: 24px;
  }
</style>
