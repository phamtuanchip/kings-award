<template>
  <q-page padding style="max-width: 800px">
    <q-timeline color="secondary" style="padding: 0 24px;">
      <q-timeline-entry heading>{{today}}</q-timeline-entry> 
      <q-timeline-entry  v-for="(child,index) in children" :key="child.id"
        :title="child.Title"
        :subtitle="child.DateTime"
        :side="index % 2 == 1? 'left' : 'right'"
        icon="pets"
      >
        <div>
          {{child.SubTitle}}
          {{child.ItemText}}
          {{child.ItemInerText}} 
          <div>
          {{ago(child.DateTime)}}    
            
          </div>
        </div>
      </q-timeline-entry>

       
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
           today: Vue.moment().format('MMMM DD, YYYY')
       }
   },
   mounted(){
     this.getChildren()
   },

   methods : {
       refresher (done) {
          this.api.getData('activities?_sort=DateTime&_order=desc').then((res) => {
         this.children = res.data
         done()
         this.$q.notify('Item #' + this.children.length + ' is new.')
      }, (err) => {
        console.log(err)
      }) 
       
    },
     getChildren () {
      console.log(this.api) 
      this.api.getData('activities?_sort=DateTime&_order=desc').then((res) => {
        this.children = res.data
        console.log(this.children) 
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

