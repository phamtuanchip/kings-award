<template>
  <div>
   
</div>
</template>

<script>
export default {
  props: ["child"],
  data: function () {
    return {
      isEdit: false,
      item: this.child
    }
  },
  
  computed: {
  },
  mounted: function () {
     
  },
  methods: {
    edit(){
      this.isEdit = true;
    },
    
    save: function () {
      let customer = this.item
      if (!customer.Id) {
        this.api.postData('children', customer).then((res) => {           
          this.isEdit = false;
        }, (err) => {
          console.log(err)
        })
      } else {
        this.api.putData('children/' + customer.Id.toString(), customer).then((res) => {           
           this.isEdit = false;
        }, (err) => {
          console.log(err)
        })
      }
    },
    getById: function () {
      this.api.getData('children/' + customer.Id).then((res) => {
        this.item = res.data
        // this.customer.avatar = '/assets/' + this.customer.avatar
      }, (err) => {
        console.log(err)
      })
    },
    cancel: function () {
       this.isEdit = false;
    }
  }
}
</script>
