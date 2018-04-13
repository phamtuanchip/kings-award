<template>
  <div>
  <b-card title="Card Title"
          img-src="https://lorempixel.com/600/300/food/5/"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <b-button href="#" variant="primary">Chỉnh sửa</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      rightDrawer: false,
      right: true,
      search: '',
      errText: '',
      pagination: {},
      snackbar: false,
      headers: [
        {
          text: 'First Name',
          left: true,
          sortable: false,
          value: 'firstName'
        },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Age', value: 'age' },
        { text: 'Order Record', value: 'orderRecord' },
        { text: 'Active', value: 'isActive' },
        { text: '', value: '' }
      ],
      items: [],
      searchVm: {
        contains: {
          firstName: '',
          lastName: ''
        },
        between: {
          age: {former: 0, latter: 0}
        }
      }
    }
  },
  methods: {
    print () {
      window.print()
    },
    edit (item) {
      this.$router.push({name: 'Customer', params: { id: item.id }})
    },
    add () {
      this.$router.push('NewCustomer')
    },
    remove (item) {

      this.$parent.openDialog('Do you want to delete this item?', '', () => {
        this.api.deleteData('customers/' + item.id.toString()).then((res) => {
          this.getCustomers()
        }, (err) => {
          console.log(err)
          this.snackbar = true
          this.errText = 'Status has not be deleted successfully. Please try again.'
        })
      })
    },
    changeStatus (item) {
      item.isActive = !item.isActive
      this.api.putData('customers/' + item.id.toString(), item).then((res) => {
        // this.$router.push('Customers')
      }, (err) => {
        console.log(err)
        this.snackbar = true
        this.errText = 'Status has not be updated successfully. Please try again.'
        item.isActive = !item.isActive
      })
    },
    searchCustomers () {
      this.rightDrawer = !this.rightDrawer
      this.appUtil.buildSearchFilters(this.searchVm)
      let query = this.appUtil.buildJsonServerQuery(this.searchVm)

      this.api.getData('customers?' + query).then((res) => {

        this.items = res.data
        this.items.forEach((item) => {
          if (item.orders && item.orders.length) {
            item.orderRecord = item.orders.length
          } else {
            item.orderRecord = 0
          }
        })
      }, (err) => {
        console.log(err)
      })
    },
    clearSearchFilters () {

      this.rightDrawer = !this.rightDrawer
      this.appUtil.clearSearchFilters(this.searchVm)

      this.api.getData('customers').then((res) => {
        this.items = res.data
        this.items.forEach((item) => {
          if (item.orders && item.orders.length) {
            item.orderRecord = item.orders.length
          } else {
            item.orderRecord = 0
          }
        })
        console.log(this.items)
      }, (err) => {
        console.log(err)
      })
    },
    getCustomers () {
      this.api.getData('customers?_embed=orders').then((res) => {
        this.items = res.data
        this.items.forEach((item) => {
          // item.avatar = '/assets/' + item.avatar
          if (item.orders && item.orders.length) {
            item.orderRecord = item.orders.length
          } else {
            item.orderRecord = 0
          }
        })
      }, (err) => {
        console.log(err)
      })
    }
  },
  computed: {
  },
  mounted: function () {
    this.getCustomers()
  }
}
</script>
