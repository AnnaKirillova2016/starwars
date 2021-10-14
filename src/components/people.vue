<template>

</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "people",
  props:[
      'link'
  ],
  data(){
    return{
      people: ''
    }
  },
  methods:{
    ...mapActions(['getFromApi']),
    getPeople(){
      this.people = this.getFromApi(this.link)
      console.log(this.people)
    }
  },
  mounted() {
    this.getPeople()
  }

}
</script>

<style scoped>

</style>