<template>

        <div class="modal-body mView" >
    <div style="width: 100%;text-align: end">
      <font-awesome-icon icon="times-circle" v-on:click="closeW" class="close-btn">
      </font-awesome-icon>
    </div>
    <slot name="body">

      <div class="modal-header mh-mod">
        <slot name="header">
          <h1 class=".h1-mod" style="height: 47px">Star Wars</h1>
          <h1 class=".h1-mod" style="height: 47px">episode: {{item.episode_id}}.</h1>
          <h1 class=".h1-mod" style="height: 47px; "> {{item.title}}</h1>
          <h1 class=".h1-mod" style="height: 55px; font-size: 24px"> {{item.release_date}}</h1>
        </slot>
      </div>


      <div style="width: 97%; text-align: end">
        Producer: {{item.producer}}
      </div>
      <div style="width: 97%; text-align: end">
        Director: {{item.director}}
      </div><br/><br/>

      <div style="width: 100%; text-align: center">
        <span v-html="crawl"/>
      </div>

      <br/>

      <a-accordion class="a-accordion-m" @click="fillItemArrays('planets')">
        Planets
      </a-accordion>
      <a-accordion-text v-if="openTab=='planets'">
        <img style="width: 100%" v-if="planetList.length == 0" src="../assets/gifs/loaderline.gif"/>
        <ul style="text-align: center">
          <li v-for="str in this.planetList"
              v-bind:key="str">
            {{str.name}}
          </li>
        </ul>
      </a-accordion-text>
      <a-accordion class="a-accordion-m" @click="fillItemArrays('characters')">
        Characters
      </a-accordion>
      <a-accordion-text v-if="openTab=='characters'" >
        <img style="width: 100%" v-if="peopleList.length == 0" src="../assets/gifs/loaderline.gif"/>
        <ul style="text-align: center">
          <li v-for="str in peopleList"
              v-bind:key="str">
            {{str.name}}
          </li>
        </ul>
      </a-accordion-text>
      <a-accordion class="a-accordion-m" @click="fillItemArrays('species')">
        Species
      </a-accordion>
      <a-accordion-text v-if="openTab=='species'" >
        <img style="width: 100%" v-if="speciesList.length == 0" src="../assets/gifs/loaderline.gif"/>
        <ul style="text-align: center">
          <li v-for="str in speciesList"
              v-bind:key="str">
            {{str.name}}
          </li>
        </ul>
      </a-accordion-text>
      <a-accordion class="a-accordion-m" @click="fillItemArrays('vehicles')">
        Vehicles
      </a-accordion>
      <a-accordion-text v-if="openTab=='vehicles'">
        <img style="width: 100%" v-if="vehiclesList.length == 0" src="../assets/gifs/loaderline.gif"/>
        <ul style="text-align: center">
          <li v-for="str in vehiclesList"
              v-bind:key="str">
            {{str.name}}
          </li>
        </ul>
      </a-accordion-text>

    </slot>
  </div>

</template>

<script>
import {mapActions} from "vuex"
import nl2br from "../plugins/nl2br"

export default {
  name: "mFilm",
  props:[
    'showItem',
    'item'
  ],
  data() {
    return {
      openTab: '',
      planetList: [],
      peopleList: [],
      filmsList: [],
      speciesList: [],
      starshipsList: [],
      vehiclesList: [],
      crawl: ''
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
  },
  beforeUpdate() {
    this.crawl = nl2br(this.item.opening_crawl)
  }
}
</script>

<style scoped>

</style>