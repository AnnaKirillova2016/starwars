<template>
  <a-divider style="height: 105px"/>
  <a-bodyMenu>
    <a-divider style="height: 50px"/>
    <a-mmbtn class="mmbtn-first mmbtn-activ"
    v-if="active=='films'">films</a-mmbtn>
    <a-mmbtn class="mmbtn-first"
             v-else @click="isActive('films')">films</a-mmbtn>
    <a-mmbtn v-if="active=='people'" class="mmbtn-activ" >people</a-mmbtn>
    <a-mmbtn v-else @click="isActive('people')">people</a-mmbtn>
    <a-mmbtn v-if="active=='starships'" class="mmbtn-activ mmbtn-end">starships</a-mmbtn>
    <a-mmbtn v-else class="mmbtn-end" @click="isActive('starships')">starships</a-mmbtn>
    <a-navsearch class="msearch">
      <input style="width: 100%" v-model="search"/>
      <a-searchbtn style="position: relative; width: 90px; min-width: 30px" @click="find">
        <span style="vertical-align: sub; color: #13B4E7">
          Search
        </span>
      </a-searchbtn>
      <a-searchbtn style="position: relative; width: 50px; min-width: 20px; color: #13B4E7" @click="openFilter = !openFilter"><font-awesome-icon icon="filter" style="padding-top: 6px;"/></a-searchbtn>
    </a-navsearch>

    <div v-if="openFilter" style="position: relative">
      <div v-if="active=='people'">
        <div style="margin-top: 70px">
          <span class="fstylew">Male:</span>
          <span style="display: inline-block">
            <input type="checkbox" v-model="male"
                   v-on:change="useFilterA"
                   v-bind:true-value="'male'"
                   v-bind:false-value="''"/><span class="chb-color">Male</span>
            <input type="checkbox" v-model="female"
                   v-on:change="useFilterA"
                   v-bind:true-value="'female'"
                   v-bind:false-value="''"/><span class="chb-color">Female</span>
            <input type="checkbox" v-model="na"
                   v-on:change="useFilterA"
                   v-bind:true-value="'n/a'"
                   v-bind:false-value="''"/><span class="chb-color">N/A</span>
          </span>
          <br/>
          <div style="height: 20px; width: 100%; "/>
          <div class="fstylew">Height: <span>{{minP}}</span> <span>&dash;</span> <span>{{ maxP }}</span></div>
          <div v-if="active=='people'" class="container">
            <div class="slider-track slider-track-m"/>
            <input  type="range" min="0" max="202" v-model.number="minP" v-on:change="useFilterB"/>
            <input  type="range" min="0" max="202" v-model.number="maxP" v-on:change="useFilterB"/>
          </div>
        </div>
      </div>
      <div v-if="active=='films'">
        <div style="margin-top: 70px">
          <div style="display: inline-flex; width: 97%;">
            <span class="fstylew" style="margin-right: 5px; margin-top: 8px; margin-left: 3%">Producer:</span><input v-model="filterA" v-on:change="useFilterA" style="width: 100%"/>
          </div>
          <br/>
          <div style="height: 20px; width: 100%; "/>
          <div class="fstylew">Release year: <span>{{minF}}</span> <span>&dash;</span> <span>{{ maxF }}</span></div>
          <div v-if="active=='films'" class="container">
            <div class="slider-track slider-track-m"/>
            <input  type="range" min="1970" :max="2021" v-model.number="minF" v-on:change="useFilterB" style="margin-top: 82px; margin-left: 66px;"/>
            <input  type="range" min="1970" :max="2021" v-model.number="maxF" v-on:change="useFilterB" style="margin-top: 82px; margin-left: 66px;"/>
          </div>
        </div>
      </div>
      <div v-if="active=='starships'">
        <div style="margin-top: 70px">
          <div style="height: 20px; width: 100%; "/>
          <span class="fstylew" style="margin-right: 5px">Starship class:</span> <input style="width: 250px" v-model="filterA" v-on:change="useFilterA"/>
          <div style="height: 20px; width: 100%; "/>
          <span class="fstylew" style="margin-right: 10px">Manufacturer:</span> <input style="width: 250px" v-model="filterB" v-on:change="useFilterB"/>
        </div>
      </div>
    </div>
  </a-bodyMenu>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "mobileMenu",
  props:[
      'active'
  ],
  data(){
    return{
      search:'',
      filterA: '',
      filterB: '',
      openFilter: false,
      minP: 0,
      maxP: 202,
      minF: 1970,
      maxF: 2021,
      male: 'male',
      female: 'female',
      na: 'n/a',
    }
  },
  computed:{
    ...mapState(['originList'])
  },
  methods:{
    ...mapActions(['getFromApi']),
    find(){
      if (this.search != '') {
        this.getArrayData(this.active + '/?search=' + this.search)
      } else {
        this.$moshaToast('Enter text to search!',
            {
              timeout: 2500,
              position: 'bottom-right',
              showIcon: 'true',
              hideProgressBar: 'true',
              type: 'warning',
              transition: 'zoom',
              swipeClose: 'true',
            })
      }
    },
    async getArrayData(link) {
      let arrData =[]
      let req = {url: link, single: false}
      await this.getFromApi(req)
      arrData = this.originList
      this.$emit('result',arrData)
      console.log(this.arrData)
    },
    isActive(tab){
      this.$emit('ntab',tab)
    }
  }
}
</script>

<style scoped>

</style>