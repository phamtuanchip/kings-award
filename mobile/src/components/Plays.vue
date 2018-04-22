<template>
  <q-page>
    <q-carousel
      color="white"
      arrows
      height="400px" 
      infinite
      v-model="slide"
    >
      <q-carousel-slide v-for="item in items" :key="item.id" :img-src="item.Gift">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">{{item.Title}}</div>
          <div class="q-headline">{{item.SubTitle}}</div>
        </div>
      </q-carousel-slide>
       
       <q-carousel-control
        slot="control-button"
        slot-scope="carousel"
        position="bottom-right"
        :offset="[18, 22]"
      >
         <q-btn
          round dense push
          color="amber" 
          icon="mode edit"
          @click="edit"
        />
        <q-btn
          round dense push
          color="amber"
          icon="play circle outline"
          @click="play"
        />
      </q-carousel-control>
    </q-carousel>
    <q-chat-message
  label='Sunday, 19th'
/>

<q-chat-message
  name="me"
  avatar="statics/boy-avatar.png"
  :text="['hunter2']"
  stamp="4 minutes ago"
  sent
/>

<q-chat-message
  name="Jane"
  avatar="statics/linux-avatar.png"
  :text="['hey, if you type in your pw', 'it will show as stars']"
  stamp="7 minutes ago"
/>
  </q-page>
 </template>   
 <script>
 export default {
   
  data() {
    return {
      items: {},
      slide: 0
    };
  },
  mounted() {
     this.getAwards()
  },
  methods: {
   
    edit() {},
    play(){
       console.log(this.slide)
      this.$router.push('/play/'+(this.slide+1))
    },
    getChildren() {
      this.api.getData("children").then(
        res => {
          this.children = res.data.map(child =>{
            return {'label': child.Name, 'value': child.id}
          })
          console.log(this.children);
          // this.customer.avatar = '/assets/' + this.customer.avatar
        },
        err => {
          console.log(err);
        }
      );
    },
    getAwards(){
      this.api.getData('awards').then((res) => {
        this.items = res.data
        console.log(this.children) 
      }, (err) => {
        console.log(err)
      })
    },
  }
 }
 </script>
 