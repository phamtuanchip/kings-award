<template>
  <q-page>
    <q-carousel
      color="white"
      arrows
      height="400px" 
      infinite      
    >
      <q-carousel-slide img-src="statics/gift/g1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">First stop</div>
          <div class="q-headline">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide img-src="statics/gift/g2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">Second stop</div>
          <div class="q-headline">Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide img-src="statics/gift/g3.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">Third stop</div>
          <div class="q-headline">Famous Bridge</div>
        </div>
      </q-carousel-slide>
       <q-carousel-slide img-src="statics/gift/g4.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">Third stop</div>
          <div class="q-headline">Famous Bridge</div>
        </div>
      </q-carousel-slide>
       <q-carousel-slide img-src="statics/gift/g5.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">Third stop</div>
          <div class="q-headline">Famous Bridge</div>
        </div>
      </q-carousel-slide>
       <q-carousel-slide img-src="statics/gift/g6.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="q-display-1">Third stop</div>
          <div class="q-headline">Famous Bridge</div>
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
          :icon="carousel.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
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
      this.$router.push('/play/1')
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
    }
  }
 }
 </script>
 