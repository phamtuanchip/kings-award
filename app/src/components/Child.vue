<template>
  <div>
  <b-card v-if="isEdit == false" :title="child.Name"
          :img-src="child.Avatar"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <span >Sinh năm:{{child.Year}}</span>  
    <span >Sinh nhật:{{child.DOB}}</span>     
    <p class="card-text">
      {{child.Description}}
    </p>
    <b-button @click="edit" variant="primary">Chỉnh sửa</b-button>
  </b-card>
  <div v-else>

    <f7-block-title>{{child.Name}}</f7-block-title>
    <f7-list form>
       <f7-list-item>
        <f7-label>Id</f7-label>
        <f7-input v-model="item.Id" type="text" placeholder="Name"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Name</f7-label>
        <f7-input v-model="item.Name" type="text" placeholder="Name"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label >Gender</f7-label>
        <f7-input v-model="item.Gender" type="select">
          <option value="0">Male</option>
          <option value="1">Female</option>
        </f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Birth date</f7-label>
        <f7-input  v-model="item.DOB" type="date" placeholder="Birth date" value="2014-04-30"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Avatar</f7-label>
        <f7-input v-model="item.Avatar" type="url" placeholder="URL"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Description</f7-label>
        <f7-input v-model="item.Description" type="textarea" placeholder="Textarea"></f7-input>
      </f7-list-item>
      <f7-col><f7-button big fill color="green" @click="save" >Save</f7-button></f7-col>
    </f7-list>
  </div>
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
       
    }
  }
}
</script>
