<template>
  <b-container class="bv-example-row">
    <b-row>
        <b-col v-for="child in children" :key="child.Id"><Child :child="child" /></b-col>                
    </b-row>
</b-container>

</template>
 <script>
 import Child from '@/components/Child'
  
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
     getChildren () {
      this.api.getData('children?_embed=archives').then((res) => {
        this.children = res.data
        console.log(this.children) 
      }, (err) => {
        console.log(err)
      })
    }
   }
 }
 </script>
 

