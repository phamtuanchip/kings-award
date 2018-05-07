<template>
  <q-page padding style="max-width: 800px">
    <q-timeline color="secondary" style="padding: 0 24px;">
      <q-timeline-entry heading>{{today}}</q-timeline-entry>
       <q-infinite-scroll :handler="refresher"> 
      <q-timeline-entry  v-for="(child,index) in children" :key="child.id"
        :title="child.Title"
        :subtitle="child.DateTime"
        :side="index % 2 == 1? 'left' : 'right'"
        icon="pets"
      >
        <div>
          {{child.SubTitle}}
          <div>
          {{child.ItemText}}
          </div>
          <div>
          {{child.ItemInerText}} 
          </div>
          <div>
          {{ago(child.DateTime)}}    
            
          </div>
        </div>
      </q-timeline-entry>
      <div class="row justify-center" style="margin-bottom: 50px;">
          <q-spinner-dots slot="message" :size="40" />
        </div>
       </q-infinite-scroll>
       
    </q-timeline>
  </q-page>
</template>
<script>
import Vue from 'vue'
import TimeLineItem from 'components/TimeLineItem'
export default {
    components: {TimeLineItem},
   data() {
       return {
           children: [],
           today: Vue.moment().format('MMMM DD, YYYY'),
           limit: 4
       }
   },
   mounted(){
     this.getChildren(0)
   },

   methods : {

     refresher (index, done) {
       console.log(index, done)
      
      setTimeout(() => {
        let children = []
         this.getChildren (index)
//this.children = this.children.concat(children)
        done()
      }, 2500)
    },
     getChildren () {
      
      this.api.getData('activities?_sort=DateTime&_order=desc').then((res) => {
        this.children = res.data
         
      }, (err) => {
        console.log(err)
      })
    },
    getChildren (index) {
      
      this.api.getData('activities?_sort=DateTime&_order=desc&_start='+index+'&_limit='+this.limit).then((res) => {
        this.children = this.children.concat(res.data);
        
      }, (err) => {
        console.log(err)
      })
    },
    ago: function(date) {
          return Vue.moment(date).startOf('hour').fromNow()
      }
   }
}
</script>

