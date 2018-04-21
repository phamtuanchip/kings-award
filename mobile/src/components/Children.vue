<template>
  <div class="relative-position" v-ripple>
    <div class="row">
        <div v-for="child in children" :key="child.Id"><Child :child="child" /></div>                
    </div>
    <q-page-sticky position="top-right" :offset="[18, 18]">
    <q-btn round color="primary" @click="alert" icon="alarm" />
  </q-page-sticky>
</div>

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
 

