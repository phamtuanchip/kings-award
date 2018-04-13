<template>
  <div>
  <b-card :title="child.Name"
          :img-src="child.Avatar"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <span >{{child.Year}}</span>  
    <span >{{child.DOB}}</span>     
    <p class="card-text">
      {{child.Description}}
    </p>
    <b-button href="#" variant="primary">Chỉnh sửa</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  props: ["child"],
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
  
  computed: {
  },
  mounted: function () {
     
  }
}
</script>
