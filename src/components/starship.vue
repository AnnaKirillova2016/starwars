<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container scrollbar">

        <div class="modal-body">
          <div style="width: 100%;text-align: end">
            <font-awesome-icon icon="times-circle" v-on:click="closeW" class="close-btn">
            </font-awesome-icon>
          </div>
          <slot name="body">

            <div class="modal-header mh-mod">
              <slot name="header">
                <h1 style="height: 47px"> {{item.name}}</h1>
                <h1 style="height: 75px; font-size: 24px"> {{item.release_date}}</h1>
              </slot>
            </div><br/>

            <!--            Director: {{item.director}}-->
            <div style="width: 100%; text-align: end">
              Producer: {{item.producer}}
            </div>
            <div style="width: 100%; text-align: end">
              Director: {{item.director}}
            </div><br/><br/>

            <div style="width: 100%; text-align: center">
              <span v-html="crawl"/>
            </div>

            <br/>


          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "starship",
  props:[
    'showItem',
    'item'
  ],
  data(){
    return{
      openTab: '',
      planetList: [],
      peopleList: [],
      filmsList: [],
      speciesList: [],
      starshipsList: [],
      vehiclesList: [],
    }
  },
  methods:{
    ...mapActions(['getFromApi']),
    closeW(){
      this.$emit('closeW',false)
    },
    async fillItemArrays(tab) {
      this.openTab = tab
      if (this.openTab == 'planets' && this.item['planets']) {
        this.planetList = await this.getNames(this.item.planets)
      }
      if (this.openTab == 'characters' && this.item['characters']) {
        this.peopleList = await this.getNames(this.item.characters)
        console.log(this.peopleList)
      }
      if (this.openTab == 'films' && this.item['films']) {
        this.filmsList = await this.getNames(this.item.films)
        console.log(this.filmsList)
      }
      if (this.openTab == 'species' && this.item['species']) {
        this.speciesList = await this.getNames(this.item.species)
        console.log(this.speciesList)
      }
      if (this.openTab == 'starships' && this.item['starships']) {
        this.starshipsList = await this.getNames(this.item.starships)
        console.log(this.starshipsList)
      }
      if (this.openTab == 'vehicles' && this.item['vehicles']) {
        this.vehiclesList = await this.getNames(this.item.vehicles)
        console.log(this.vehiclesList)
      }
    },
    async getNames(arr){
      let res = []
      let link = ''
      let tmp = ''
      let req = {"url":link,"single":true}
      for(let i = 0; i <arr.length; i++){
        req.url = arr[i].replace('https://swapi.dev/api/','')
        tmp = await this.getFromApi(req)
        res.push(tmp)
      }
      return res

    }
  }
}
</script>

<style scoped>

</style>