<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-body">
          <slot name="body">

            <div class="modal-header">
              <slot name="header">
                <h1>Star Wars episode: {{item.episode_id}}. {{item.title}}</h1>
              </slot>
            </div><br/>

            Director: {{item.director}}<br/>


            {{ item.opening_crawl }}

             <br/>

            <a-accordion @click="fillItemArrays('planets')">
              Planets
            </a-accordion>
            <a-accordion-text v-if="openTab=='planets'">
              Список планет
              <ul>
                <li v-for="str in this.planetList"
                    v-bind:key="str">
                  {{str.name}}
                </li>
              </ul>
            </a-accordion-text>
            <a-accordion @click="fillItemArrays('characters')">
              Characters
            </a-accordion>
            <a-accordion-text v-if="openTab=='characters'">
              Персонажи
              <ul>
                <li v-for="str in peopleList"
                    v-bind:key="str">
                  {{str}}
                </li>
              </ul>
            </a-accordion-text>
            <a-accordion @click="fillItemArrays('species')">
              Species
            </a-accordion>
            <a-accordion-text v-if="openTab=='species'">
              Расы
              <ul>
                <li v-for="str in speciesList"
                    v-bind:key="str">
                  {{str}}
                </li>
              </ul>
            </a-accordion-text>
            <a-accordion @click="fillItemArrays('vehicles')">
              Vehicles
            </a-accordion>
            <a-accordion-text v-if="openTab=='vehicles'">
              Техника
              <ul>
                <li v-for="str in vehiclesList"
                    v-bind:key="str">
                  {{str}}
                </li>
              </ul>
            </a-accordion-text>

<!--            <form>
              <div class="accordion">
                <input type="radio" name="planet" id="planet" checked />
                <label for="planet"><span>Planets</span></label>
                <div class="info">
                  <ul>
                    <li>0: "https://swapi.dev/api/planets/4/"</li>

                    <li>1: "https://swapi.dev/api/planets/5/"</li>

                    <li>2: "https://swapi.dev/api/planets/6/"</li>

                    <li>3: "https://swapi.dev/api/planets/27/"</li>
                  </ul>
                </div>
              </div>
              <div class="accordion">
              <input type="radio" name="species" id="species"  />
              <label for="species"><span>species</span></label>
              <div class="info">
                <p>
                  0: "https://swapi.dev/api/species/1/"

                  1: "https://swapi.dev/api/species/2/"

                  2: "https://swapi.dev/api/species/3/"

                  3: "https://swapi.dev/api/species/6/"

                  4: "https://swapi.dev/api/species/7/"
                </p>
              </div>
            </div>
            </form>-->
            <button v-on:click="view">Console</button>
            <button v-on:click="closeW">Close</button>
          </slot>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "film",
  props:[
    'showItem',
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
      item: {}
    }
  },
  computed:{
    ...mapState(['currItem'])
  },
  methods:{
    ...mapActions(['getFromApi']),
    closeW(){
      this.$emit('closeW',false)
    },
    view(){
      console.log(this.item)
    },
    async fillItemArrays(tab) {
      this.openTab = tab
      if (this.openTab == 'planets') {
        this.planetList = await this.getNames(this.item.planets)
      }
      if (this.openTab == 'characters') {
        this.peopleList = this.getNames(this.item.characters)
        console.log(this.peopleList)
      }
      if (this.openTab == 'films') {
        this.filmsList = this.getNames(this.item.films)
        console.log(this.filmsList)
      }
      if (this.openTab == 'species') {
        this.speciesList = this.getNames(this.item.species)
        console.log(this.speciesList)
      }
      if (this.openTab == 'starships') {
        this.starshipsList = this.getNames(this.item.starships)
        console.log(this.starshipsList)
      }
      if (this.openTab == 'vehicles') {
        this.vehiclesList = this.getNames(this.item.vehicles)
        console.log(this.vehiclesList)
      }
    },
      async getNames(arr){
        let link = ''
        let tmp = ''
        let req = {"url":link,"single":true}
        for(let i = 0; i <arr.length; i++){
          req.url = arr[i].replace('https://swapi.dev/api/','')
          tmp = await this.getFromApi(req)
          this.planetList.push(tmp)
        }

      }
  },
  beforeMount() {
    if(this.item['planets']) {
      this.planetList = this.getNames(this.item.planets)
    }
  }

}
</script>

<style scoped>

</style>