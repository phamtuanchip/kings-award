<template>
   <q-page>
        <div class="col" v-for="child in children" :key="child.Id"><Child :child="child" /></div>
         <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" @click="add" icon="person add" />
  </q-page-sticky>   

  <q-dialog
    v-model="customDialogModel"
    stack-buttons
    prevent-close
    @ok="onOk"
    @cancel="onCancel"
    @show="onShow"
    @hide="onHide"
  >
    <!-- This or use "title" prop on <q-dialog> -->
    <span slot="title">Thông tin</span>

    <!-- This or use "message" prop on <q-dialog> -->
    <span slot="message">Nhập liệu</span>

    <div slot="body">
      <Child :child="childModel" :isEdit="false" />
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn color="primary" label="Lưu" @click="choose(props.ok, childModel)" />
       
      <q-btn flat label="Bỏ qua" @click="props.cancel" />
    </template>
  </q-dialog>                
   </q-page>
 

</template>
 <script>
 import Child from 'components/Child'
  
 export default {
   data(){
     return {
       children: [],
       childModel:{
         id: '',
         Name:'',
         DOB:'',
         Nick:'',
         Avatar:'',
         Year:'',
         Description:'',
         Gender:''
       },
       customDialogModel : false,
     }
   },
   components: {Child},
   mounted(){
     this.getChildren()
   },

   methods : {
      onOk (data) { },

    // when props.cancel() gets called
    onCancel () { },

    // when we show it to the user
    onShow () { },

    // when it gets hidden
    onHide () { },

    // custom handler
    async choose (okFn, hero) {
      if (this.name.length === 0) {
        this.$q.dialog({
          title: 'Please specify your name!',
          message: `Can't buy tickets without knowing your name.`
        })
      }
      else {
        await okFn()
        this.$q.notify(`Ok ${this.name}, going with ${hero}`)
      }
    },
     add(){
        this.customDialogModel = true
     },
     getChildren () {
      this.api.getData('children').then((res) => {
        this.children = res.data
        console.log(this.children) 
      }, (err) => {
        console.log(err)
      })
    }
   }
 }
 </script>
 

