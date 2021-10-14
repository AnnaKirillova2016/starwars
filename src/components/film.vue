<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-body">
          <slot name="body">
            <button v-on:click="view">Console</button>
            <button v-on:click="closeW">Close</button>
          </slot>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "film",
  props:[
    'item',
    'showItem'
  ],
  data(){
    return{

    }
  },
  methods:{
    closeW(){
      this.$emit('closeW',false)
    },
    view(){
      console.log(this.item)
    }
  }
}
</script>

<style scoped>

</style>