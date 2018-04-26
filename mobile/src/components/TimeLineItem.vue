<template>
  <q-timeline-entry
        :title="title"
        :subtitle="full"
        :side="side"
       
         
      >
       
        <div>          
          {{item.SubTitle}}
          {{item.ItemText}}
          {{item.ItemInerText}}          
        </div>
      </q-timeline-entry>
   
</template>
<script>
import Vue from 'vue'
export default {
  props: ["item", "idx"],  
  computed: {
      side:  function()
      {
           
          return (parseInt(this.idx) % 2) == 1 ? "left" : "right"
      },
       title:  function()
      {
          return this.item.Title
      },
      full: function()
      {
          return  Vue.moment(this.item.DateTime).format('MMMM DD, YYYY')
      },
      day: function(){
          return  Vue.moment(this.item.DateTime).format('DD')
      },
      month: function(){
          return Vue.moment(this.item.DateTime).format('MMM')
      },
      time: function() {
          return Vue.moment(this.item.DateTime).format('LT')
      },
      ago: function() {
          return Vue.moment(this.item.DateTime).startOf('hour').fromNow()
      }
  }
}
</script>
