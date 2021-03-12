<template>
  <div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="furnitures" :rowKey="record => record.id">
      <a-dropdown slot="action" slot-scope="rec" href="javascript:;">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <nuxt-link :to="{ name: 'users-id', params: { id: rec.id , user: rec }}">Edit</nuxt-link>
          </a-menu-item>
          <a-menu-item key="2">
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
    </a-table>
  </div>
</template>
<script>
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      scopedSlots: { customRender: 'action' },
    },
  ];

  export default {
    data() {
      return {
        columns,
        selectedRowKeys: [], // Check here to configure the default column
      };
    },
    methods: {
      deleteFurniture(furnitureId) {
        this.$store.dispatch('furniture/deleteFurniture', furnitureId)
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
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