<template>
   <q-page>
        <div class="col" v-for="child in children" :key="child.Id"><Child :child="child" /></div>
         <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" @click="add" icon="person add" />
  </q-page-sticky>                
   </q-page>
 

</template>
 <script>
 import Child from 'components/Child'
  
 export default {
   data(){
     return {
       children: []
     }
   },
   components: {Child},
   mounted(){
     this.getChildren()
   },

   methods : {
     add(){},
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
 

