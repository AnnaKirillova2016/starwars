<template>
  <indexDesktop v-if="resolution"/>
  <indexMobile v-else/>


</template>

<script>
import indexDesktop from "./indexDesktop.vue"
import indexMobile from "./indexMobile.vue"
export default {
  name: "index",
  components: {
    indexDesktop,
    indexMobile
  },
  computed:{
    resolution(){
      return window.matchMedia("(min-width: 1200px)").matches
    }
  },
}
</script>

<style scoped>

</style>