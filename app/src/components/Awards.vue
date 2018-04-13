<template>
<f7-page>   

    <div class="block">
  
  <div   v-for="item in items" :key="item.Id">
     <Award :award="item" />
    
  </div>
   
     
</div>
</f7-page>
</template>
<script>
import Award from '@/components/Award'
export default {
  components: {Award},
  data(){
    return {
      items: []
    }
  },
  methods: {
    getAwards(){
      this.api.getData('awards').then((res) => {
        this.items = res.data
        console.log(this.children) 
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted(){
    this.getAwards()
  }
}
</script>
