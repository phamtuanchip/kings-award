<template>
   
    
     <q-card inline class="q-ma-sm">
      <q-item>
        <q-item-side :avatar="child.Avatar" />
        <q-item-main>
          <q-item-tile label>{{child.Name}}</q-item-tile>
          <q-item-tile sublabel>{{child.DOB}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-card-media>
       
      </q-card-media>
      <q-card-title>
        {{child.Nick}}
        <span slot="subtitle">{{child.Description}}</span>
      </q-card-title>
      <q-card-actions>
        <q-btn flat>Sửa</q-btn>
        <q-btn flat>Xem</q-btn>
      </q-card-actions>
    </q-card>           
 
 
</template>

<script>
export default {
   props: ["child"],
  data () {
    return {
      isEdit: false,
      item: this.child,
      stars: 3,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
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

