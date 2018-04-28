<template>
  <q-field
        icon="account_circle"
        helper="We need your name so we can send you to the movies."
        label="Your name"
        :label-width="3"
      >
        <q-input v-model="name" />
      </q-field>
</template>

<script>
export default {
  props: ["custom"],
  data () {
    return {
      // model for Dialog example
      customDialogModel: this.custom,

      name: ''
    }
  },
  mounted(){
     /*
     this.$nextTick(()=>{
      this.customDialogModel=this.custom
    })
    */
  },
  methods: {
    // when props.ok() gets called
    onOk (data) { },

    // when props.cancel() gets called
    onCancel () { },

    // when we show it to the user
    onShow () { },

    // when it gets hidden
    onHide () { },

    // custom handler
    async choose (okFn, hero) {
      if (this.name.length === 0) {
        this.$q.dialog({
          title: 'Please specify your name!',
          message: `Can't buy tickets without knowing your name.`
        })
      }
      else {
        await okFn()
        this.$q.notify(`Ok ${this.name}, going with ${hero}`)
      }
    }
  }
}
</script>