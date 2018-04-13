<template>
 <f7-page> 
 <children />
 </f7-page>
</template>
<script>
import Children from '@/components/Children'
export default {
  components: {Children}
}
</script>

 
<style scoped>
              input.hidden {
    position: absolute;
    left: -9999px;
}

#profile-image1 {
    cursor: pointer;
  
     width: 100px;
    height: 100px;
	border:2px solid #03b1ce ;}
	.tital{ font-size:16px; font-weight:500;}
	 .bot-border{ border-bottom:1px #f8f8f8 solid;  margin:5px 0  5px 0}	
</style>


