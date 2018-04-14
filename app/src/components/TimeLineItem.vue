<template>
  <div class="timeline-item">
    <div class="timeline-item-date">{{day}}<small>{{month}}</small></div>
    <div class="timeline-item-divider"></div>
    <div class="timeline-item-content">       
    <div class="timeline-item-time">{{time}}</div>
      <div class="timeline-item-title">   {{item.Title}}</div>
      <div class="timeline-item-subtitle"> {{item.SubTitle}}</div>
      <div class="timeline-item-text"> {{item.ItemText}}</div>
     <div class="timeline-item-inner">{{item.ItemInerText}}</div>
     <div class="timeline-item-time">{{ago}}</div>    
   </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ["item"],  
  computed: {
      day: function(){
          return  Vue.moment(this.item.DateTime).format('DD');;
      },
      month: function(){
          return Vue.moment(this.item.DateTime).format('MMM');;
      },
      time: function() {
          return Vue.moment(this.item.DateTime).format('LT');
      },
      ago: function() {
          return Vue.moment(this.item.DateTime).startOf('hour').fromNow(); 
      }
  }
}
</script>
