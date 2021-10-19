<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container scrollbar" style="height: 600px">

        <div class="modal-body">
          <div style="width: 100%;text-align: end">
            <font-awesome-icon icon="times-circle" v-on:click="closeW" class="close-btn">
            </font-awesome-icon>
          </div>
          <slot name="body">

            <div class="modal-header mh-mod">
              <slot name="header">
                <h1 style="height: 60px"> {{item.name}}</h1>
              </slot>
            </div><br/>
            <table class="paleBlueRows">
              <tbody>
              <tr>
                <td>model</td>
                <td>{{item.model}}</td>
              </tr>
              <tr>
                <td>manufacturer</td>
                <td>{{item.manufacturer}}</td>
              </tr>
              <tr>
                <td>cost in credits</td>
                <td>{{item.cost_in_credits}}</td>
              </tr>
              <tr>
                <td>length</td>
                <td>{{item.length}}</td>
              </tr>
              <tr>
                <td>max atmosphering speed</td>
                <td>{{item.max_atmosphering_speed}}</td>
              </tr>
              <tr>
                <td>crew</td>
                <td>{{item.crew}}</td>
              </tr>
              <tr>
                <td>passengers</td>
                <td>{{item.passengers}}</td>
              </tr>
              <tr>
                <td>cargo capacity</td>
                <td>{{item.cargo_capacity}}</td>
              </tr>
              <tr>
                <td>consumables</td>
                <td>{{item.consumables}}</td>
              </tr>
              <tr>
                <td>hyperdrive rating</td>
                <td>{{item.hyperdrive_rating}}</td>
              </tr>
              <tr>
                <td>MGLT</td>
                <td>{{item.MGLT}}</td>
              </tr>
              <tr>
                <td>starship class</td>
                <td>{{item.starship_class}}</td>
              </tr><tr>
                <td>pilots</td>
                <td>
                  <ul>
                    <li v-for="i in peopleList"
                        v-bind:key="i">
                      {{i.name}}</li>
                  </ul>
                </td>
              </tr><tr>
                <td>films</td>
                <td>
                  <ul>
                    <li v-for="i in filmsList"
                        v-bind:key="i">
                      {{i.title}}</li>
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
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
      peopleList: [],
      filmsList: [],
      filled: false
    }
  },
  methods:{
    ...mapActions(['getFromApi']),
    closeW(){
      this.$emit('closeW',false)
    },
    async fillItemArrays() {

      if(this.filled){
        return
      }

      if ( this.item['pilots']) {
        if(this.item.pilots.length > 0) {
          this.peopleList = await this.getNames(this.item.pilots)
        }
        //console.log(this.peopleList)
      }
      if (this.item['films']) {
        if(this.item.films.length > 0) {
          this.filmsList = await this.getNames(this.item.films)
        }
        this.filled = true
        //console.log(this.filmsList)
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
    this.fillItemArrays()
  }

}
</script>

<style scoped>

</style>