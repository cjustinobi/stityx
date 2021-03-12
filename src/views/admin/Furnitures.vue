<template>
  <div>
    <FurnitureForm />
    <a-button v-if="selectedRows.length" type="primary" @click="multipleEnableDisable">Disable/Enable Furniture</a-button>
    <br><br>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="furnitures" :rowKey="record => record.id">
      <a-dropdown slot="action" slot-scope="rec" href="javascript:;">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-popconfirm
                :title="`Sure you want to ${rec.enabled ? 'disable' : 'enable'} this item?`"
                ok-text="Yes"
                cancel-text="No"
                @confirm="disableEnableFurniture(rec)"
                @cancel="visible = false"
            >
              <a href="#">{{ rec.enabled ? 'Disable' : 'Enable' }}</a>
            </a-popconfirm>
          </a-menu-item>
          <a-menu-item key="2">
            <a @click="itemToEdit(rec)" href="#">Edit</a>
          </a-menu-item>
          <a-menu-item key="3">
            <a-popconfirm
                title="Sure you want to delete this item?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteFurniture(rec.id)"
                @cancel="visible = false"
            >
              <a href="#">Delete</a>
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
        <a-button> Actions <a-icon type="down" /> </a-button>
      </a-dropdown>
      <span slot="file" slot-scope="rec">
        <img width="100" :src="rec" alt="">
      </span>
      <span slot="name" slot-scope="text, rec">
        <span>{{ text }}</span><br>
        <a-tag :color="rec.enabled ? 'green' : 'volcano'">{{ rec.enabled ? 'Enabled' : 'Disabled' }}</a-tag>
      </span>
      <span slot="price" slot-scope="text">{{ text | currency }}</span>
    </a-table>
  </div>
</template>
<script>
  const columns = [
    {
      title: 'Image',
      dataIndex: 'file',
      scopedSlots: { customRender: 'file' },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      scopedSlots: { customRender: 'price' },
    },
    {
      title: 'Action',
      scopedSlots: { customRender: 'action' },
    },
  ];

  import FurnitureForm from '@/components/dashboard/FurnitureForm'

  export default {
    components: {
      FurnitureForm
    },
    data() {
      return {
        columns,
        selectedRows: [],
        selectedRowKeys: [],
      };
    },
    methods: {
      disableEnableFurniture(furniture) {
        this.$store.dispatch('furniture/disableEnableFurniture', furniture)
      },
      deleteFurniture(furnitureId) {
        this.$store.dispatch('furniture/deleteFurniture', furnitureId)
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        console.log('selectedRowKeys changed: ', selectedRowKeys, 'selectedRow: ', selectedRows);
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      },
      multipleEnableDisable() {
        this.$store.dispatch('furniture/multipleEnableDisable', this.selectedRows)
      },
      itemToEdit(item) {
        this.$store.dispatch('furniture/itemToEdit', item)
      }
    },
    computed: {
      furnitures() {
        return this.$store.getters['furniture/furnitures']
      },
      rowSelection() {
        const { selectedRowKeys } = this;
        return {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          selections: [
            {
              key: 'all-data',
              text: 'Select All Data',
              onSelect: () => {
                this.selectedRowKeys = [...Array(46).keys()]; // 0...45
              },
            },
            {
              key: 'odd',
              text: 'Select Odd Row',
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return false;
                  }
                  return true;
                });
                this.selectedRowKeys = newSelectedRowKeys;
              },
            },
            {
              key: 'even',
              text: 'Select Even Row',
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return true;
                  }
                  return false;
                });
                this.selectedRowKeys = newSelectedRowKeys;
              },
            },
          ],
          onSelection: this.onSelection,
        };
      },
    },
    mounted() {
      this.$store.dispatch('furniture/getFurnitures')
    }
  }
</script>