<template>
  <b-container class="bv-example-row">
    <b-row>
        <b-col><Child /></b-col>
        <b-col><Child /></b-col>        
    </b-row>
</b-container>

</template>
 <script>
 import Child from '@/components/Child'
 export default {
   components: {Child}
 }
 </script>
 

