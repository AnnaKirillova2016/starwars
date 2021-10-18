<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container scrollbar" style="height:600px ">

        <div class="modal-body">
          <div style="width: 100%;text-align: end">
            <font-awesome-icon icon="times-circle" v-on:click="closeW" class="close-btn">
            </font-awesome-icon>
          </div>
          <slot name="body">

            <div class="modal-header mh-mod">
              <slot name="header">
                <h1>{{item.name}}</h1>
<!--                <button @click="terminal">console</button>-->
              </slot>
            </div><br/>

            <table class="paleBlueRows">
              <tbody>
              <tr>
                <td>gender</td>
                <td>{{item.gender}}</td>
              </tr>
              <tr>
                <td>birth year</td>
                <td>{{item.birth_year}}</td>
              </tr>
              <tr>
                <td>eye color</td>
                <td>{{item.eye_color}}</td>
              </tr>
              <tr>
                <td>hair</td>
                <td>{{item.hair_color}}</td>
              </tr>
              <tr>
                <td>height</td>
                <td>{{item.height}}</td>
              </tr>
              <tr>
                <td>mass</td>
                <td>{{item.mass}}</td>
              </tr>
              <tr>
                <td>skin color</td>
                <td>{{item.skin_color}}</td>
              </tr>
              <tr>
                <td>homeworld</td>
                <td>{{homeworld}}</td>
              </tr>
              </tbody>
            </table>
            <a-divider style="height: 30px"/>
            <a-accordion @click="fillItemArrays('films')">
              films
            </a-accordion>
            <a-accordion-text v-if="openTab=='films'" style="margin-left: 150px">
              <img style="width: 200px" v-if="isLoad" src="../assets/gifs/loaderline.gif"/>
              <ul style="text-align: center">
                <li v-for="str in this.filmsList"
                    v-bind:key="str">
                  <span>Star wars episode {{str.episode_id}}. {{str.title}}</span>
                </li>
              </ul>
            </a-accordion-text>

            <a-accordion @click="fillItemArrays('starships')">
              Starships
            </a-accordion>
            <a-accordion-text v-if="openTab=='starships'" style="margin-left: 150px">
              <img style="width: 200px" v-if="isLoad" src="../assets/gifs/loaderline.gif"/>
              <ul style="margin-left: 150px">
                <li v-for="str in starshipsList"
                    v-bind:key="str">
                  {{str.name}}
                </li>
              </ul>
            </a-accordion-text>
            <a-accordion @click="fillItemArrays('vehicles')">
              Vehicles
            </a-accordion>
            <a-accordion-text v-if="openTab=='vehicles'" style="margin-left: 150px">
              <img style="width: 200px" v-if="isLoad" src="../assets/gifs/loaderline.gif"/>
              <ul style="margin-left: 150px">
                <li v-for="str in vehiclesList"
                    v-bind:key="str">
                  {{str.name}}
                </li>
              </ul>
            </a-accordion-text>

          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "people",
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
      isLoad: true,
      homeworld: ''
    }
  },
  methods:{
    ...mapActions(['getFromApi']),
    terminal(){
      console.log(this.item)
    },
    closeW(){
      this.$emit('closeW',false)
    },
    async fillItemArrays(tab) {
      this.isLoad = true
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
      this.isLoad = false
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

    },
    async getHomeworld(){
      if(this.item['homeworld']) {
        let link = this.item.homeworld.replace('https://swapi.dev/api/','')
        let req = {"url":link,"single":true}
        let res = await this.getFromApi(req)
        this.homeworld = res.name
      }
    }
  },
  beforeUpdate() {
    this.getHomeworld()
  }

}
</script>

<style scoped>

</style>