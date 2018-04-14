<template>
   <div class="row no-gap"> 
    <div class="col"><img :src="item.Gift" width="44"/></div>
    <div class="col">{{item.Title}}</div>
     <div class="col">{{item.SubTitle}}</div>
     <div class="col">{{item.From}}</div>
    <div class="col">{{item.To}}</div>
    <div class="col">{{item.TargetPoint}}</div>
     <div class="col">
       <f7-list-item :link="'/play/'+item.id" title="Play" link-view="#main-view" link-close-panel></f7-list-item>
     </div>    
    </div>    
</template>
<script>
export default {
  props: ["award"],
  data() {
    return {
      item: {}
    };
  },
  mounted() {
    this.item = this.award;
  },
  methods: {
    play(){
      
    }
  }
};
</script>
